import { useEffect, useState } from 'react';
import { apiClient } from '../utils/axios/axios-client'

const useFetch = <T extends unknown>(route: string, dependencies: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await apiClient.instance.get<T>(`/${route}`);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, dependencies);

  return {
    data,
    loading,
  };
};

export default useFetch;
