import { useState } from 'react';

type SignUpFn = (email: string, password: string, firstName: string, lastName: string) => Promise<void>
export type SignUpUIResult = [SignUpFn, boolean, string]

function useSignUp(): SignUpUIResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('')

    const signup: SignUpFn = async (email, password, firstName, lastName) => {
        setIsLoading(true)

        try {
            const res = await fetch('/api/login/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: email, firstName, lastName, password})
            })

            if (!res.ok) {
                throw Error('Cannot sign up')
            }
        } catch (e: any) {
            setError(e.message)
            throw e;
        } finally {
            setIsLoading(false)
        }
    }

    return [signup, isLoading, error];
}

export default useSignUp;