interface Word {
  word: string;
  definition: string;
}
interface WordList {
  id: number;
  name: string;
  words: Array<Word>;
}
