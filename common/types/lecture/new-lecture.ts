import { Person } from '../person';

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
  image: string | ArrayBuffer
  participants: number
}