import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export function ViewAJob(){

    const [job, setJob] = useState({});

    const {id} = useParams();

    console.log(id);

    async function getJob(){
        try{
            const response = await axios.get("http://localhost:3000/api/v1/jobs/" + id);
            setJob(response.data);
            console.log(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getJob();
    },[id]);

    return (
        <div>
            {Object.entries(job).map(([key, value]) => (
            <div key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "object" ? JSON.stringify(value) : value}
            </div>
            ))}
        </div>
    )
}