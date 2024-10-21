from rest_framework import viewsets
from .models import Author, Book, Category, Copy, Borrowing, Comment, Publisher, Rating
from .serializers import AuthorSerializer, BookSerializer, CategorySerializer, CopySerializer, BorrowingSerializer, CommentSerializer, PublisherSerializer, RatingSerializer

from rest_framework import serializers
from .models import Author, Book, Category
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import FilterSet, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAuthorOrAdmin

class AuthorPagination(PageNumberPagination):
    page_size = 2

class AuthorFilter(FilterSet):
    name = filters.CharFilter(lookup_expr='icontains')
    birth_date = filters.DateFilter()

    class Meta:
        model = Author
        fields = ['name', 'birth_date']

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer
    pagination_class = AuthorPagination
    filterset_class = AuthorFilter
    permission_classes = [IsAuthenticated]
    permission_classes = [IsAuthorOrAdmin]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['name', 'birth_date']
    ordering_fields = ['name', 'birth_date']
    ordering = ['name']

    @swagger_auto_schema(
        operation_description="Retrieve all authors",
        responses={200: AuthorSerializer(many=True)},
        operation_summary="Get Authors",
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Create a new author",
        request_body=AuthorSerializer,
        responses={201: AuthorSerializer},
        operation_summary="Create Author",
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Retrieve an author by ID",
        responses={200: AuthorSerializer},
        operation_summary="Get Author by ID",
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Update an author by ID",
        request_body=AuthorSerializer,
        responses={200: AuthorSerializer},
        operation_summary="Update Author",
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_description="Delete an author by ID",
        responses={204: 'No Content'},
        operation_summary="Delete Author",
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class BookPagination(PageNumberPagination):
    page_size = 2

class BookFilter(FilterSet):
    title = filters.CharFilter(lookup_expr='icontains')
    authors = filters.CharFilter(lookup_expr='icontains')
    category = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Book
        fields = ['title', 'authors', 'category']

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    pagination_class = BookPagination
    filterset_class = BookFilter
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['title', 'category', 'publication_date']
    ordering_fields = ['title', 'publication_date']
    ordering = ['title']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CopyViewSet(viewsets.ModelViewSet):
    queryset = Copy.objects.all()
    serializer_class = CopySerializer

class BorrowingViewSet(viewsets.ModelViewSet):
    queryset = Borrowing.objects.all()
    serializer_class = BorrowingSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class PublisherViewSet(viewsets.ModelViewSet):
    queryset = Publisher.objects.all()
    serializer_class = PublisherSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer