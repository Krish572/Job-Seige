import { Button } from "./Button";
import { InputField } from "./InputField";
import { Job } from "./Job";
import { SelectField } from "./SelectField";

export function ViewJobs(){
    return (
        <div className="flex flex-col gap-5 md:gap-10 px-4 md:px-12 py-6 md:py-12 bg-[#FAFBFF] dark:bg-[#0F0F0F]">
            <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold">Job Applications</span>
                <span className="text-base text-[#5E5E5E]">Manage and track all your job applications</span>
            </div>
            <div className="grid grid-cols-12 gap-2 md:gap-6">
                <div className="flex gap-2 justify-start col-span-12 md:col-span-6">
                    <input placeholder="Search"  className="py-3 sm:py-4 px-4 w-full bg-white shadow-sm dark:shadow-black/40 dark:bg-black rounded-md outline-none"/>
                    <Button title="Search"/>
                </div>
                <div className="flex flex-col text-lg col-span-6 md:col-span-3 gap-3">
                    <SelectField options={["applied", "shortlisted", "offer", "rejected", "interview"]} title="Status" name="current_status"/>
                </div>
                <div className="flex flex-col text-lg col-span-6 md:col-span-3 gap-3">
                    <SelectField options={["full-time", "part-time", "internship", "contract"]} title="Job Type" name="current_status"/>
                </div>
            </div>
            <div>
                <span>Showing 1 of 1 applications</span>
            </div>
            <div className="grid grid-cols-12 text-lg gap-y-8 gap-x-2 md:gap-x-8">
                <Job title="Techz" company="Zoho" job_type="full-time" location="chennai" status="Applied"/>
                <Job title="Techz" company="Zoho" job_type="full-time" location="chennai" status="Applied"/>
                <Job title="Techz" company="Zoho" job_type="full-time" location="chennai" status="Applied"/>
                <Job title="Techz" company="Zoho" job_type="full-time" location="chennai" status="Applied"/>
                <Job title="Techz" company="Zoho" job_type="full-time" location="chennai" status="Applied"/>
                <div className="flex items-center justify-center col-span-12 md:col-span-4">
                    <Button className="self-start px-4 py-2" title="+ Add New Job"/>
                </div>   
            </div>
        </div>
    )
}