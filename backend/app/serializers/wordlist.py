from app.models import Word, WordList
from app.serializers.word import WordSerializer
from rest_framework.serializers import ModelSerializer


class WordListSerializer(ModelSerializer[WordList]):
    words = WordSerializer(many=True)

    class Meta:
        model = WordList
        fields = ("id", "name", "words")

    def create(self, validated_data):
        print("Using this create")
        words = validated_data.pop("words")
        word_list = WordList.objects.create(**validated_data)
        for word in words:
            Word.objects.create(word_list=word_list, **word)
        return word_list
