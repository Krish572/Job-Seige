export function SelectField({options, name, value, handleChange, handleBlur}){
    return (
        <select onBlur={() => console.log("Blurred")} className="py-3 sm:py-4 px-4 bg-white shadow-sm dark:bg-black rounded-md outline-none" name={name} value={value} onChange={handleChange}>
            <option value="">Select an option</option>
            {
                options.map(opt => (
                    <option  key={opt} value={opt}>{opt}</option>
                ))
            }
        </select>
    )
}