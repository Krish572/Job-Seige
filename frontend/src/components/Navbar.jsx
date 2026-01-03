import { Menu, Sun, Moon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

export function Navbar() {
  const [menu, setMenu] = useState(false);
  const [darkmode, setDarkmode] = useState(false);

  const { setShowSignin } = useContext(AuthContext);

  function handleDarkmode() {
    setDarkmode((mode) => !mode);
    document.documentElement.classList.toggle("dark");
  }

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setDarkmode((mode) => !mode);
    }
  }, []);

  return (
    <div className="sticky top-0 z-50 dark:bg-black bg-white border-b border-[#F0F3FF] dark:border-[#16171A]">
      <div className="w-full h-20 flex justify-between items-center px-5 md:px-12 md:py-5">
        <div className="flex w-full sm:w-auto items-center justify-between">
          <span className="text-3xl sm:text-4xl font-bold text-[#2681D1] cursor-pointer">
            JOB SEIGE
          </span>
          <Menu
            className="block sm:hidden cursor-pointer"
            onClick={() => setMenu((state) => !state)}
          />
        </div>
        <div className="hidden sm:flex gap-10">
          {darkmode === true ? (
            <Moon onClick={handleDarkmode} className="cursor-pointer" />
          ) : (
            <Sun onClick={handleDarkmode} className="cursor-pointer" />
          )}
          <span className="cursor-pointer">
            <a href="#features">Features</a>
          </span>
          <span className="cursor-pointer" onClick={() => setShowSignin(true)}>
            Sign in
          </span>
        </div>
      </div>

      <div
        className={`
                    sm:hidden
                    absolute
                    right-0 left-0
                    border-t
                    bg-white
                    dark:bg-black
                    border-[#F0F3FF] 
                    dark:border-[#16171A]
                    px-5
                    py-5
                    z-50
                    overflow-hidden
                    transition-[max-height,opacity] duration-1000 ease-in-out
                    ${menu ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"}
                `}
      >
        <div className="flex flex-col gap-4 items-center">
          {darkmode === true ? (
            <div
              onClick={() => {
                setMenu((x) => !x);
                handleDarkmode();
              }}
              className="py-2 flex gap-2 cursor-pointer border-b border-[#F0F3FF] 
                        dark:border-[#16171A]"
            >
              <span>Darkmode</span>
              <Moon />
            </div>
          ) : (
            <div
              onClick={() => {
                setMenu((x) => !x);
                handleDarkmode();
              }}
              className="py-2 flex gap-2 cursor-pointer border-b border-[#F0F3FF] 
                        dark:border-[#16171A]"
            >
              <span>Lightmode</span>
              <Sun />
            </div>
          )}
          <span
            onClick={() => setMenu((x) => !x)}
            className="cursor-pointer py-2 border-b border-[#F0F3FF] 
                    dark:border-[#16171A]"
          >
            <a href="#features">Features</a>
          </span>
          <span
            onClick={() => {
              setShowSignin(true);
              setMenu((x) => !x);
            }}
            className="cursor-pointer py-2 border-b border-[#F0F3FF] 
                    dark:border-[#16171A]"
          >
            Sign in
          </span>
        </div>
      </div>
    </div>
  );
}
