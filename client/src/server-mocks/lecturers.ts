import { Person } from '../../../common/types';

export default [
    {
        _id: '1',
        firstName: 'Haim',
        lastName: 'Moshe',
        aboutInformation: 'I am a tech lead in the best company in Israel, working with master JS mr. mor cohen the architect.',
        birthDate: new Date(),
        education: 'College of management',
        interests: [
            {name: 'baking'},
            {name: 'js'}
        ]
    },
    {
        _id: '2',
        firstName: 'Tal',
        lastName: 'Mikey',
        aboutInformation: 'I am a tech lead in the best company in Israel, working with master JS mr. mor cohen the architect.',
        birthDate: new Date(),
        education: 'College of management',
        interests: [
            {name: 'running'},
            {name: 'history'}
        ]
    }
] as Person[]