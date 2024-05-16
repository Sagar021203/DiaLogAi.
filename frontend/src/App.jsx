import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/sidebar";
import Maincon from "./components/main/maincon";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "./components/startup/Login";
import { SignupPage } from "./components/startup/Signup";
import axios from "axios";



function App() {
  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signup" element={<SignupPage />}></Route>
        <Route path="/main" element={<MainconAndSidebar />}></Route>
      </Routes>
    </BrowserRouter>

  </>);
}

function MainconAndSidebar() {
  const [page, setPage] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    async function checkin() {
      try {
        const response = await axios.get(`http://localhost:9000/api/auth?token=${token}`)
        const result = response.data.msg
        if (result === "authorized") {
          setPage(<><Sidebar></Sidebar>
            <Maincon></Maincon></>)
        } else {
          alert("login in to your account first")
          navigate("/")
        }
        //console.log(response)
      } catch (err) {
        alert("login in to your account first")
        navigate("/")
        //console.log(err)
      }
    }
    checkin()
  },[])
  return <>
    {page}
  </>
}


export default App