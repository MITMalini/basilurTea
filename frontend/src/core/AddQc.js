import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

export default function AddQc() {
  const [qc_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [epfno, setEpf] = useState("");

  function sendData(e) {
    e.preventDefault();
    //java script objectw
    const newQC = {
      qc_name,
      email,
      epfno
    }
    axios.post("http://localhost:8080/api/qc/addQC", newQC).then(() => {
      alert("New QC Added")
    }).catch((err) => {
      alert(err)

    })
  }
  return (
    <div className='container'>
      <div className='container1'>
        <header className='container2'>
          <span className='text'>ADD QC</span>
        </header>
        <div className='container3'>
          <div className='container4'>
            <form className='form' onSubmit={sendData}>
              <div className='container6'>
                <span className='text2'> NAME &nbsp;   : </span>
                <input
                  type="text"
                  placeholder="QC's Name"
                  className='textinput1'
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className='container7'>
                <span className='text3'> EMAIL  &nbsp; :    </span>
                <input
                  type="text"
                  placeholder="QC's Email"
                  className='textinput2'
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className='container5'>
                <span className='text1'>  EPF NO   : </span>
                <input
                  type="text"
                  placeholder="QC's EPF Number"
                  className='textinput'
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
    </div >
  )
}