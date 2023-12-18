// useDataLoader.js
import { useEffect, useState } from "react";
import axios from "axios";

const useDataLoader = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Simulating a delay of 2 seconds (2000 milliseconds) using setTimeout
        const timeout = setTimeout(async () => {
          const response = await axios.get(url);
          setData(response.data);
          setLoading(false);
        }, 2000);

        return () => clearTimeout(timeout); // Clear timeout if component unmounts before the delay completes
      } catch (error) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useDataLoader;
