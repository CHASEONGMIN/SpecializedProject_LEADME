from django.urls import path
from . import views

urlpatterns = [
    path('survey', views.get_survey_movie),
    path('movieti/list', views.get_movieti_movielist),
    path('recommend/list', views.get_recommend_movielist),
    path('recommendmovieti/list', views.get_recommend_movieti_list),
    path('toprated', views.get_toprated_movie),
    path('nowplaying', views.get_nowplaying_movie),
    path('upcoming', views.get_upcoming_movie),
    path('movieti', views.calc_movieti_result),
    path('<int:movieid>', views.get_movie_detail),
    path('<int:movieid>/comment', views.comment),
    path('comment/<int:comment>', views.delete_comment),
    path('<int:movieid>/rating', views.set_rating),
    path('search/title/<searchword>', views.search_movie_title),
    path('search/genre/<searchword>', views.search_movie_genre),
]
