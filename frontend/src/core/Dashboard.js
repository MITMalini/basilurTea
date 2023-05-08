import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./style.css";
import {Link } from "react-router-dom";

export default function Dashboard() {
    // const [changeover, setChangeover] = useState()
    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/changeover/getchangeover/${_id}`)
    //         .then((result) => {
    //             setChangeover(result["data"])
    //         })
    //         .catch(err => console.log(`get changeover data failed ${err}`))

    // }, [_id])

    return (
        <div className='container'>
            <div className='container1'>
                <div className='container2'>
                    <span className='text'> CHANGEOVER</span>
                </div>
                <div className='container3'>
                    <div className='container4'>
                        <form className='form' >
                            <div className='container5'>
                                <span className='text1'>NAME  </span>
                                
                            </div>
                            <div className='container5'>
                                <span className='text2'>EMAIL  </span>
                                
                            </div>
                            <div className='container5'>
                                <span className='text3'>EPF NO</span>
                                
                            </div>
                            {/* <div className='container6'>
                                <button className='savebutton'>SAVE</button>
                                <Link to='/'  ><button className='button'>DASHBOARD</button></Link>
                            </div> */}
                        </form>
                    </div>
                </div>
                </div>
        </div>
    );
};