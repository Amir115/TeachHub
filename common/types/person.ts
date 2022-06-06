import { Interest } from './interest';
import { Lecture } from './lecture/lecture';

export interface Person {
    _id: string;
    firstName: string;
    lastName: string;
    interests: Interest[];
    subscribedLectures?: Lecture[];
    education?: string;
    aboutInformation?: string;
    birthDate?: Date;
}