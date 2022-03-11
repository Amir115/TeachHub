const LOCAL_STORAGE_USER_KEY = 'user'

export interface UserSession {
    token: string
    userId: string
    username: string
}

type UserSetCallback = (user: UserSession) => void

const userSetListeners: UserSetCallback[] = []

export const setUser = (user: UserSession) => {
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
    userSetListeners.forEach(x => x(user));
};

export const getUser = (): UserSession | null => {
    const userSessionString = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    if (!userSessionString) {
        return null;
    }

    return JSON.parse(userSessionString);
};

export const onUserSet = (callback: UserSetCallback) => {
    userSetListeners.push(callback);

    return () => {
        const index = userSetListeners.indexOf(callback);
        userSetListeners.splice(index, 1);
    }
}