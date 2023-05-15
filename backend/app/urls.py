from app.views.wordlist import (
    WordListCreateAPIView,
    WordListRetrieveUpdateDestroyAPIView,
)
from django.urls import path

urlpatterns = [
    path("wordlist", WordListCreateAPIView.as_view()),
    path("wordlist/<int:pk>", WordListRetrieveUpdateDestroyAPIView.as_view()),
]
