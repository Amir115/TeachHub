import { useState } from 'react';
import { setUser } from '../../auth';

export type LoginUIResult = [(email: string, password: string) => Promise<void>, boolean, string]

function useLogin(): LoginUIResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const login = async (email: string, password: string) => {
        setIsLoading(true)

        try {
            const res = await fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: email, password})
            })

            if (!res.ok) {
                throw Error('Cannot login')
            }

            const loggedInUser = await res.json()
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