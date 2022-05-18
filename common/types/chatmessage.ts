import { Person } from "./person"
import { Lecture } from './lecture/lecture';

export interface ChatMessage {
    id: string,
    text: string,
    user: Person,
    lecture: Lecture
}