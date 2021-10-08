import operator
from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserSignupSerializer
from django.contrib.auth import get_user_model
from .models import Movie, User, Rating, Tempmovieti, Recommendationmovie, Recommendationmovieti
import pandas as pd
import numpy as np
import pymysql
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from ast import literal_eval
from collections import Counter
import json
from sklearn.metrics.pairwise import cosine_similarity


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def analysis_user_favorite(request):
    movie_cnt = 0
    average_rate = 0
    most_rate = {}
    cnt_rate = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
    }
    data = {
        "rated_movie_cnt": movie_cnt,
        "average_rate": average_rate,
        "most_rate": most_rate,
        "cnt_rate": cnt_rate,
    }
    user = request.user
    if Rating.objects.filter(uid_id=user.uid):
        # 유저가 평가한 영화 가져오기
        movie_list = Rating.objects.filter(uid_id=user.uid)

        rate_list = []  # 평가 점수 리스트
        for i in range(len(movie_list)):
            rate_list.append(movie_list[i].rating)

        # 평가한 영화의 수
        movie_cnt = len(movie_list)
        data["rated_movie_cnt"] = movie_cnt

        # 별점 평균
        n = np.array(rate_list)
        average_rate = np.mean(n)
        average_rate = np.around(average_rate, 2)
        data["average_rate"] = average_rate

        # 별점 빈도수
        cnt = Counter(rate_list)
        temp = dict(cnt)
        most_rate = dict(cnt.most_common(1))
        data["most_rate"] = most_rate
        data["cnt_rate"] = cnt_rate
        # print(cnt_rate)
        # print(most_rate) # (점수, 개수) 형식
        for key, value in temp.items():
            data["cnt_rate"][key] = value
        # print(data)
        return Response(data, status=status.HTTP_200_OK)
    else:
        return Response(data, status=status.HTTP_200_OK)


