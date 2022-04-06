import { Knowledge } from './knowledge';

export interface Person {
    id: number; // TODO: change to ObjectId
    firstName: string;
    lastName: string;
    aboutInformation: string;
    birthDate: Date;
    education: string;
    knowledges: Knowledge[];
}