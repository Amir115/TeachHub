import { Person } from '../types';

export default [
    {
        id: '1',
        firstName: 'Haim',
        lastName: 'Moshe',
        aboutInformation: 'I am a tech lead in the best company in Israel, working with master JS mr. mor cohen the architect.',
        birthDate: new Date(),
        education: 'College of management',
        knowledges: [
            {name: 'baking', level: 5},
            {name: 'js', level: 7}
        ]
    },
    {
        id: '2',
        firstName: 'Tal',
        lastName: 'Mikey',
        aboutInformation: 'I am a tech lead in the best company in Israel, working with master JS mr. mor cohen the architect.',
        birthDate: new Date(),
        education: 'College of management',
        knowledges: [
            {name: 'running', level: 5},
            {name: 'history', level: 7}
        ]
    }
] as Person[]