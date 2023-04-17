import React from 'react'
import "./addtechnician.css";

export default function AddTechnician() {
  return (
    <div className='tcontainer'>
      <div className='tcontainer1'>
        <header className='tcontainer2'>
          <span className='text'>ADD TECHNICIAN</span>
        </header>
        <div className='tcontainer3'>
          <div className='tcontainer4'>
          <div className='tcontainer6'>
              <span className='text2'> NAME    : </span>
              <input
                type="text"
                placeholder="Technician's Name"
                className='textinput1'
              />
            </div>
            <div className='tcontainer7'>
              <span className='text3'> EMAIL   :    </span>
              <input
                type="text"
                placeholder="Technician's Email"
                className='textinput2' 
              />
            </div>
            <div className='tcontainer5'>
              <span className='text1'>  EPF NO   : </span>
              <input
                type="text"
                placeholder="Technician's EPF Number"
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