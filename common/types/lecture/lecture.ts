import { NewLecture } from "./new-lecture";
import {Person} from "../person";

export interface LectureRating {
  user: Person;
  rating: number;
}

export interface Lecture extends NewLecture {
  _id: string;
  ratings: LectureRating[]
}