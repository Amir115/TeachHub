import { useEffect, useState } from 'react';

const useLocalStorage = (key: string) => {
  const [data, setData] = useState(() => localStorage.getItem(key));

  useEffect(() => {
      if (data) {
        localStorage.setItem(key, data);
      }
    }, [data]);

  return [data, setData]
}

export default useLocalStorage;