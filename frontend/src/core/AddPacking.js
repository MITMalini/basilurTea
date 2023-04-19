import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function Addpacking() {
    const [packing_name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [epfno, setEpf] = useState("");
    function sendData(e) {
        e.preventDefault();
        
        //java script objectw
        const newPacking ={
            packing_name,
            email,
            epfno
        }
        axios.post("http://localhost:8080/api/packing/addpacking",newPacking).then(()=>{
            alert("New Packing Operator Added")
        }).catch((err)=>{
            alert(err)

        })
    }
    return (
        <div className='container'>
            <div className='container1'>
                <div className='container2'>
                    <span className='text'>ADD PACKING OPERATOR</span>
                </div>
                <div className='container3'>
                    <div className='container4'>
                        <form className='form' onSubmit={sendData}>
                            <div className='container5'>
                                <span className='text1'>NAME    : </span>
                                <input
                                    type="text"
                                    placeholder="Packing Operator's Name"
                                    className='textinput'
                                    id="name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='container6'>
                                <span className='text2'>EMAIL   :    </span>
                                <input
                                    type="text"
                                    placeholder="Packing Operator's Email"
                                    className='textinput1'
                                    id="email"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>
                            <div className='container7'>
                                <span className='text3'>EPF NO: </span>
                                <input
                                    type="text"
                                    placeholder="Packing Operator's EPF Number"
                                    className='textinput2'
                                    id="epf"
                                    onChange={(e) => {
                                        setEpf(e.target.value);
                                    }}
                                />
                            </div>
                            <br></br>
                            <button className='savebutton'>SAVE</button>
                        </form>
                        <a href='/dashboard' className='dashboard'>GO BACK TO DASHBOARD</a>
                    </div>
                </div>
            </div>
        </div>
    )
}