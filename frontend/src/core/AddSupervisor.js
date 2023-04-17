import React from 'react'
import "./style.css";

export default function addSupervisor() {
  return (
    <div className='container'>
      <div className='container1'>
        <header className='container2'>
          <span className='text'>ADD SUPERVISOR</span>
        </header>
        <div className='container3'>
          <div className='container4'>
          <div className='container6'>
              <span className='text2'> NAME    : </span>
              <input
                type="text"
                placeholder="Supervisor's Name"
                className='textinput1'
              />
            </div>
            <div className='container7'>
              <span className='text3'> EMAIL   :    </span>
              <input
                type="text"
                placeholder="Supervisor's Email"
                className='textinput2' 
              />
            </div>
            <div className='container5'>
              <span className='text1'>  EPF NO   : </span>
              <input
                type="text"
                placeholder="Supervisor's EPF Number"
                className='textinput'
              />
            </div>
            
            
            <button className='savebutton'>SAVE</button>
          </div>
        </div>
      </div>
    </div>
  )
}