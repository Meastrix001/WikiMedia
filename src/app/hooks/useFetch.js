import { useState, useEffect } from 'react';
const useFetch = (url, page) => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
        setData2(json)
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [page, url]);
  return { data, data2, error, isLoading };
    };

export default useFetch