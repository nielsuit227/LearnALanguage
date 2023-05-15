from app.models import WordList
from app.serializers.wordlist import WordListSerializer
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView


class WordListCreateAPIView(ListCreateAPIView):
    queryset = WordList.objects.all()
    serializer_class = WordListSerializer


class WordListRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = WordList.objects.all()
    serializer_class = WordListSerializer
