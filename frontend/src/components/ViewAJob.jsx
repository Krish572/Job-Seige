import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "./Button";

export function ViewAJob(){

    const navigate = useNavigate();

    function handleEdit(){
        navigate("/edit-job/" + job._id);
    }

    function handleAdd(){
        navigate("/add-job");
    }

    const [job, setJob] = useState({});

    const {id} = useParams();


    async function getJob(){
        try{
            const response = await axios.get("http://localhost:3000/api/v1/jobs/" + id);
            setJob(response.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        getJob();
    },[id]);

    return (
        <>
            {Object.keys(job).length > 0 && (<div className="p-2 md:p-4 bg-[#FAFBFF] dark:bg-[#0F0F0F] dark:text-white">
                <div className="flex flex-col">
                    {Object.entries(job).map(([key, value]) => key !== "user_id" && (
                        <div key={key} className="flex justify-between">
                            <span className="flex-1 text-center">{key}</span>
                            <span className="">:</span>
                            <span className="flex-1 text-center">{typeof value === "object" ? JSON.stringify(value) : value}</span>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end gap-5">
                    <Button title="Edit" handleOnClick={handleEdit}/> 
                    <Button title="+ Add new round" handleOnClick={handleAdd}/>
                </div>
            </div>)}
        </>
    )
}