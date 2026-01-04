export function InputField({title, type, name, value, handleChange, required, isTouched, handleBlur}){
    return (
        <div className="flex flex-col text-lg col-span-12 md:col-span-6 gap-1 md:gap-2">
            <span>{title}{required && <span className="text-red-500">*</span>}</span>
            <input onBlur={handleBlur} className="py-3 sm:py-4 px-4 bg-white shadow-sm dark:shadow-black/40 dark:bg-black rounded-md outline-none" type={type} name={name} value={value} onChange={handleChange}/>
            {(isTouched && !value.trim()) && <span className="text-sm text-red-500 min-h-[1.25rem]">
                {title + " is required"}
            </span>}
        </div>
    )
}