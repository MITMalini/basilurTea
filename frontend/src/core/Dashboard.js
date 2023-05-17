import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";
import { useParams } from 'react-router-dom';
import {Link } from "react-router-dom";

const Dashboard = ({ formData }) => {
    const { id, from_login } = useParams();
    const [submittedData, setSubmittedData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/getuser/${id}`)
            .then((res) => {
                setMachinedata(res.data)
            })
            .catch(err => console.log(`get machine data failed ${err}`))

        // Update the state with the received form data
        setSubmittedData(formData);
    }, [formData]);

    return (
        <div className='container'>
            <div className='container1'>
                <div className='container21'>
                    <span className='text'> CHANGEOVER</span>
                </div>
                <div className='container31'>
                    <div className='container41'>
                        <form className='form' >
                            <div className='container5'>
                                <span className='textview'>MACHINE NUMBER  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview1'
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                
                                    <span className='textview'>DATE&nbsp;</span>
                                    <input
                                        type="text"
                                        name="name"
                                        className='textinputviewl'
                                        readOnly
                                    />
                                
                                
                                    <span className='textviewo'>START TIME &nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewr'
                                    readOnly
                                />
                                
                            </div>
                            <div className='container5'>
                               
                                <span className='textview'>SHIFT  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewl'
                                    readOnly
                                />
                                
                                
                                    <span className='textviewo'>CHANGE OVER  </span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputviewr'
                                    readOnly
                                />
                                 
                            </div>
                            <div className='container5'>
                                <span className='textview'>OPERATOR</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>PACKING</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>TECHNICIAN</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>QC</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    readOnly
                                />
                            </div>
                            <div className='container5'>
                                <span className='textview'>IN-CHARGE</span>
                                <input
                                    type="text"
                                    name="name"
                                    className='textinputview0'
                                    readOnly
                                />
                            </div>
                            <div className="buttondiv">
                                <Link to="/home/:id/addchangeover" className='buttonl'>NEW CHANGE OVER</Link>
                                <Link className='buttonm'>END CHANGE OVER</Link>
                                <Link to="/home/:id/:from_login" className='buttonr'>HOME</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Dashboard;