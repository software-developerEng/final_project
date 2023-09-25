import { useState, useEffect } from "react";
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFetch = (endpoint, requestdata, method, key) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('access_token'); 
            const options = {
                method: method,
                url: `https://localhost:8000/${endpoint}`,
                data: requestdata,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.request(options);
            console.log('response.data', response.data);
            setData(response.data[key]); 
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(data)
    }, [data])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch }
}

export default useFetch;
