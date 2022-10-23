export interface IRecord {
  id: string;
  date: number;
  misspelled: IWord[];
  words: IWord[];
  wpm: number; // words per minute
  accuracy: number; // 0-100
}

export interface IWord {
  word: string;
  startTime: number;
  endTime: number;
  time: number;
  wpm: number;
}
