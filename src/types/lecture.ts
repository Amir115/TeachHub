export interface LecturePreview {
  id: number; // TODO: change to objectId or so
  name: string;
  topic: string;
  lecturer: Person;
  information: string;
  date: Date;
}
