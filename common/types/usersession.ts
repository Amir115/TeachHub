import { Person } from "./person"

export interface UserSession {
    id: string,
    token: string,
    user: Person
}