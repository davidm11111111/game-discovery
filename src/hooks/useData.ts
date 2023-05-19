import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";



interface FetchResponse<T> {
    count: number;
    results: T[];
}


const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState(" ");
    const [isLoading, setLoading] = useState(true); // Set initial value to true
  
    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
            .get<FetchResponse<T>>(endpoint, { signal: controller.signal})
            .then((res) => {
                setData(res.data.results);
                setLoading(false); // Set isLoading to false on success
            })
            .catch((err) => {
                if (err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false); // Set isLoading to false on error
            });
            return () => controller.abort();
        }, []);

    return { data, error, isLoading };
};

export default useData;