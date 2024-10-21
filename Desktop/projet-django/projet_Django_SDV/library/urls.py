from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AuthorViewSet, BookViewSet, CategoryViewSet, CopyViewSet, BorrowingViewSet, CommentViewSet, PublisherViewSet, RatingViewSet

router = DefaultRouter()
router.register(r'authors', AuthorViewSet)
router.register(r'books', BookViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'copies', CopyViewSet)
router.register(r'borrowings', BorrowingViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'publishers', PublisherViewSet)
router.register(r'ratings', RatingViewSet)

urlpatterns = [
    # Les routes de l'API via le routeur DRF
    path('', include(router.urls)),
]
