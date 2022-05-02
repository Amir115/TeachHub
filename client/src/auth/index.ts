import { Person } from '../../../common/types/person';

const LOCAL_STORAGE_USER_KEY = 'user'

export type PersonWithUsername = Partial<Person> & {username: string}
type UserSetCallback = (user: PersonWithUsername | null) => void

const userSetListeners: UserSetCallback[] = []

export const setUser = (user: PersonWithUsername) => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    userSetListeners.forEach(x => x(user));
};

export const getUser = (): PersonWithUsername | null => {
    const userSessionString = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!userSessionString) {
        return null;
    }

    return JSON.parse(userSessionString);
};

export const unsetUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY)
    userSetListeners.forEach(x => x(null));
}

export const onUserSet = (callback: UserSetCallback) => {
    userSetListeners.push(callback);

    return () => {
        const index = userSetListeners.indexOf(callback);
        userSetListeners.splice(index, 1);
    }
}