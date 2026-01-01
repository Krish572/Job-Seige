import { Menu } from "lucide-react"
import { useState } from "react"

export function Navbar(){
    const [menu, setMenu] = useState(false);
    return(
        <div className="relative">
            <div className="w-full h-20 bg-[#FAFBFF] flex justify-between items-center px-5 md:px-12 md:py-5">
                <div className="flex w-full sm:w-auto items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-bold text-[#2681D1] cursor-pointer">JOB SEIGE</span>
                    <Menu className="block sm:hidden cursor-pointer" onClick={() => setMenu(state => !state)}/>
                </div>
                <div className="hidden sm:flex text-lg gap-10">
                    <span className="cursor-pointer">Features</span>
                    <span className="cursor-pointer">Sign in</span>
                </div>
            </div>
            
            <div
                className={`
                    sm:hidden
                    absolute
                    right-0 left-0
                    bg-[#FAFBFF]
                    border-t
                    px-5
                    z-50
                    overflow-hidden
                    transition-[max-height,opacity] duration-1000 ease-in-out
                    ${menu ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
                `}
                >
                <div className="py-4 flex flex-col gap-4">
                    <span className="cursor-pointer">Features</span>
                    <span className="cursor-pointer">Sign in</span>
                </div>
            </div>
        </div>
    )
}