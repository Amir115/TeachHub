import {useEffect, useState} from 'react';
import {getUser, onUserSet, UserSession} from '../../auth';

const useAuth = (): UserSession | null => {
    const [currentUserSession, setCurrentUserSession] = useState(getUser())

    useEffect(() => {
        return onUserSet(userSession => setCurrentUserSession(userSession));
    }, []);

    return currentUserSession;
}

export default useAuth;