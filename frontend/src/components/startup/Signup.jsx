import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import './Login.css'

export function SignupPage() {
    return <>
    <Signup/>
    </>
}

function Signup() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function emailHandler(e) {
        setEmail(e.target.value)
    }
    function usernamelHandler(e) {
        setUsername(e.target.value)
    }
    function passwordHandler(e) {
        setPassword(e.target.value)
    }
    const sendReq = async () => {
        const data = {
            email: email,
            username: username,
            password: password
        }
        if (email) {
            if (username) {
                if (password) {
                    try {
                        const response = await axios.post("http://localhost:9000/api/signup", data)
                        console.log(response)
                        if(response.data.msg == "User created"){
                            navigate("/")
                        }else{
                            alert(response.data.msg)
                        }
                    } catch (err) {
                        alert(err.response.data.msg)
                    }
                } else {
                    alert("enter your password")
                }
            } else {
                alert("enter your username")
            }
        } else {
            alert("enter your email")
        }
    }
    return (
        <div className="maincontainer"> {/* Apply the maincontainer class */}
            <h2 className="logo-name">DialogAi</h2>
            <div className="content">
                <h4 className="logintxt">Create your account</h4><br></br>
                <div className="field">
                    <input type="text" placeholder="Email" value={email} onChange={emailHandler}></input><br></br>
                </div>
                <div className="field">
                    <input type="text" placeholder="Username" value={username} onChange={usernamelHandler}></input><br></br>
                </div>
                <div className="field">
                    <input type="password" placeholder="Password" value={password} onChange={passwordHandler}></input><br></br>
                </div>
                <button className="signin-btn" onClick={sendReq}>Signup</button> {/* Apply the signin-btn class */}
            </div>
        </div>
    );
}