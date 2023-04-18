import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function AddTechnician() {
  const [technician_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [epfno, setEpf] = useState("");

  function sendData(e) {
    e.preventDefault();
    //java script objectw
    const newTechnician = {
      technician_name,
      email,
      epfno
    }
    axios.post("http://localhost:8080/api/technician/addtechnician",newTechnician).then(() => {
      alert("New Technician Added")
    }).catch((err) => {
      alert(err)

    })
  }
  return (
    <div className='container'>
      <div className='container1'>
        <header className='container2'>
          <span className='text'>ADD TECHNICIAN</span>
        </header>
        <div className='container3'>
          <div className='container4'>
          <form className='form' onSubmit={sendData}>
          <div className='container6'>
              <span className='text2'> NAME    : </span>
              <input
                type="text"
                placeholder="Technician's Name"
                className='textinput1'
                id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
              />
            </div>
            <div className='container7'>
              <span className='text3'> EMAIL   :    </span>
              <input
                type="text"
                placeholder="Technician's Email"
                className='textinput2' 
                id="name"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
              />
            </div>
            <div className='container5'>
              <span className='text1'>  EPF NO   : </span>
              <input
                type="text"
                placeholder="Technician's EPF Number"
                className='textinput'
                id="name"
                  onChange={(e) => {
                    setEpf(e.target.value);
                  }}
              />
            </div>
            <button className='savebutton'>SAVE</button>
            </form>
            <a href='/dashboard' className='dashboard'>GO BACK TO DASHBOARD</a>

          </div>
        </div>
      </div>
    </div>
  )
}