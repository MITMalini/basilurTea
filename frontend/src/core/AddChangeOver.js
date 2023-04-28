import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddChangeOver() {
    const [operators, setOperators] = useState([]);
    const [selectedoperator, setSelectedOperator] = useState([]);
    const [packings, setPackings] = useState([]);
    const [selectedpacking, setSelectedPacking] = useState([]);
    const [qcs, setQcs] = useState([]);
    const [selectedqc, setSelectedQc] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [selectedtechnician, setSelectedTechnician] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [selectedsupervisor, setSelectedSupervisor] = useState([]);
    const [selectedshift, setSelectedshift] = useState([]);

  const Shiftoptions = [
    { _id: '1',value: 'Morning shift', label: 'Morning shift' },
    { _id: '2',value: 'Evening shift', label: 'Evening shift' },
  ];
    function sendData(e) {
        e.preventDefault();
        //java script objectw
        const newChangeover = {
            selectedoperator,
            selectedpacking,
            selectedqc,
            selectedtechnician,
            selectedsupervisor,
            selectedshift
        }
        axios.post("http://localhost:8080/api/changeover/addchangeover", newChangeover).then(() => {
            alert("New Changeover Added")
        }).catch((err) => {
            alert(err)

        })
    }
    useEffect(() => {
        fetch('http://localhost:8080/api/operators/getoperators')
            .then(response => response.json())
            .then(data => {
                setOperators(data);
            });
        fetch('http://localhost:8080/api/packing/getpackings')
            .then(response => response.json())
            .then(data => {
                setPackings(data);
            });
        fetch('http://localhost:8080/api/qc/getqcs')
            .then(response => response.json())
            .then(data => {
                setQcs(data);
            });
        fetch('http://localhost:8080/api/technician/gettechnicians')
            .then(response => response.json())
            .then(data => {
                setTechnicians(data);
            });
        fetch('http://localhost:8080/api/supervisor/getsupervisors')
            .then(response => response.json())
            .then(data => {
                setSupervisors(data);
            });
    }, []);
    return (
        <div className='container'>
            <div className='container1'>
                <header className='container2'>
                    <span className='text'>ADD CHANGEOVER</span>
                </header>
                <div className='container31'>
                    <div className='container41'>
                        <form className='form' onSubmit={sendData}>
                            <div className='container5'>
                                <h6 className='text1'>Shift</h6>
                                <Select
                                    className='dropdown'
                                    options={Shiftoptions}
                                    onChange={(selectedOption) => {
                                        const shift = selectedOption.value;
                                        setSelectedshift(shift);
                                        console.log(shift)
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container5'>
                                <h6 className="text1">Operator</h6>
                                <Select
                                    className='dropdown'
                                    options={operators.map(option => ({ value: option._id, label: option.operator_name }))}
                                    onChange={(selectedOption) => {
                                        const opt = operators?.find((x) => x._id === selectedOption.value);
                                        setSelectedOperator(opt);
                                        console.log(opt)
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container5'>
                                <h6 className='text1'>Packing</h6>
                                <Select
                                    className='dropdown'
                                    options={packings.map(option => ({ value: option._id, label: option.packing_name }))}
                                    onChange={(selectedOption) => {
                                        const pckn = packings?.find((x) => x._id === selectedOption.value);
                                        setSelectedPacking(pckn);
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container5'>
                                <h6 className='text1'>Technician</h6>
                                <Select
                                    className='dropdown'
                                    options={technicians.map(option => ({ value: option._id, label: option.technician_name }))}
                                    onChange={(selectedOption) => {
                                        const tech = technicians?.find((x) => x._id === selectedOption.value);
                                        setSelectedTechnician(tech);
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container5'>
                                <h6 className='text1'>QC</h6>
                                <Select
                                    className='dropdown'
                                    options={qcs.map(option => ({ value: option._id, label: option.qc_name }))}
                                    onChange={(selectedOption) => {
                                        const qc = qcs?.find((x) => x._id === selectedOption.value);
                                        setSelectedQc(qc);
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container5'>
                                <h6 className='text1'>In-Charge</h6>
                                <Select
                                    className='dropdown'
                                    options={supervisors.map(option => ({ value: option._id, label: option.supervisor_name }))}
                                    onChange={(selectedOption) => {
                                        const spvs = supervisors?.find((x) => x._id === selectedOption.value);
                                        setSelectedSupervisor(spvs);
                                    }}
                                    placeholder="Select Value"
                                />
                            </div>
                            <div className='container6'>
                                <button className='savebutton'>SAVE</button>
                                <Link to='/'  ><button className='button'>DASHBOARD</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}