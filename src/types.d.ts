interface Word {
  word: string;
  definition: string;
}
interface WordList {
  id: string;
  name: string;
  words: Array<Word>;
}
