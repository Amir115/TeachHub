import { useState } from 'react';
import { setUser } from '../../auth';

export type LoginUIResult = [(email: string, password: string) => Promise<void>, boolean, string]

function useLogin(): LoginUIResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const login = async (email: string, password: string) => {
        setIsLoading(true)

        try {
            // TODO: Really do the login (use email & password)
            await new Promise(resolve => setTimeout(resolve, 2000))
            setUser({token: '123', userId: 'xxx', username: 'moshe'});
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