import { useEffect, useState } from "react";
import { Button } from "./Button";
import { Job } from "./Job";
import { SelectField } from "./SelectField";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";



export function ViewJobs(){

    const navigate = useNavigate();

    function handleOnClick(id){
        navigate("/jobs/" + id);
    }

    const [filter, setFilter] = useState({
        "title": "",
        "status": "offer",
        "job_type": "full-time"
    })

    const baseUrl = "http://localhost:3000/api/v1/jobs/";

    const [url, setUrl] = useState(baseUrl);

    const {loading, jobs} = useFetch(url);

    function handleChange(e){
        const {name, value} = e.target;
        setFilter((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        handleSearch();
    }, [filter.status, filter.job_type]);

    function handleSearch(){
        setUrl(baseUrl + "?search=" + filter.title + "&status=" + filter.status + "&job-type=" + filter.job_type);
    }

    return (
        <div className="flex flex-col gap-5 md:gap-10 px-4 md:px-12 py-6 md:py-12 bg-[#FAFBFF] dark:bg-[#0F0F0F]">
            <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold">Job Applications</span>
                <span className="text-base text-[#5E5E5E]">Manage and track all your job applications</span>
            </div>
            <div className="grid grid-cols-12 gap-2 md:gap-6">
                <div className="flex gap-2 justify-start col-span-12 md:col-span-6">
                    <input placeholder="Search" value={filter.title} name="title" onChange={handleChange} className="py-3 sm:py-4 px-4 w-full bg-white shadow-sm dark:shadow-black/40 dark:bg-black rounded-md outline-none"/>
                    <Button title="Search" handleOnClick={handleSearch}/>
                </div>
                <div className="flex flex-col text-lg col-span-6 md:col-span-3 gap-3">
                    <SelectField options={["applied", "shortlisted", "offer", "rejected", "interview"]} title="Status" name="status" handleChange={handleChange}/>
                </div>
                <div className="flex flex-col text-lg col-span-6 md:col-span-3 gap-3">
                    <SelectField options={["full-time", "part-time", "internship", "contract"]} title="Job Type" name="job-type" handleChange={handleChange}/>
                </div>
            </div>
            <div>
                <span>Showing 1 of 1 applications</span>
            </div>
            <div className="grid grid-cols-12 text-lg gap-y-8 gap-x-2 md:gap-x-8">
                {
                    
                    loading ? <span>Loading</span> : jobs.length > 0 && jobs.map((job) => (
                        <Job key={job._id} id={job._id} title={job.title} company={job.company} job_type={job.job_type} location={job.location} status={job.current_status} handleOnClick={handleOnClick}/>
                    ))
                }
                <div className="flex items-center justify-center col-span-12 md:col-span-4">
                    <Button title="+ Add New Job"/>
                </div>   
            </div>
        </div>
    )
}