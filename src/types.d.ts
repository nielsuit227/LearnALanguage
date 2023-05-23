interface Word {
  word: string;
  definition: string;
}
interface WordList {
  id: string;
  name: string;
  language: string;
  translation: string;
  words: Array<Word>;
}
