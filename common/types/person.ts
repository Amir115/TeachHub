import { Interest, InterestViewModel } from './interest';
import { Lecture } from './lecture/lecture';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    interests: Interest[];
    subscribedLectures?: Lecture[];
    education?: string;
    aboutInformation?: string;
    birthDate?: Date;
}

export interface PersonViewModel extends Omit<Person, 'interests'> {
    interests: InterestViewModel[];
}