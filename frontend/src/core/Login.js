import { useState } from 'react';
import axios from 'axios';
import "./style.css";

import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShown, setIsSHown] = useState(false);
    const history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post(
            "http://localhost:8080/api/user/login",
            {
                username, password
            }
        ).then((result) => {
            if (result.status === 200) {
                console.log("login success")
                console.log(result.data)
                const id = result.data["user"][0]["_id"]
                history(`/home/${id}/true`);
                
            } else {
                alert("Login failed,Try Again")
            }
        }).catch(Err => {
            console.log(`login failed ${Err}`)
            alert("Login failed,Try Again")
        })

    }

    return (
        <div className='container'>
            <div className='container1'>
                <div className='container2'>
                    <span className='text'>MACHINE LOGIN</span>
                </div>
                <div className='container3'>
                    <div className='container4'>
                        <form className='form' onSubmit={handleSubmit}>
                            <div className='container5'>
                                <span className='text1'>USERNAME  </span>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className='textinput1'
                                    id="username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                                <div className='container5'>
                                    <span className='text1'>PASSWORD</span>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        className='textinput1'
                                        id="password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                    <button className='savebutton'>SIGN IN</button>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}