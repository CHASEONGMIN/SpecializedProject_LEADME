from django.urls import path
from . import views

urlpatterns = [
    path('get-movie/', views.get_movie_list),
    path('get-detail/', views.get_datail_movie),
    path('get-credits/', views.get_movie_credits),
    path('get-keywords/', views.get_movie_keywords),
]