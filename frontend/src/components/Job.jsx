export function Job({title, company, job_type, location, status}){
    return (
        <div className="transition-all md:p-8 duration-500 ease-in-out col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-10 bg-[#F0F3FF] dark:bg-[#16171A] p-6 rounded-md  hover:shadow-lg dark:shadow-gray-700">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-2 items-center">
                    <span className="text-xl font-bold">{title}</span>
                    <span className="cursor-pointer text-base text-[#006ECF] hover:text-[#007CEF] active:text-[#00539C]">Add Rounds</span>
                </div>
                <span className="text-[#5E5E5E] text-base w-full">{company}</span>
                <span className="text-[#5E5E5E] text-base w-full">{job_type} {location && (" | " + location)}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-base text-green-500">{status}</span>
                <div className="flex gap-5">
                    <span className="cursor-pointer text-base text-[#006ECF] hover:text-[#007CEF] active:text-[#00539C]">Edit</span>
                    <span className="cursor-pointer text-base text-red-500 hover:text-red-700 active:text-red-500">Delete</span>
                </div>
            </div>
        </div>
    )
}