import { Person } from '../person';

interface Image {
  url: string,
  data: string | ArrayBuffer
}

export interface NewLecture {
  _id?: string
  name: string
  topic: string
  lecturer: Person
  information: string
  duration: number
  date: Date
  cost: number
  tags: string[]
  image: Image
  participants: number
}