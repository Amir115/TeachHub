import { useState } from 'react';
import { setUser } from '../../auth';
import axios from 'axios';

export type LoginUIResult = [(email: string, password: string) => Promise<void>, boolean, string]

function useLogin(): LoginUIResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const login = async (email: string, password: string) => {
        setIsLoading(true)

        try {
            const res = await axios.post('/api/login/', {username: email, password});

            if (res.status !== 200) {
                throw Error('Cannot login')
            }

            const loggedInUser = await res.data;
            setUser(loggedInUser);
        } catch (e: any) {
            setError(e.message)
            throw e;
        } finally {
            setIsLoading(false)
        }
    }

    return [login, isLoading, error];
}

export default useLogin;