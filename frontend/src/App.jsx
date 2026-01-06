import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./components/Dashboard";
import { AddJob } from "./components/AddJob";
import { Signin } from "./components/Signin";
import {ViewJobs} from "./components/ViewJobs";
import { ViewAJob } from "./components/ViewAJob";

function App() {
  return (
    <>
      <div className="dark:text-white bg-[#FAFBFF] dark:bg-[#0F0F0F]">
        <Navbar />
        {/* <ViewJobs/> */}
        

        <Routes>
          <Route path="/jobs" element={<ViewJobs/>}/>
          <Route path="/jobs/:id" element={<ViewAJob/>} />
          <Route path="/edit-job/:id" element={<AddJob />} />
          <Route path="/add-job" element={<AddJob />} />
        </Routes>

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
