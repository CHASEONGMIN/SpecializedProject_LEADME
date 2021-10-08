import json
from django.db import models
from django.db.models import F, Q
from django.http.response import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers, status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
import requests
import copy
import random
from accounts.models import Comment, User, Rating, Tempmovieti, Movie, Recommendationmovie, Movieti, Recommendationmovieti
from .serializers import MovieSurveyListSerializer, MovieDetailSerializer, CommentSerializer, MovietiListSerializer
from accounts.serializers import UserMovieti
import accounts.views as accountviews

# Create your views here.


@api_view(['GET'])
def get_survey_movie(request):
    # 쿼리셋 형태를 리스트로 변환, 평균 평점이 7.2보다 큰 영화만 가져옴
    movie_list = list(Movie.objects.filter(
        vote_count__gte=2000).values('tmdb_id', 'title', 'poster_path'))
    # 그 중에서 랜덤 120개
    random_list = random.sample(movie_list, 120)

    serializer = MovieSurveyListSerializer(random_list, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


url = 'https://api.themoviedb.org/3/movie'
api_key = 'e65e678451c2b671218a36fb34998488'


@api_view(['GET'])
def get_toprated_movie(request):
    # 영화 id, title, poster만 담아 보낼것
    result = []
    for i in range(1, 3):
        response = requests.get(
            f'{url}/top_rated/?api_key={api_key}&language=ko-KR&page={i}&region=KR')
        temp = response.json().get('results')
        for j in range(len(temp)):
            temp2 = {}
            temp2['tmdb_id'] = temp[j].get('id')
            temp2['title'] = temp[j].get('title')
            temp2['poster_path'] = temp[j].get('poster_path')
            temp2['backdrop_path'] = temp[j].get('backdrop_path')
            result.append(temp2)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_nowplaying_movie(request):
    response = requests.get(
        f'{url}/now_playing/?api_key={api_key}&language=ko-KR&page=1&region=KR')
    temp = response.json().get('results')
    result = []
    for i in range(len(temp)):
        temp2 = {}
        temp2['tmdb_id'] = temp[i].get('id')
        temp2['title'] = temp[i].get('title')
        temp2['poster_path'] = temp[i].get('poster_path')
        temp2['backdrop_path'] = temp[i].get('backdrop_path')
        result.append(temp2)
    # print(result)
    return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_upcoming_movie(request):
    response = requests.get(
        f'{url}/upcoming/?api_key={api_key}&language=ko-KR&page=1&region=KR')
    temp = response.json().get('results')
    result = []
    for i in range(len(temp)):
        temp2 = {}
        temp2['tmdb_id'] = temp[i].get('id')
        temp2['title'] = temp[i].get('title')
        temp2['poster_path'] = temp[i].get('poster_path')
        temp2['backdrop_path'] = temp[i].get('backdrop_path')
        result.append(temp2)
    # print(result)
    return Response(result, status=status.HTTP_200_OK)


# movieti결과에 나오는 영화 리턴
@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_movieti_movielist(request):
    result = []
    # if Movieti.objects.get(movieti=request.user.movieti):
    if request.user.movieti:
        movielist = Movieti.objects.get(movieti=request.user.movieti).movielist
    # try:
    #     movielist = Movieti.objects.filter(movieti=request.user.movieti).movielist
    # except:
    #     return Response(movielist)
        for i in range(len(movielist)):
            temp2 = {}
            temp2['tmdb_id'] = movielist[i].get('id')
            temp2['title'] = Movie.objects.get(
                tmdb_id=movielist[i].get('id')).title
            temp2['poster_path'] = movielist[i].get('poster_path')
            temp2['backdrop_path'] = Movie.objects.get(
                tmdb_id=movielist[i].get('id')).backdrop_path
            result.append(temp2)
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recommend_movielist(request):
    result = []
    if Recommendationmovie.objects.filter(uid=request.user.uid):
        movielist = Recommendationmovie.objects.filter(uid=request.user.uid)
        for i in range(len(movielist)):
            movie = Movie.objects.get(
                movieid=movielist[i].movieid.movieid)
            temp2 = {}
            temp2['tmdb_id'] = movie.tmdb_id
            temp2['title'] = movie.title
            temp2['poster_path'] = movie.poster_path
            temp2['backdrop_path'] = movie.backdrop_path
            result.append(temp2)
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_recommend_movieti_list(request):
    result = []
    if Recommendationmovieti.objects.filter(uid=request.user.uid):
        movielist = Recommendationmovieti.objects.filter(uid=request.user.uid)
        for i in range(len(movielist)):
            movie = Movie.objects.get(
                movieid=movielist[i].movieid.movieid)
            temp2 = {}
            temp2['tmdb_id'] = movie.tmdb_id
            temp2['title'] = movie.title
            temp2['poster_path'] = movie.poster_path
            temp2['backdrop_path'] = movie.backdrop_path
            result.append(temp2)
        return Response(result, status=status.HTTP_200_OK)
    else:
        return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_movie_detail(request, movieid):
    movie_pk = Movie.objects.get(tmdb_id=movieid).movieid
    user_rate = Rating.objects.filter(uid=request.user.uid, movieid=movie_pk)
    rating_num = 0
    if user_rate:
        rating_num = user_rate.get().rating

    movie = get_object_or_404(Movie, tmdb_id=movieid)
    serializers = MovieDetailSerializer(movie)

    # 트레일러 주소
    response = requests.get(
        f'{url}/{movieid}/videos?api_key={api_key}&language=ko-KR')
    temp = response.json().get('results')

    find = False
    result = 'https://www.youtube.com/embed/'
    for i in range(len(temp)):
        if temp[i].get('type') == 'Trailer':
            result += temp[i].get('key')
            find = True
            break

    # 비슷한 영화 목록
    response = requests.get(
        f'{url}/{movieid}/similar?api_key={api_key}&language=ko-KR&page=1')
    temp = response.json().get('results')
    result2 = []
    for i in range(len(temp)):
        if temp[i].get('overview'):
            if temp[i].get('release_date'):
                temp2 = {}
                temp2['tmdb_id'] = temp[i].get('id')
                temp2['title'] = temp[i].get('title')
                temp2['poster_path'] = temp[i].get('poster_path')
                result2.append(temp2)
                if(len(temp2) >= 20):
                    break

    trailer_path = {"trailer_path": result}
    movielist = {"movielist": result2}
    rating = {"rating": rating_num}

    trailer_path.update(serializers.data)
    trailer_path.update(movielist)
    trailer_path.update(rating)

    return Response(trailer_path, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def comment(request, movieid):

    real_movieid = Movie.objects.get(tmdb_id=movieid).movieid
    if request.method == 'GET':
        comments = Comment.objects.filter(movieid=real_movieid)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        uid = {"uid": request.user.uid}
        movieid = {"movieid": real_movieid}
        uid.update(movieid)
        uid.update(request.data)

        serializer = CommentSerializer(data=uid)

        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_comment(request, comment):
    comment = get_object_or_404(Comment, pk=comment)
    # 본인이 아니라면 수정할 수 없다.

    if not (request.user.uid == comment.uid.uid):
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)

    tmp = copy.copy(comment)
    comment.delete()
    tmp = CommentSerializer(tmp)
    return Response({"삭제한 리뷰": tmp.data}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def calc_movieti_result(request):
    user = request.user

    mvti = Tempmovieti.objects.get(uid=user.uid)

    # 만약 movieti 검사를 새로 하는 것이라면
    sum = mvti.E + mvti.I + mvti.N + mvti.S + mvti.T + mvti.F + mvti.J + mvti.P
    if(sum >= 12):
        mvti.E = mvti.I = mvti.N = mvti.S = mvti.T = mvti.F = mvti.J = mvti.P = 0

    getType = request.GET.get('result', None)
    if(getType == 'E'):
        mvti.E = mvti.E + 1
    elif(getType == 'I'):
        mvti.I = mvti.I + 1
    elif(getType == 'N'):
        mvti.N = mvti.N + 1
    elif(getType == 'S'):
        mvti.S = mvti.S + 1
    elif(getType == 'T'):
        mvti.T = mvti.T + 1
    elif(getType == 'F'):
        mvti.F = mvti.F + 1
    elif(getType == 'J'):
        mvti.J = mvti.J + 1
    elif(getType == 'P'):
        mvti.P = mvti.P + 1
    mvti.save()

    # movieti 결과 계산
    final_mvti = ''
    if(mvti.E <= mvti.I):
        final_mvti += 'I'
    else:
        final_mvti += 'E'

    if(mvti.N <= mvti.S):
        final_mvti += 'S'
    else:
        final_mvti += 'N'

    if(mvti.T <= mvti.F):
        final_mvti += 'F'
    else:
        final_mvti += 'T'

    if(mvti.J <= mvti.P):
        final_mvti += 'P'
    else:
        final_mvti += 'J'

    # movieti 결과를 테이블에 저장
    Rating.objects.filter(uid_id=user.uid).update(movieti=final_mvti)

    changedata = {"email": user.email,
                    "password": user.password, "movieti": final_mvti}

    serializer = UserMovieti(user, data=changedata)
    if serializer.is_valid(raise_exception=True):
        serializer.save()

        sum = mvti.E + mvti.I + mvti.N + mvti.S + mvti.T + mvti.F + mvti.J + mvti.P
        if(sum >= 12):
            rec_result = accountviews.recomm_movieti(request.user)
            accountviews.movieti_result_insert(request.user, rec_result)
        result = MovietiListSerializer(
            Movieti.objects.get(movieti=final_mvti)).data
        return Response(result, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_movie_title(request, searchword):
    context = {}
    if searchword:
        if len(searchword) > 0:
            movie = Movie.objects.filter(title__contains=searchword)
            if len(movie) > 100:
                movies = MovieSurveyListSerializer(movie[:100], many=True)
            else:
                movies = MovieSurveyListSerializer(movie, many=True)
            context["movies"] = movies.data

    return Response(context)


@api_view(['GET'])
def search_movie_genre(request, searchword):
    context = {}
    if searchword:
        if len(searchword) > 0:
            movie = Movie.objects.filter(genre__contains=searchword)
            if len(movie) > 100:
                movies = MovieSurveyListSerializer(movie[:100], many=True)
            else:
                movies = MovieSurveyListSerializer(movie, many=True)
            context["movies"] = movies.data

    return Response(context)


# 영화 상세페이지 안에서 평점주기
@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
@permission_classes([IsAuthenticated])
def set_rating(request, movieid):
    # print(request.data.get('result'), movieid, request.user)
    movie = Movie.objects.get(tmdb_id=movieid)
    user = request.user
    rate = request.data.get('result')
    # print(movie, user)
    if Rating.objects.filter(movieid=movie.movieid, uid_id=user.uid):
        return Response({'error': '동일한 영화를 이미 평가했습니다.'}, status=status.HTTP_409_CONFLICT)
    Rating.objects.create(
        movieid=Movie.objects.get(tmdb_id=movieid),
        uid=user,
        rating=rate,
        movieti=user.movieti
    )
    return Response(status=status.HTTP_200_OK)


# 디테일에서 영화 출연진 눌럿을때 = 검색 햇을 때?
# @api_view(['GET'])
# def search_movie_cast(request, searchword):
#     context = {}
#     if searchword:
#         if len(searchword) > 0:
#             movie = Movie.objects.filter(cast__contains=searchword)
#             if len(movie) > 100:
#                 movies = MovieSurveyListSerializer(movie[:100], many=True)
#             else:
#                 movies = MovieSurveyListSerializer(movie, many=True)
#             context["movies"] = movies.data

#     return Response(context)
