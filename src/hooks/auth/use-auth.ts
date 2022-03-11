import { useState, useEffect } from 'react';
import { UserSession, onUserSet, getUser } from '../../auth';

const useAuth = (): UserSession | null => {
    const [currentUserSession, setCurrentUserSession] = useState(getUser())

    useEffect(() => {
        const unsubscribe = onUserSet(userSession => setCurrentUserSession(userSession));

        return unsubscribe;
    }, []);

    return currentUserSession;
}

export default useAuth;