import React from 'react'
import "./addsupervisor.css";

export default function AddError() {
  return (
    <div className='scontainer'>
      <div className='scontainer1'>
        <header className='scontainer2'>
          <span className='text'>ADD SUPERVISOR</span>
        </header>
        <div className='scontainer3'>
          <div className='scontainer4'>
          <div className='scontainer6'>
              <span className='text2'> NAME    : </span>
              <input
                type="text"
                placeholder="Supervisor's Name"
                className='textinput1'
              />
            </div>
            <div className='scontainer7'>
              <span className='text3'> EMAIL   :    </span>
              <input
                type="text"
                placeholder="Supervisor's Email"
                className='textinput2' 
              />
            </div>
            <div className='scontainer5'>
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