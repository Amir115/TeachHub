import { useState } from 'react';
import axios from 'axios';

export type SignUpData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date;
}

type SignUpFn = (signUpData: SignUpData) => Promise<void>
export type SignUpUIResult = [SignUpFn, boolean, string]

function useSignUp(): SignUpUIResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('')

    const signup: SignUpFn = async singUpData => {
    setIsLoading(true)

    try {
      const res = await axios.post('/api/login/signup', {username: singUpData.email, ...singUpData})

      if (res.status !== 200) {
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