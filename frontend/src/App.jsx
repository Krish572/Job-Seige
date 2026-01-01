import { useState } from "react";
import { Features } from "./components/Features";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { X } from "lucide-react";

function App() {
  const [showSignin, setShowSignin] = useState(false);

  return (
    <div className="dark:text-white dark:bg-black">
      <Navbar setShowSignin={setShowSignin} />
      <Hero />
      <Features />
      {showSignin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-[#16171A] rounded-lg p-8 w-full max-w-md relative">
            <button
              onClick={() => setShowSignin(false)}
              className="cursor-pointer absolute top-3 right-3 hover:text-gray-500"
            >
              <X />
            </button>
            Sign In component
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
