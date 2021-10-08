from django.shortcuts import render, get_object_or_404, get_list_or_404
from rest_framework import response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import requests
from accounts.models import Movie
import json
# Create your views here.

url = 'https://api.themoviedb.org/3/movie'
api_key = ''

# 영화 db에 넣기
@api_view(['GET'])
def get_movie_list(request):
    url = 'https://api.themoviedb.org/3/movie/popular'

    for x in range(1, 501) :
        response = requests.get(f'{url}?api_key={api_key}&language=ko-KR&page={str(x)}')
        # print(response.json().get('results'))
        result = response.json().get('results')
        for i in range(len(result)):
            if result[i].get('overview'):
                if result[i].get('release_date'):
                    Movie.objects.create(
                        tmdb_id = result[i].get('id'),
                        title = result[i].get('title'),
                        overview = result[i].get('overview'),
                        poster_path = result[i].get('poster_path'),
                        release_date = result[i].get('release_date'),
                        vote_average = result[i].get('vote_average'),
                        vote_count = result[i].get('vote_count')
                    )
    return Response(status=status.HTTP_200_OK)

# 영화 detail정보 나머지 넣기
@api_view(['GET'])
def get_datail_movie(request):
    movie_id_list = Movie.objects.values('tmdb_id')
    # 새로운 리스트에 담기
    tmdb_id_list = []
    for x in range(len(movie_id_list)):
        tmdb_id_list.append(movie_id_list[x].get('tmdb_id')) 


    # 리스트 돌면서 tmdb에 영화 상세정보 요청 보내기
    for i in tmdb_id_list:
        response = requests.get(f'{url}/{i}?api_key={api_key}&language=ko-KR')
        result = response.json()

        #genres 배열로 만들어서 넣기
        arr = result.get('genres')
        genres = []
        for x in arr :
            genres.append(x.get('name'))

        # Movie테이블 수정하기 위해서 tmdb아이디 이용해서 영화 하나씩 가져와서 컬럼별로 넣어주기.
        movie = Movie.objects.get(tmdb_id = i)
        movie.genre = genres
        movie.backdrop_path = result.get('backdrop_path')
        movie.runtime = result.get('runtime')
        movie.production_countries = result.get('production_countries')
        movie.save()

    return Response(status=status.HTTP_200_OK)


# 영화 키워드
@api_view(['GET'])
def get_movie_keywords(request):

    movie_id_list = Movie.objects.values('tmdb_id')

    tmdb_id_list = []
    for x in range(len(movie_id_list)):
        tmdb_id_list.append(movie_id_list[x].get('tmdb_id')) 

    for i in tmdb_id_list:
        response = requests.get(f'{url}/{i}/keywords?api_key={api_key}')
        result = response.json()
        temp = result.get('keywords')
        kewords_list = []
        for j in range(len(temp)):
            kewords_list.append(temp[j].get('name'))

        movie = Movie.objects.get(tmdb_id = i)
        movie.keywords = kewords_list
        movie.save()

    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_movie_credits(request):
    movie_id_list = Movie.objects.values('tmdb_id')
    # 새로운 리스트에 담기
    tmdb_id_list = []
    for x in range(len(movie_id_list)):
        tmdb_id_list.append(movie_id_list[x].get('tmdb_id')) 
    for i in tmdb_id_list:
        response = requests.get(f'{url}/{i}/credits?api_key={api_key}&language=ko-KR')

        # 출연진 리스트
        result_cast = response.json().get('cast')
        # 크루 리스트
        result_crew = response.json().get('crew')
        cast_list = []
        for j in range(len(result_cast)):

            if result_cast[j].get('order') < 8:
                cast_list.append(result_cast[j])
            
        for k in range(len(result_crew)):
            # 감독만 추출해서 담았음
            if result_crew[k].get('job') == 'Director':
                cast_list.append(result_crew[k])

        movie = Movie.objects.get(tmdb_id = i)
        movie.cast = cast_list
        movie.save()

    return Response(status=status.HTTP_200_OK)
