from django.contrib import admin
from library.models import Author, Book, Category, Copy, Borrowing, Comment, Publisher, Rating


@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('name', 'birth_date')
    search_fields = ('name',) 

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'publication_date', 'get_authors', 'category')
    search_fields = ('title',)
    list_filter = ('category',)

    def get_authors(self, obj):
        return ", ".join([author.name for author in obj.authors.all()])
    get_authors.short_description = 'Authors'

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Copy)
class CopyAdmin(admin.ModelAdmin):
    list_display = ('book', 'available')
    list_filter = ('available',)

@admin.register(Borrowing)
class BorrowingAdmin(admin.ModelAdmin):
    list_display = ('user', 'copy', 'borrow_date', 'return_date')
    list_filter = ('borrow_date', 'return_date')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('book', 'user', 'text')
    search_fields = ('text',)

@admin.register(Publisher)
class PublisherAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'rating')
    list_filter = ('rating',)
