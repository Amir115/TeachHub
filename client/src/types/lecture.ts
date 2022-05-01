import { Person } from './person';

export interface LecturePreview {
  id: string
  name: string
  topic: string
  lecturer: Person
  information: string
  duration: string
  date: Date
  cost: number
  tags: string[]
  image: string
  participants: number
}