import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url){
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getPosts(){
        try{
            setLoading(true);
            const response = await axios.get(url);
            setJobs(response.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        getPosts();
    }, [url]);

    return {jobs, loading};
}