import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./style.css";
import { useParams } from "react-router-dom";

export default function ViewAllChangeovers() {
  const [changeovers, setChangeover] = useState([]);
  const [search, setsearch] = useState("");
  const [machinenumber, setSelectedMachine] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    function getChangeovers() {
      axios
        .get("http://localhost:8080/api/changeover/getchangeovers")
        .then((res) => {
          const filteredChangeovers = res.data.filter(
            (changeovers) => changeovers.selectedMachine === machinenumber
          );
          setChangeover(filteredChangeovers);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    axios
      .get(`http://localhost:8080/api/user/getuser/${id}`)
      .then((res) => {
        const user = res.data.number; // Assuming the machine ID is accessible via machine.machineNumber
        setSelectedMachine(user);
        console.log(setSelectedMachine);
      })
      .catch((err) => {
        alert(err.message);
      });
    getChangeovers();
  }, [id]);

  const generatePdf = () => {
    const doc = new jsPDF({ orientation: "landscape" });
    const columnStyles = {
      Changeoverdate: { columnWidth: 25 },
      ChangeoverMachine: { columnWidth: 25 },
      Changeovershift: { columnWidth: 25 },
      ChangeoverNumber: { columnWidth: 25 },
      Changeoveroperator: { columnWidth: 25 },
      Changeoverpacking: { columnWidth: 25 },
      Changeoverqc: { columnWidth: 25 },
      Changeovertechnician: { columnWidth: 25 },
      Changeoversupervisor: { columnWidth: 25 },
      ChangeoverstartedAt: { columnWidth: 25 },
      ChangeoverendedAt: { columnWidth: 25 },
    };
    autoTable(doc, {
      columns: [
        { header: "Changeover Date", dataKey: "Changeoverdate" },
        { header: "Changeover Machine", dataKey: "ChangeoverMachine" },
        { header: "Changeover Shift", dataKey: "Changeovershift" },
        { header: "Changeover Number", dataKey: "ChangeoverNumber" },
        { header: "Changeover Operator", dataKey: "Changeoveroperator" },
        { header: "Changeover Packing", dataKey: "Changeoverpacking" },
        { header: "Changeover QC", dataKey: "Changeoverqc" },
        { header: "Changeover Technician", dataKey: "Changeovertechnician" },
        { header: "Changeover Supervisor", dataKey: "Changeoversupervisor" },
        { header: "Changeover Started At", dataKey: "ChangeoverstartedAt" },
        { header: "Changeover Ended At", dataKey: "ChangeoverendedAt" },
      ],
      body: changeovers.map((changeover) => {
        return {
          Changeoverdate: changeover.date,
          ChangeoverMachine: changeover.selectedMachine,
          Changeovershift: changeover.selectedshift,
          ChangeoverNumber: changeover.changeoverNumber,
          Changeoveroperator: changeover.selectedoperator
            .map((operator) => operator.operator_name)
            .join(", "),
          Changeoverpacking: changeover.selectedpacking
            .map((packing) => packing.packing_name)
            .join(", "),
          Changeoverqc: changeover.selectedqc
            .map((qc) => qc.qc_name)
            .join(", "),
          Changeovertechnician: changeover.selectedtechnician
            .map((technician) => technician.technician_name)
            .join(", "),
          Changeoversupervisor: changeover.selectedsupervisor
            .map((supervisor) => supervisor.supervisor_name)
            .join(", "),
          ChangeoverstartedAt: changeover.startedAt,
          ChangeoverendedAt: changeover.endedAt,
        };
      }),
      columnStyles,
    });
    doc.save("Changeovers Details.pdf");
  };
  return (
    <div className="container">
      <div className="container1">
        <div className="container2">
          <div className="div3">
            <button onClick={generatePdf} className="divbutton">
              Generate PDF
            </button>
            <a href="./addchangeover" className="div-a">
              <button className="divbutton">Add New Changeover</button>
            </a>
          </div>
        </div>

        <div className="container3table">
          <div className="containertable">
            <table className="tablediv" border={1}>
              <thead className="theaddiv column">
                <tr className="tr">
                  <th className="thdiv">Changeover Date</th>
                  <th className="thdiv">Changeover Machine</th>
                  <th className="thdiv">Changeover Shift</th>
                  <th className="thdiv">Changeover Number</th>
                  <th className="thdiv">Operator</th>
                  <th className="thdiv">Packing</th>
                  <th className="thdiv">QC</th>
                  <th className="thdiv">Technician</th>
                  <th className="thdiv">Supervisor</th>
                  <th className="thdiv">Changeover Started At</th>
                  <th className="thdiv">Changeover Ended At</th>
                </tr>
              </thead>
              <tbody>
                {changeovers
                  .filter((changeovers) => {
                    if (search === "") {
                      return changeovers;
                    } else if (
                      changeovers.changeoverNumber
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      {
                        console.log(changeovers);
                      }
                      return changeovers;
                    }
                  })
                  .map((changeovers, index) => {
                    return (
                      <tr className="rows" key={index}>
                        <th scope="row" className="row">
                          {changeovers.date}
                        </th>
                        <td scope="row" className="row">
                          {changeovers.selectedMachine}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedshift}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.changeoverNumber}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedoperator
                            .map((operator) => operator.operator_name)
                            .join(", ")}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedpacking
                            .map((packing) => packing.packing_name)
                            .join(", ")}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedqc
                            .map((qc) => qc.qc_name)
                            .join(", ")}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedtechnician
                            .map((technician) => technician.technician_name)
                            .join(", ")}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.selectedsupervisor
                            .map((supervisor) => supervisor.supervisor_name)
                            .join(", ")}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.startedAt}
                        </td>
                        <td scope="row" className="row">
                          {changeovers.endedAt}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
