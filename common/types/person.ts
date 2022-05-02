import { Knowledge } from './knowledge';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    aboutInformation?: string;
    birthDate?: Date;
    education?: string;
    knowledges: Knowledge[];
}