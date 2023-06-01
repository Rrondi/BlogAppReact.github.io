import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true); //Loading screen if it takes time to get data
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for the resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setBlogs(data);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsLoading(false);
          setError(error.massage);
        }
      });
    return () => abortController.abort();
  }, [url]);

  return { blogs, isLoading, error };
};

export default useFetch;
