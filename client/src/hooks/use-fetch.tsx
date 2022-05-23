import { useEffect, useState } from 'react';
import { apiClient } from '../utils/axios/axios-client'

const useFetch = <T extends unknown>(route: string) => {
  const [data, setData] = useState({} as T);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await apiClient.instance.get<T>(`${route}`);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    loading,
  };
};

export default useFetch;
