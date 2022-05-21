import { NewLecture } from "./new-lecture";

export interface Lecture extends NewLecture {
  _id: string;
}

export interface LectureViewModel extends Omit<Lecture, "level"> {
  level: number;
  rated: boolean;
}
