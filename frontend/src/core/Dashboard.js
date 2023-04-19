import React,{useEffect,useState} from 'react'
import "./dashboard.css";

export default function Dashboard() {
    const [operators, setOperators] = useState([]);
    const [packings, setPackings] = useState([]);
    const [qcs, setQcs] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
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
        // <div className='dcontainer'>
        //     <div className='dcontainer1'>
        //         <span className='dtext'>PRODUCTION DETAILS</span>
        //     </div>
        //     <div className='dcontainer2'>
        //         <div className='dcontainer3'>
        //             <div className='dcontainer5'>

        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div className='bg-black'>
            <h1>Select an option</h1>
            <div>
                <p>Operator</p>
            <select>
                {operators.map(option => (
                    <option key={option._id} value={option.operator_name}>
                        {option.operator_name}
                    </option>
                ))}
            </select>
            </div>
            <div>
                <p>Packing</p>
            <select>
                {packings.map(option => (
                    <option key={option._id} value={option.packing_name}>
                        {option.packing_name}
                    </option>
                ))}
            </select>
            </div>
            
        </div>
    )
}