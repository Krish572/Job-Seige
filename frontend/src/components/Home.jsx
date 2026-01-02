import { useState } from "react";
import { Features } from "./Features";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import {AuthContext} from "../context/AuthContext.js"
import { Signin } from "./Signin.jsx";

export function Home(){

    const [showSignin, setShowSignin] = useState(false);
    const [isnew, setIsnew] = useState(false);

    return (
        <AuthContext.Provider value={{showSignin, setShowSignin, isnew, setIsnew}}>
            <Navbar/>
            <Hero />
            <Features />
            {(showSignin || isnew) && (
                <Signin/>
            )}
        </AuthContext.Provider>
    )
}