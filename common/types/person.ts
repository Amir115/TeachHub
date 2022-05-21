import { Interest, InterestViewModel } from './interest';

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
    interests: Interest[];
    education?: string;
    aboutInformation?: string;
    birthDate?: Date;
}

export interface PersonViewModel extends Omit<Person, 'interests'> {
    interests: InterestViewModel[];
}