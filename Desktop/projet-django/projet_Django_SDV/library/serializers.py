from rest_framework import serializers
from .models import Author, Book, Category, Copy, Borrowing, Comment, Publisher, Rating

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
        
        extra_kwargs = {
            'name': {'help_text': 'Name of the author'},
            'biography': {'help_text': 'Biography of the author'},
            'birth_date': {'help_text': 'Birth date of the author'},
        }


class BookSerializer(serializers.ModelSerializer):
    authors = serializers.StringRelatedField(many=True)
    category = serializers.StringRelatedField()

    class Meta:
        model = Book
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    books = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class CopySerializer(serializers.ModelSerializer):
    book = serializers.StringRelatedField()  # Renvoie juste le titre du livre

    class Meta:
        model = Copy
        fields = '__all__'


class BorrowingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Renvoie juste le nom de l'utilisateur
    copy = serializers.StringRelatedField()  # Renvoie juste l'identifiant de la copie

    class Meta:
        model = Borrowing
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Renvoie juste le nom de l'utilisateur
    book = serializers.StringRelatedField()  # Renvoie juste le titre du livre

    class Meta:
        model = Comment
        fields = '__all__'


class PublisherSerializer(serializers.ModelSerializer):
    books = serializers.PrimaryKeyRelatedField(many=True, read_only=True)  # Renvoie les identifiants des livres

    class Meta:
        model = Publisher
        fields = '__all__'


class RatingSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # Renvoie juste le nom de l'utilisateur
    book = serializers.StringRelatedField()  # Renvoie juste le titre du livre

    class Meta:
        model = Rating
        fields = '__all__'

