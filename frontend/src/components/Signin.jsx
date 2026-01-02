import { useState, useContext } from "react";
import { X } from "lucide-react";
import googlelogo from "../assets/googlelogo.svg";
import { AuthContext } from "../context/AuthContext";

export function Signin(){

    const {setShowSignin, isnew, setIsnew} = useContext(AuthContext);

    return (
        <div className="fixed inset-0 z-50 flex p-5 items-center justify-center bg-black/50">
                <div className="bg-[#F0F3FF] dark:bg-[#16171A] rounded-lg px-6 py-8 sm:p-8 w-full max-w-md relative">
                    <button
                    onClick={() => {setShowSignin(false); setIsnew(false)}}
                    className="cursor-pointer absolute top-4 right-4 hover:text-gray-500"
                    >
                    <X />
                    </button>
                    <div className="flex flex-col items-center sm:px-5 py-5 gap-2 sm:gap-5">
                        <div className="flex flex-col w-full gap-2 items-center">
                            <button className="cursor-pointer flex items-center justify-center gap-4 py-3 sm:py-4 w-full  bg-[#006ECF] text-white hover:bg-[#007CEF] active:bg-[#00539C] rounded-md">
                                <img src={googlelogo} className="w-8 h-8"/>
                                <span>Continue with Google</span>
                                
                            </button>
                            <span className="text-[#5E5E5E]">Or</span>
                        </div>
                        
                        {isnew && <span className="flex flex-col w-full gap-2">
                            Full Name
                            <input className="w-full py-3 sm:py-4 px-4 bg-white shadow-sm dark:bg-black rounded-md outline-none"/>
                        </span>}
                        
                        <span className="flex flex-col w-full gap-2">
                            Email
                            <input className="w-full py-3 sm:py-4 px-4 bg-white shadow-sm dark:bg-black rounded-md outline-none"/>
                        </span>


                        <span className="flex flex-col w-full gap-2">
                            Password
                            <input className="w-full py-3 sm:py-4 bg-white px-4 shadow-sm dark:bg-black rounded-md outline-none"/>
                        </span>

                        <div className="flex flex-col w-full mt-2">
                            <button className="cursor-pointer hover:bg-[#007CEF] bg-[#006ECF] py-3 sm:py-4 w-full rounded-md active:bg-[#00539C] text-white">{isnew ? "Sign up" : "Sign in"}</button>
                            {!isnew ? <span className="text-[#5E5E5E]">No account? <span className="text-[#2681D1]  cursor-pointer hover:text-[#007CEF]" onClick={() => setIsnew(x => !x)}>Create one</span></span> 
                            :
                            <span className="text-[#5E5E5E]">Already have an account.<span className="text-[#2681D1]  cursor-pointer hover:text-[#007CEF]" onClick={() => {setIsnew(x => !x); setShowSignin(true)}}>Sign in</span></span>}
                        </div>

                    </div>
                </div>
                </div>
        

    )
}