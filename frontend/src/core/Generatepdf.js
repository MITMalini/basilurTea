import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useParams } from "react-router-dom";

export default function GeneratePDF() {
  const [changeovers, setChangeovers] = useState([]);
  const [changeovers1, setChangeovers1] = useState([]);
  const [machinenumber, setSelectedMachine] = useState("");
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    function getChangeovers() {
      axios
        .get("http://localhost:8080/api/changeover/getchangeovers")
        .then((res) => {
          const nofilter = res.data;
          setChangeovers(nofilter.reverse());
          const filteredChangeovers = nofilter.filter((changeover) => {
            return changeover.date >= startDate && changeover.date <= endDate;
          });
          setChangeovers1(filteredChangeovers.reverse());
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getChangeovers();
  }, [machinenumber, startDate, endDate]);

  const generatePdf = () => {
    if (changeovers.length === 0) {
      alert("No data available");
      return;
    }
    const doc = new jsPDF({ orientation: "landscape" });
    const columnStyles = {
      Changeoverdate: { cellWidth: 25 },
      ChangeoverMachine: { cellWidth: 25 },
      Changeovershift: { cellWidth: 25 },
      ChangeoverNumber: { cellWidth: 25 },
      Changeoveroperator: { cellWidth: 25 },
      Changeoverpacking: { cellWidth: 25 },
      Changeoverqc: { cellWidth: 25 },
      Changeovertechnician: { cellWidth: 25 },
      Changeoversupervisor: { cellWidth: 25 },
      ChangeoverstartedAt: { cellWidth: 25 },
      ChangeoverendedAt: { cellWidth: 25 },
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

    doc.save("Full Changeovers Details.pdf");
  };

  const generateFilteredPdf = () => {
    if (changeovers1.length === 0) {
      alert("No data available");
      return;
    }
    const doc = new jsPDF({ orientation: "landscape" });
    const columnStyles = {
      Changeoverdate: { cellWidth: 25 },
      ChangeoverMachine: { cellWidth: 25 },
      Changeovershift: { cellWidth: 25 },
      ChangeoverNumber: { cellWidth: 25 },
      Changeoveroperator: { cellWidth: 25 },
      Changeoverpacking: { cellWidth: 25 },
      Changeoverqc: { cellWidth: 25 },
      Changeovertechnician: { cellWidth: 25 },
      Changeoversupervisor: { cellWidth: 25 },
      ChangeoverstartedAt: { cellWidth: 25 },
      ChangeoverendedAt: { cellWidth: 25 },
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
      body: filtereddata.map((changeover) => {
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

    doc.save("Full Changeovers Details.pdf");
  };
  return (
    <div className="container">
      <div className="container1">
        <div className="container2">
          <span className="text"> GENERATE REPORTS</span>
        </div>
        <div className="container31">
          <div className="container41">
            <div className="container52">
              <button onClick={generatePdf} className="divbutton">
                EXPORT ALL DATA
              </button>
            </div>
            <div className="container53">
              <form>
                <label> From </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <label> To </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </form>
            </div>
            <div className="container52">
              <button onClick={generateFilteredPdf} className="divbutton">
                GENERATE REPORT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
