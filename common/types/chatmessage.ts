import { Person } from "./person"

export interface ChatMessage {
    id: string,
    text: string,
    user: Person
}