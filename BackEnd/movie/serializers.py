from rest_framework import fields, serializers
from accounts.models import Comment, Rating, Movie, Movieti


class MovieSurveyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'poster_path')


class MovieDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('tmdb_id', 'title', 'genre', 'cast', 'keywords', 'overview',
                    'release_date', 'poster_path', 'vote_average')


class MovietiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movieti
        fields = '__all__'


class MovietiListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movieti
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class UserRatingMovie(serializers.ModelSerializer):

    class Meta:
        model = Rating
        fields = '__all__'
