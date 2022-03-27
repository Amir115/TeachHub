import { Person } from './person';

export interface LecturePreview {
  id: number; // TODO: change to objectId or so
  name: string;
  topic: string;
  lecturer: Person;
  information: string;
  duration: string;
  date: Date;
  cost: number;
  tags: [string];
  image: string;
}
