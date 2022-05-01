import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseLocalStorage = [string | null, Dispatch<SetStateAction<string | null>>]

const useLocalStorage = (key: string): UseLocalStorage => {
  const [data, setData] = useState(() => localStorage.getItem(key));

  useEffect(() => {
      if (data) {
        localStorage.setItem(key, data);
      }
    }, [data]);

  return [data, setData]
}

export default useLocalStorage;