from app.models import Word
from rest_framework.serializers import ModelSerializer


class WordSerializer(ModelSerializer[Word]):
    class Meta:
        model = Word
        fields = ("id", "word", "definition")
