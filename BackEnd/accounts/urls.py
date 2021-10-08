from django.urls import path
from . import views
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token


urlpatterns = [
    path('signup', views.signup),
    path('login', obtain_jwt_token), # JWT 토큰 획득
    path('survey', views.survey_result),
    path('checkEmail', views.checkEmail),
    path('resetsurvey', views.survey_reset),
    path('favorite/movie', views.analysis_movie_favorite),
    path('favorite/user', views.analysis_user_favorite),
    # path('verify',  verify_jwt_token), # JWT 토큰 확인
]
