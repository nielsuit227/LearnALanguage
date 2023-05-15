from django.db import models


class WordList(models.Model):
    name = models.CharField(max_length=100)


class Word(models.Model):
    word_list = models.ForeignKey(
        WordList, on_delete=models.CASCADE, related_name="words"
    )
    word = models.CharField(max_length=100)
    definition = models.CharField(max_length=200)
