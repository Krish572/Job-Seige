import { useState } from "react";
import { InputField } from "./InputField";
import { SelectField } from "./SelectField";
import axios from "axios";

<<<<<<< HEAD
export function AddJob() {
  const [touched, setTouched] = useState({
    title: false,
    company: false,
    job_type: false,
  });

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    contact: "",
    applied_on: "",
    current_status: "applied",
    notes: "",
    isShortlisted: false,
    user_id: "",
    salary_expected: "",
    interview_date: "",
    application_link: "",
    description: "",
    job_type: "",
    ai_context: "",
    salary_offered: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  async function handleSubmit() {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/jobs",
        job
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-5 md:gap-10 px-4 md:px-12 py-6 md:py-12 bg-[#FAFBFF] dark:bg-[#0F0F0F]">
      <div className="flex flex-col">
        <span className="text-4xl md:text-5xl font-bold">Add New Job</span>
        <span className="text-base text-[#5E5E5E]">
          Track a new application
        </span>
      </div>
      <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
        <span className="text-2xl md:3xl font-semibold">Basic Information</span>
        <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
          <InputField
            title="Job Title"
            type="text"
            name="title"
            value={job.title}
            handleChange={handleChange}
            required={true}
            isTouched={touched.title}
            handleBlur={handleBlur}
          />
          <InputField
            title="Company Name"
            type="text"
            name="company"
            value={job.company}
            handleChange={handleChange}
            isTouched={touched.company}
            handleBlur={handleBlur}
            required={true}
          />
          <InputField
            title="Location"
            type="text"
            name="location"
            value={job.location}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
        <span className="text-2xl md:3xl font-semibold">Job Details</span>
        <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
          <InputField
            title="Description"
            type="text"
            name="description"
            value={job.description}
            handleChange={handleChange}
          />
          <div className="flex flex-col text-lg col-span-12 md:col-span-6 gap-3">
            <span>
              Job Type<span className="text-red-500">*</span>
            </span>
            <SelectField
              options={["full-time", "part-time", "internship", "contract"]}
              name="job_type"
              value={job.job_type}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {touched.job_type && (
              <span className="text-sm text-red-500 min-h-[1.25rem]">
                {title + " is required"}
              </span>
            )}
          </div>
          <InputField
            title="Application Link"
            type="text"
            name="application_link"
            value={job.application_link}
            handleChange={handleChange}
          />
          <InputField
            title="Contact"
            type="text"
            name="contact"
            value={job.contact}
            handleChange={handleChange}
          />
          <div className="flex flex-col text-lg col-span-12 md:col-span-6 gap-3">
            <span>Status</span>
            <SelectField
              options={[
                "applied",
                "shortlisted",
                "offer",
                "rejected",
                "interview",
              ]}
              name="current_status"
              value={job.current_status}
              handleChange={handleChange}
            />
          </div>
          <label className="flex items-center gap-2 col-span-12 md:col-span-6 cursor-pointer">
            <input
              type="checkbox"
              name="isShortlisted"
              checked={job.isShortlisted}
              onChange={(e) => {
                handleChange({
                  target: {
                    name: "isShortlisted",
                    value: e.target.checked,
                  },
                });
              }}
            />
            <span>Mark as shorlisted</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
        <span className="text-2xl md:3xl font-semibold">Important Dates</span>
        <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
          <InputField
            title="Applied On"
            type="calender"
            name="applied_on"
            value={job.applied_on}
            handleChange={handleChange}
          />
          <InputField
            title="Interview Date"
            type="calender"
            name="interview_date"
            value={job.interview_date}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
        <span className="text-2xl md:3xl font-semibold">Salary</span>
        <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
          <InputField
            title="Expected Salary"
            type="Number"
            name="salary_expected"
            value={job.salary_expected}
            handleChange={handleChange}
          />
          <InputField
            title="Salary Offered"
            type="Number"
            name="salary_offered"
            value={job.salary_offered}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
        <span className="text-2xl md:3xl font-semibold">Additional Info</span>
        <div className="flex flex-col gap-3">
          <span className="text-lg">Notes</span>
          <textarea
            title="Notes"
            type="text"
            name="notes"
            value={job.notes}
            onChange={handleChange}
            className="py-3 sm:py-4 px-4 bg-white shadow-sm dark:bg-black rounded-md outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:justify-end px-4 py-2 md:p-10 rounded-xl gap-4 md:gap-8">
        <button className="cursor-pointer gap-4 shadow-sm dark:shadow-black/40 border dark:border-white px-4 py-3 sm:py-4 dark:text-white rounded-md">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer shadow-sm dark:shadow-black/40 gap-4 py-3 sm:py-4 bg-[#006ECF] px-4 text-white hover:bg-[#007CEF] active:bg-[#00539C] rounded-md"
        >
          Save Job
        </button>
      </div>
    </div>
  );
}
=======
export function AddJob(){

    const [touched, setTouched] = useState({
        title: false,
        company: false,
        job_type: false
    })

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        contact: "",
        applied_on: "",
        current_status: "applied",
        notes: "",
        isShortlisted: false,
        user_id: "",   
        salary_expected: "",
        interview_date: "",
        application_link: "",
        description: "",
        job_type: "",
        ai_context: "",
        salary_offered: ""
    });

    function handleChange(e){
        const {name, value} = e.target
        setJob((prev) => ({
            ...prev,
            [name] : value
        }))
    }

    function handleBlur(e){
        const {name} = e.target;
        setTouched((prev) => ({
            ...prev,
            [name]: true
        }))
    }

    async function handleSubmit(){
        try{
            const response = await axios.post("http://localhost:3000/api/v1/jobs", job);
            console.log(response);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col gap-5 md:gap-10 px-4 md:px-12 py-6 md:py-12 bg-[#FAFBFF] dark:bg-[#0F0F0F]">
            <div className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold">Add New Job</span>
                <span className="text-base text-[#5E5E5E]">Track a new application</span>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
                <span className="text-2xl md:3xl font-semibold">Basic Information</span>
                <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
                    <InputField title="Job Title" type="text" name="title" value={job.title} handleChange={handleChange} required={true} isTouched={touched.title} handleBlur={handleBlur}/>
                    <InputField title="Company Name" type="text" name="company" value={job.company} handleChange={handleChange} isTouched={touched.company} handleBlur={handleBlur} required={true}/>
                    <InputField title="Location" type="text" name="location" value={job.location} handleChange={handleChange}/>
                </div>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
                <span className="text-2xl md:3xl font-semibold">Job Details</span>
                <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
                    <InputField title="Description" type="text" name="description" value={job.description} handleChange={handleChange}/>
                    <div className="flex flex-col text-lg col-span-12 md:col-span-6 gap-3">
                        <span>Job Type<span className="text-red-500">*</span></span>
                        <SelectField options={["full-time", "part-time", "internship", "contract"]} name="job_type" value={job.job_type} handleChange={handleChange} handleBlur={handleBlur}/>
                        {touched.job_type && <span className="text-sm text-red-500 min-h-[1.25rem]">
                            {title + " is required"}
                        </span>}
                    </div>
                    <InputField title="Application Link" type="text" name="application_link" value={job.application_link} handleChange={handleChange}/>
                    <InputField title="Contact" type="text" name="contact" value={job.contact} handleChange={handleChange}/>
                    <div className="flex flex-col text-lg col-span-12 md:col-span-6 gap-3">
                        <span>Status</span>
                        <SelectField options={["applied", "shortlisted", "offer", "rejected", "interview"]} name="current_status" value={job.current_status} handleChange={handleChange}/>
                    </div>
                    <label className="flex items-center gap-2 col-span-12 md:col-span-6 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isShortlisted"
                            checked={job.isShortlisted}
                            onChange={(e) => {
                                handleChange({
                                    target: {
                                        name: "isShortlisted",
                                        value: e.target.checked,
                                    }
                                })
                            }}
                        />
                        <span>Mark as shorlisted</span>
                    </label>
                </div>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
                <span className="text-2xl md:3xl font-semibold">Important Dates</span>
                <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
                    <InputField title="Applied On" type="calender" name="applied_on" value={job.applied_on} handleChange={handleChange}/>
                    <InputField title="Interview Date" type="calender" name="interview_date" value={job.interview_date} handleChange={handleChange}/>
                </div>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
                <span className="text-2xl md:3xl font-semibold">Salary</span>
                <div className="grid grid-cols-12 gap-2 md:gap-x-15 md:gap-y-4">
                    <InputField title="Expected Salary" type="Number" name="salary_expected" value={job.salary_expected} handleChange={handleChange}/>
                    <InputField title="Salary Offered" type="Number" name="salary_offered" value={job.salary_offered} handleChange={handleChange}/>
                </div>
            </div>
            <div className="flex flex-col px-4 py-6 md:p-10 rounded-xl gap-4 md:gap-8 bg-[#F0F3FF] dark:bg-[#16171A]">
                <span className="text-2xl md:3xl font-semibold">Additional Info</span>
                <div className="flex flex-col gap-3">
                    <span className="text-lg">Notes</span>
                    <textarea title="Notes" type="text" name="notes" value={job.notes} onChange={handleChange} className="py-3 sm:py-4 px-4 bg-white shadow-sm dark:bg-black rounded-md outline-none"/>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-end px-4 py-2 md:p-10 rounded-xl gap-4 md:gap-8">
                <button className="cursor-pointer gap-4 shadow-sm dark:shadow-black/40 border dark:border-white px-4 py-3 sm:py-4 dark:text-white rounded-md">Cancel</button>
                <button onClick={handleSubmit} className="cursor-pointer shadow-sm dark:shadow-black/40 gap-4 py-3 sm:py-4 bg-[#006ECF] px-4 text-white hover:bg-[#007CEF] active:bg-[#00539C] rounded-md">Save Job</button>
            </div>
        </div>
    )
}
>>>>>>> 4f03e602919416f1b421e9534226bcb412e09bb9