# 영화 선호 태그
# 선호 국가
# 선호 장르 -> 몇편인지
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def analysis_movie_favorite(request):
    # DB에 접속, 필요한 정보 명시
    conn = pymysql.connect(
        user='jiahn',
        password='jiahn1234',
        database='bigdatapjt',
        host='J5B305.p.ssafy.io',
        port=3306,
        charset='utf8',
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    # sql문 실행하기
    cursor = conn.cursor()
    # 현재 user의 uid
    user_id = request.user.uid
    sql = f'SELECT t1.movieid, t1.tmdb_id, t1.title, t1.genre, t1.release_date, t1.production_countries, t1.runtime, t1.vote_average, t1.vote_count, t1.cast, t1.keywords FROM bigdatapjt.movie as t1 where t1.movieid in (select t2.movieid from bigdatapjt.rating t2 where t2.uid_id={user_id});'
    cursor.execute(sql)
    # 데이터 받아오기
    queryset = cursor.fetchall()
    # db닫기
    cursor.close()
    conn.close()

    # 데이터 프레임으로 만들기
    df = pd.DataFrame(queryset)

    # 2개 이상 나온 장르만 가져옴
    count_vect = CountVectorizer(min_df=2)
    m = count_vect.fit_transform(df['genre'])

    # print(m.toarray())
    # print(count_vect.vocabulary_)

    # 각 단어가 가지는 열의 위치를 열(value) 순서대로 바꾸기
    dic = sorted(count_vect.vocabulary_.items(), key=operator.itemgetter(1))
    # 다시 딕셔너리로 바꿔줌
    genre_dict = dict(dic)
    # 단어의 빈도수 행렬나온것을 열기준으로 합해서 리스트로 변환함
    cnt_list = m.toarray().sum(axis=0).tolist()
    # key만 뽑아내서 리스트로 만들어줌
    arr = list(genre_dict.keys())
    # 딕셔너리 value값을 빈도로 변경해줌
    for i in range(len(cnt_list)):
        genre_dict[arr[i]] = cnt_list[i]

    df['keywords'] = df['keywords'].str.replace(" ", "_")
    # print(df['keywords'])
    # 2번 이상 나온 키워드만 가져오기
    cnt_vect = CountVectorizer(min_df=4)
    n = cnt_vect.fit_transform(df['keywords'])
    # print(n.toarray())
    # print(cnt_vect.vocabulary_)

    keywords_dict = dict(
        sorted(cnt_vect.vocabulary_.items(), key=operator.itemgetter(1)))
    # 단어의 빈도수 행렬나온것을 열기준으로 합해서 리스트로 변환함
    cnt_keyword = n.toarray().sum(axis=0).tolist()
    # key만 뽑아내서 리스트로 만들어줌
    arr_county = list(keywords_dict.keys())
    # 딕셔너리 value값을 빈도로 변경해줌
    for i in range(len(cnt_keyword)):
        keywords_dict[arr_county[i]] = cnt_keyword[i]

    # 나라 전처리
    df['production_countries'] = df['production_countries'].apply(literal_eval)
    df['production_countries'] = df['production_countries'].apply(
        lambda x: [y['name'] for y in x])
    # 데이터 타입 변경
    df = df.astype({'production_countries': 'str'})
    df['production_countries'] = df['production_countries'].str.replace(
        " ", "_")

    country_vect = CountVectorizer(min_df=2)
    c = country_vect.fit_transform(df['production_countries'])
    # print(country_vect.vocabulary_)
    # print(c.toarray())

    country_dict = dict(
        sorted(country_vect.vocabulary_.items(), key=operator.itemgetter(1)))
    # 단어의 빈도수 행렬나온것을 열기준으로 합해서 리스트로 변환함
    cnt_country = c.toarray().sum(axis=0).tolist()

    # key만 뽑아내서 리스트로 만들어줌
    arr_county = list(country_dict.keys())
    # 딕셔너리 value값을 빈도로 변경해줌
    for i in range(len(cnt_country)):
        country_dict[arr_county[i]] = cnt_country[i]

    # print(genre_dict)
    # print(keywords_dict)
    # print(country_dict)
    data = {
        "genre_dict": genre_dict,
        "keywords_dict": keywords_dict,
        "country_dict": country_dict
    }
    return Response(data, status=status.HTTP_200_OK)


# 회원가입
@api_view(['POST'])
def signup(request):
    password = request.data.get('password')
    password_confirmation = request.data.get('passwordConfirmation')

    # 비밀번호 일치하지않으면 저장하지 않음
    if password != password_confirmation:
        return Response({'error': '비밀번호가 일치하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

    # 닉네임은 이메일 @ 앞부분 잘라서 넣기
    temp = request.data.get('email').split('@')
    nickname_first = temp[0]

    serializer = UserSignupSerializer(data=request.data)

    # auth_user에 저장
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data.get('password'))
        user.nickname = nickname_first
        user.save()
        # 유저 생성할 때, movieti 결과 도출 테이블에도 함께 생성
        Tempmovieti.objects.create(
            uid=User.objects.get(email=request.data.get('email')).uid
        )
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        # print(serializer.errors)
        # print(serializer.error_messages)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

# 이메일 중복 api 만들기


@api_view(['POST'])
def checkEmail(request):
    user_email = request.data.get('user_email')
    try:
        # 중복된 경우
        u_email = User.objects.get(email=user_email)
    except:
        # 중복되지 않는 경우
        u_email = None
    if u_email is None:
        return Response({'success': '사용가능한 이메일입니다.'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': '동일한 이메일이 존재합니다.'}, status=status.HTTP_400_BAD_REQUEST)


# 영화 설문조사하기
@api_view(['POST'])
def survey_result(request):
    if request.data.get('result'):
        # 유저 이메일이랑 결과 받아서
        user_email = request.data.get('id')
        survey_result = request.data.get('result')
        # 딕셔너리에서 key, value쌍 꺼내서 rating테이블에 생성하기
        for param_tmdb, rating in survey_result.items():
            if(Movie.objects.get(tmdb_id=param_tmdb) != None and User.objects.get(email=user_email) != None):
                movie_id = Movie.objects.get(tmdb_id=param_tmdb).movieid
                user_id = User.objects.get(email=user_email).uid
                if Rating.objects.filter(uid_id=user_id, movieid=movie_id):
                    return Response({'error': '동일한 영화를 이미 평가했습니다.'}, status=status.HTTP_409_CONFLICT)
                Rating.objects.create(
                    movieid=Movie.objects.get(tmdb_id=param_tmdb),
                    uid=User.objects.get(email=user_email),
                    rating=rating,
                    survey=True
                )
        # user테이블에 설문했는지 안했는지 업데이트
        user = User.objects.get(email=user_email)
        user.surveyed = True
        user.save()

        # 설문조사하고 콘텐츠기반 필터링 적용하기
        result = survey_result_func(user.uid)
        result_insert(user, result)
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)

# 다시 설문조사하기


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def survey_reset(request):
    # 유저가 설문조사를 통해 평가한 영화만 삭제하기
    user = Rating.objects.filter(uid=request.user.uid, survey=True)
    user.delete()
    return Response(status=status.HTTP_200_OK)


def survey_result_func(userid):
    with open("./example.json", "r", encoding="utf8") as f:
        contents = f.read()  # string 타입
        json_data_realreal = json.loads(contents)

    df4 = pd.DataFrame(json_data_realreal)
    ################################################### DB에서 rating 테이블 불러오기############################################################
    conn = pymysql.connect(
        user='jiahn',
        password='jiahn1234',
        database='bigdatapjt',
        host='J5B305.p.ssafy.io',
        port=3306,
        charset='utf8',
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
    sql = 'select * from bigdatapjt.rating'
    cursor.execute(sql)
    res = cursor.fetchall()
    conn.close()
    df3 = pd.DataFrame(res)
    me = userid  # 실제로는 접속해 있는 유저의 uid_id
    df3 = df3.loc[df3['uid_id'] == userid, ['movieid', 'rating']].sort_values('rating', ascending=False)
    # print(df3)
    movieid_lst = [df3['movieid']]
    # print(movieid_lst)
    good_movie = []
    bad_movie = []
    movie_num = []
    for c, i in df3.iterrows():
        if i.rating >= 3:
            good_movie.append(i.movieid)
            movie_num.append(i.movieid)
        else:
            bad_movie.append(i.movieid)
            movie_num.append(i.movieid)
    dataframe_table = pd.DataFrame()
    # print(good_movie,bad_movie)
    ##########################################################################################################################################
    # ##############################################가중치를 계산한 평점 ######################################################################
    C = df4['vote_average'].mean()

    m = df4['vote_count'].quantile(0.6)

    def weighted_vote_average(record):
        v = record['vote_count']
        R = record['vote_average']

        return ((v/(v+m)) * R) + ((m/(m+v)) * C)

    df4['weighted_vote'] = df4.apply(weighted_vote_average, axis=1)
    # ###########################################################################################################################################
    df4['keywords'] = df4['keywords'].apply(literal_eval)
    df4['genre'] = df4['genre'].apply(literal_eval)

    df4['genre'] = df4['genre'].apply(lambda x: [y['name'] for y in x])
    df4['keywords'] = df4['keywords'].apply(lambda x: [y['name'] for y in x])

    df4['recommend_item'] = df4['keywords'].apply(lambda x: ' '.join(x))
    df4['recommend_item'] += df4['genre'].apply(lambda x: ' '.join(x))

    # print(df4['keywords'])
    # print(type(df4['keywords']))
    # input_movie에 rating한 영화 이름집어넣기
    for i in good_movie:
        input_movie = i
        input_title = df4[df4['movieid'] == input_movie]['title']
        tfidf_vec = TfidfVectorizer(ngram_range=(1, 5))
        # print('------------------------------------------------------'*5)
        # print(f'키워드+장르 - TfidfVectorizer    {input_title}')
        # print('------------------------------------------------------'*5)
        tfidf_matrix = tfidf_vec.fit_transform(df4['recommend_item'])
        genres_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # #######################################################별점이 3점 이상이면 #################################################
        # print('너무 좋아!')
        # print('------------------------------------------------------'*5)

        similar_index = np.argsort(-genres_similarity)
        movie_index = df4[df4['movieid'] == input_movie].index.values
        similar_movies = similar_index[movie_index, :20]
        similar_movies_index = similar_movies.reshape(-1)
        # print(df4.loc[similar_movies_index, ['title', 'movieid', 'weighted_vote']].sort_values(
        #     'weighted_vote', ascending=False).head(3))
        dataframe_table = pd.concat([dataframe_table, df4.loc[similar_movies_index, [
                                    'title', 'movieid', 'weighted_vote']].sort_values('weighted_vote', ascending=False).head(5)])
        # print('------------------------------------------------------'*5)
    for i in bad_movie:
        input_movie = i
        input_title = df4[df4['movieid'] == input_movie]['title']
        tfidf_vec = TfidfVectorizer(ngram_range=(1, 5))
        # print('------------------------------------------------------'*5)
        # print(f'키워드+장르 - TfidfVectorizer    {input_title}')
        # print('------------------------------------------------------'*5)
        tfidf_matrix = tfidf_vec.fit_transform(df4['recommend_item'])
        genres_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)
        # #########################################################별점이 2점 이하이면######################################################
        # print('------------------------------------------------------'*5)
        # print('너무 싫어!')
        # print('------------------------------------------------------'*5)

        similar_index = np.argsort(genres_similarity)
        movie_index = df4[df4['movieid'] == input_movie].index.values
        similar_movies = similar_index[movie_index, :20]
        similar_movies_index = similar_movies.reshape(-1)
        # print(df4.loc[similar_movies_index, ['title', 'movieid', 'weighted_vote']].sort_values(
        #     'weighted_vote', ascending=False).head(3))
        dataframe_table = pd.concat([dataframe_table, df4.loc[similar_movies_index, [
                                    'title', 'movieid', 'weighted_vote']].sort_values('weighted_vote', ascending=False).head(5)])
        # # # Create your views here.
        # print('------------------------------------------------------'*5)
    # print('------------------------------------------------------'*5)
    dataframe_table = dataframe_table.sort_values(
        'weighted_vote', ascending=False)[:15]
    # print(dataframe_table)
    result = []
    for c, i in dataframe_table.iterrows():
        if i.movieid not in result and i.movieid not in movie_num:
            result.append(i.movieid)
    # print(result)
    return result[:10]
    #########################################################설문 기반 추천 끝!#########################################################################


def result_insert(user, result):
    for i in result:
        Recommendationmovie.objects.create(
            movieid=Movie.objects.get(movieid=i),
            uid=user
        )


def recomm_movieti(myuser):
    with open("./example.json", "r", encoding="utf8") as f:
        contents = f.read()  # string 타입
        json_data_realreal = json.loads(contents)

    df1 = pd.DataFrame(json_data_realreal)
    my_movieTi = myuser.movieti
    # print("====================="*5)
    # print(my_movieTi)
    conn = pymysql.connect(
        user='jiahn',
        password='jiahn1234',
        database='bigdatapjt',
        host='J5B305.p.ssafy.io',
        port=3306,
        charset='utf8',
        autocommit=True,
        cursorclass=pymysql.cursors.DictCursor
    )
    cursor = conn.cursor()
    sql = f'select * from bigdatapjt.rating where movieti = "{my_movieTi}"'
    cursor.execute(sql)
    res = cursor.fetchall()
    # conn.close()
    df2 = pd.DataFrame(res)
    # print(df1)
    # print('------------------------------------------------------'*5)
    # print(df2)
    # print('------------------------------------------------------'*5)
    user_movie_rating = pd.merge(df2, df1, on='movieid')
    # print(user_movie_rating.loc[:,['ratingid','rating','movieid','uid_id','movieti']])
    # movie_user_rating = user_movie_rating.pivot_table('rating',index='title',columns='uid_id')
    user_movie_rating = user_movie_rating.pivot_table(
        'rating', columns='title', index='uid_id')
    # print(movie_user_rating)
    # print('------------------------------------------------------'*5)

    # print(user_movie_rating)
    # movie_user_rating.fillna(0,inplace=True)
    user_movie_rating.fillna(0, inplace=True)
    # print(movie_user_rating)
    # print('------------------------------------------------------'*5)

    # print(user_movie_rating)
    # similar_movie = cosine_similarity(movie_user_rating,movie_user_rating)
    similar_user = cosine_similarity(user_movie_rating, user_movie_rating)
    # print(similar_movie)
    # print(similar_user)
    # movie_df = pd.DataFrame(data=similar_movie,index=movie_user_rating.index,columns=movie_user_rating.index)
    user_df = pd.DataFrame(
        data=similar_user, index=user_movie_rating.index, columns=user_movie_rating.index)
    # print(movie_df)
    # print('------------------------------------------------------'*5)
    # print(user_df)

    ans = user_df[[myuser.uid]].sort_values(by=myuser.uid, ascending=False)[
        :6]   # 1대신에 request.user.uid
    # print(ans)
    similar_userlist = []
    for c, i in ans.iterrows():
        similar_userlist.append(c)
    similar_userlist = similar_userlist[1:4]
    # print(similar_userlist)
    # print('------------------------------------------------------'*5)
    #####################################################비슷한 유저3명이 좋아한 영화들 찾기(_별점 4점이상_)#######################################################
    # print('비슷한 유저3명이 좋아한 영화들 찾기(_별점 4점이상_)')
    # print('------------------------------------------------------'*5)

    similar_userlist = tuple(similar_userlist)
    # print(f'{similar_userlist}')
    # cursor = conn.cursor()
    sql = f'select * from bigdatapjt.rating where uid_id in {similar_userlist} and rating >=4'
    cursor.execute(sql)
    res = cursor.fetchall()
    df5 = pd.DataFrame(res)
    # print(df5)
    user_movie_goodlist = []
    for c, i in df5.iterrows():
        user_movie_goodlist.append(i.movieid)
    # print(user_movie_goodlist)
    # print('------------------------------------------------------'*5)
    user_movie_goodlist = tuple(user_movie_goodlist)
    sql = f'select * from bigdatapjt.movie where movieid in {user_movie_goodlist}'
    cursor.execute(sql)
    res = cursor.fetchall()
    conn.close()
    df6 = pd.DataFrame(res)
    # print(df6)
    user_good_movielist = []
    for c, i in df6.iterrows():
        user_good_movielist.append(i.movieid)
    # print(user_good_movielist)
    # print('------------------------------------------------------'*5)
    # print('------------------------------------------------------'*5)
    ################################################## 추천알고리즘##########################################################################
    # print('추천알고리즘')
    # print('------------------------------------------------------'*5)

    C = df1['vote_average'].mean()

    m = df1['vote_count'].quantile(0.6)

    def weighted_vote_average(record):
        v = record['vote_count']
        R = record['vote_average']

        return ((v/(v+m)) * R) + ((m/(m+v)) * C)

    df1['weighted_vote'] = df1.apply(weighted_vote_average, axis=1)
    # ###########################################################################################################################################
    df1['keywords'] = df1['keywords'].apply(literal_eval)
    df1['genre'] = df1['genre'].apply(literal_eval)

    df1['genre'] = df1['genre'].apply(lambda x: [y['name'] for y in x])
    df1['keywords'] = df1['keywords'].apply(lambda x: [y['name'] for y in x])

    df1['recommend_item'] = df1['keywords'].apply(lambda x: ' '.join(x))
    df1['recommend_item'] += df1['genre'].apply(lambda x: ' '.join(x))
    # user_movie_goodlist = list(user_movie_goodlist)
    # input_movie에 rating한 영화 이름집어넣기
    user_good_movielist_table = pd.DataFrame()
    for i in user_good_movielist:
        input_movie = i
        input_title = df1[df1['movieid'] == input_movie]['title']
        tfidf_vec = TfidfVectorizer(ngram_range=(1, 5))
        # print('------------------------------------------------------'*5)
        # print(f'키워드+장르 - TfidfVectorizer    {input_title}')
        # print('------------------------------------------------------'*5)
        tfidf_matrix = tfidf_vec.fit_transform(df1['recommend_item'])
        genres_similarity = cosine_similarity(tfidf_matrix, tfidf_matrix)

        # #######################################################별점이 3점 이상이면 #################################################
        # print('너무 좋아!')
        # print('------------------------------------------------------'*5)

        similar_index = np.argsort(-genres_similarity)
        movie_index = df1[df1['movieid'] == input_movie].index.values
        similar_movies = similar_index[movie_index, :20]
        similar_movies_index = similar_movies.reshape(-1)
        # print(df1.loc[similar_movies_index, ['title', 'movieid', 'weighted_vote']].sort_values(
            # 'weighted_vote', ascending=False).head(5))
        user_good_movielist_table = pd.concat([user_good_movielist_table, df1.loc[similar_movies_index, [
                                                'title', 'movieid', 'weighted_vote']].sort_values('weighted_vote', ascending=False).head(5)])
        # print('------------------------------------------------------'*5)
    # print(user_good_movielist_table.sort_values(
        # by='weighted_vote', ascending=False))
    user_good_movielist_table = user_good_movielist_table.sort_values(
        by='weighted_vote', ascending=False)
    res = []
    for c, i in user_good_movielist_table.iterrows():
        if i.movieid not in res:
            res.append(i.movieid)
    # print(res)

    # print('------------------------------------------------------'*5)
    return res[:10]


def movieti_result_insert(user, result):
    for i in result:
        Recommendationmovieti.objects.create(
            movieid=Movie.objects.get(movieid=i),
            uid=user
        )
