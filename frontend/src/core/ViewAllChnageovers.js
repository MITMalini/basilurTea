import React, { useState, useEffect } from "react";
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './styleviewall.css';
// import { useParams } from "react-router-dom";

export default function ViewAllChangeovers() {
    const [changeovers, setChangeover] = useState([]);
    const [search, setsearch] = useState('');

    useEffect(() => {
        function getChangeovers() {
            axios.get("http://localhost:8080/api/changeover/getchangeovers").then((res) => {
                setChangeover(res.data);
                console.log(changeovers);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getChangeovers();
    }, []);


    const generatePdf = () => {
        const doc = new jsPDF({orientation: 'landscape'} )
        const columnStyles = {
            Changeoverdate: { columnWidth: 40 }, 
            ChangeoverMachine: { columnWidth: 70 }, 
            Changeovershift:{ columnWidth: 40 },
            ChangeoverNumber: { columnWidth: 40 }, 
            Changeoveroperator: { columnWidth: 40 }, 
            Changeoverpacking:{ columnWidth: 40 },
            Changeoverqc:{ columnWidth: 40 },
            Changeovertechnician: { columnWidth: 40 }, 
            Changeoversupervisor:{ columnWidth: 40 },
            ChangeoverstartedAt:{ columnWidth: 40 },
            ChangeoverendedAt:{ columnWidth: 40 },
          };
        autoTable(doc, {
            columns: [
                { header: 'Changeover Date', dataKey: 'Changeoverdate' },
                { header: 'Changeover Machine', dataKey: 'ChangeoverMachine' },
                { header: 'Changeover Date', dataKey: 'date' },
                { header: 'Changeover Machine', dataKey: 'selectedMachine' },
                { header: 'Changeover Shift', dataKey: 'Changeovershift' },
                { header: 'Changeover Number', dataKey: 'ChangeoverNumber' },
                { header: 'Changeover Operator', dataKey: 'Changeoveroperator' },
                { header: 'Changeover Packing', dataKey: 'Changeoverpacking' },
                { header: 'Changeover QC', dataKey: 'Changeoverqc' },
                { header: 'Changeover Technician', dataKey: 'Changeovertechnician' },
                { header: 'Changeover Supervisor', dataKey: 'Changeoversupervisor' },
                { header: 'Changeover Started At', dataKey: 'ChangeoverstartedAt' },
                { header: 'Changeover Ended At', dataKey: 'ChangeoverendedAt' },
            ],
            body: changeovers.map(changeover => {
                return {
                    
                    Changeovershift: changeover.selectedshift,
                    ChangeoverNumber: changeover.changeoverNumber,
                    Changeoveroperator: changeover.selectedoperator.operator_name,
                    Changeoverpacking: changeover.selectedpacking.packing_name,
                    Changeoverqc:changeover.selectedqc.qc_name,
                    Changeovertechnician:changeover.selectedtechnician.technician_name,
                    Changeoversupervisor:changeover.selectedsupervisor.supervisor_name,
                    ChangeoverstartedAt:changeover.startedAt,
                    ChangeoverendedAt:changeover.endedAt        };
            }),
            columnStyles,
        })
        doc.save('Changeovers Details.pdf')
    }
    return (
        <section className='div1'>
            <div className='div2'>
                <div className="div3">
                    <button
                        onClick={generatePdf}
                        className="divbutton">
                        Generate PDF
                    </button>
                    <a href='./addchangeover' className="div-a"><button className="divbutton" >Add New Changeover</button></a>
                    <a href='./allapllication' className="div-a"><button className="divbutton" >View Applications</button></a>
                </div>

                <table className="div4" border={1}>
                    <thead className="div5 column">
                        <tr>
                            <th scope="col" className="div6">
                            Changeover Date
                            </th>
                            <th scope="col" className="div6">
                            Changeover Machine
                            </th>
                            <th scope="col" className="div6">
                            Changeover Shift
                            </th>
                            <th scope="col" className="div6">
                            Changeover Number
                            </th>
                            <th scope="col" className="div6">
                            Changeover Operator
                            </th>
                            <th scope="col" className="div6">
                            Changeover Packing
                            </th>
                            <th scope="col" className="div6">
                            Changeover QC
                            </th>
                            <th scope="col" className="div6">
                            Changeover Technician
                            </th>
                            <th scope="col" className="div6">
                            Changeover Supervisor
                            </th>
                            <th scope="col" className="div6">
                            Changeover Started At
                            </th>
                            <th scope="col" className="div6">
                            Changeover Ended At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {changeovers.filter((changeovers) => {
                            if (search === "") {
                                
                                return changeovers;
                            }
                            else if (changeovers.changeoverNumber.toLowerCase().includes(search.toLowerCase())) {
                               {console.log(changeovers)}
                                return changeovers;
                            }

                        }).map((changeovers, index) => {
                            return (
                                <tr className="div7" key={index}>
                                    <th scope="row" className="div8">
                                        {changeovers.date}
                                    </th  >
                                    <td scope="row" className="div7">
                                        {changeovers.selectedMachine}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedshift}
                                    </td>
                                    <td >
                                        {changeovers.changeoverNumber}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedoperator.operator_name}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedpacking.packing_name} 
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedqc.qc_name}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedtechnician.technician_name}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.selectedsupervisor.supervisor_name}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.startedAt}
                                    </td>
                                    <td scope="row" className="div7">
                                        {changeovers.endedAt} 
                                    </td>
                                    <td className="div7 text-right">
                                    {changeovers && <a className="diva" href={`/deletechangeover/${changeovers._id}/false`} >
                                        <button className="div10"> Delete</button>
                                    </a>}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </section >
    );
};