import {useEffect, useState} from 'react';
import {getUser, onUserSet, PersonWithUsername} from '../../auth';

const useAuth = (): PersonWithUsername | null => {
    const [currentUserSession, setCurrentUserSession] = useState(getUser())

    useEffect(() => {
        return onUserSet(userSession => setCurrentUserSession(userSession));
    }, []);

    return currentUserSession;
}

export default useAuth;