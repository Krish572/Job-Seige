import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { AddJob } from "./components/AddJob";
import { Signin } from "./components/Signin";
import { ViewJobs } from "./components/ViewJobs";

function App() {
  return (
    <>
      <div className="dark:text-white dark:bg-black">
        <Navbar />
        <ViewJobs/>
      </div>

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-job" element={<AddJob />} />
        <Route path="/sign-in" element={<Signin />} />
      </Routes> */}
    </>
  );
}

export default App;
