export function Button({title, handleOnClick}){
    return(
        <button className="cursor-pointer shadow-sm dark:shadow-black/40 py-3 sm:py-4 bg-[#006ECF] px-4 hover:bg-[#007CEF] active:bg-[#00539C] rounded-md" onClick={handleOnClick}>{title}</button>
    )
}