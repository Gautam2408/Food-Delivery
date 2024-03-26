import { useEffect, useState } from "react";

export default function useFetch(fetchFn, initVal) {
  const [isLoading, setisLoading] = useState();
  const [error, setError] = useState();
  const [data, setData] = useState(initVal);

  useEffect(() => {
    async function fetchData() {
      setisLoading(true);
      try {
        // console.log("fetccccch");
        const result = await fetchFn();
        setData(result);
      } catch (error) {
        setError(error.message || "Error Occured");
      }

      setisLoading(false);
    }

    fetchData();
  }, []);

  return {
    isLoading,
    error,
    data,
    setError,
  };
}
