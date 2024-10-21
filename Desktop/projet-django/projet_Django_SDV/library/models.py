from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    name = models.CharField(max_length=100)
    biography = models.TextField()
    birth_date = models.DateField()

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=200)
    summary = models.TextField()
    publication_date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    authors = models.ManyToManyField(Author)

class Copy(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    available = models.BooleanField(default=True)

class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    copy = models.ForeignKey(Copy, on_delete=models.CASCADE)
    borrow_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)

class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    text = models.TextField()

class Publisher(models.Model):
    name = models.CharField(max_length=200)
    books = models.ManyToManyField(Book)

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    rating = models.IntegerField()
