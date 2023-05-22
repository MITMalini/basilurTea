import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";
import {useLocation, useNavigate, useParams  } from 'react-router-dom';
import {Link } from "react-router-dom";

const Dashboard = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    function sendData(e) {
        e.preventDefault();
        
        try{

            const currentTime = new Date();
        const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        
             axios.patch(`http://localhost:8080/api/changeover/updatechangeover/${location.state.changeoverid}`,{
            endedAt: formattedTime
            
            
          });
        }catch(err){
            console.error(err)
        }
        alert("Changeover Ended") 
        navigate(`/home/${id}/addchangeover`)    
        
    }
    return (
        <div className='container'>
            <div className='container1'>
                <div className='container21'>
                    <span className='text'> CHANGEOVER</span>
                </div>
                <div className='container31'>
                    <div className='container41'>
                        <form className='form' onSubmit={sendData}>
                            <div className='container5'>
                                <span className='textview'>MACHINE NUMBER  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview1'
                                    defaultValue={location.state.selectedMachine}
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                
                                    <span className='textview'>DATE&nbsp;</span>
                                    <input
                                        type="text"
                                        name="name"
                                        className='textinputviewl'
                                        defaultValue={location.state.date}
                                        readOnly
                                    />
                                
                                
                                    <span className='textviewo'>START TIME &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewr'
                                    defaultValue={location.state.starttime}
                                    readOnly
                                />
                                
                            </div>
                            <div className='container5'>
                               
                                <span className='textview'>SHIFT  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewl'
                                    defaultValue={location.state.selectedshift}
                                    readOnly
                                />
                                
                                
                                    <span className='textviewo'>CHANGE OVER  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewr'
                                    defaultValue={location.state.changeoverNumber}
                                    readOnly
                                />
                                 
                            </div>
                            <div className='container5'>
                                <span className='textview'>OPERATOR</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    defaultValue={location.state.selectedoperator.operator_name}
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>PACKING</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    defaultValue={location.state.selectedpacking.packing_name}
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>TECHNICIAN</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    defaultValue={location.state.selectedtechnician.technician_name}
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>QC</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    defaultValue={location.state.selectedqc.qc_name}
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>IN-CHARGE</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    defaultValue={location.state.selectedsupervisor.supervisor_name}
                                    readOnly
                                />
                            </div>
                            <div className="buttondiv1">
                                <a type="submit" className='buttonm'><button className='buttonmm'>END CHANGE OVER</button></a>
                                
                            </div>
                        </form>
                        <a href='./true' > Go back to Home</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;