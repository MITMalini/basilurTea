import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Select from "react-select";

export default function GeneratePDF() {
  const [changeovers, setChangeovers] = useState([]);
  const [changeovers1, setChangeovers1] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedPositionId, setSelectedPositionID] = useState(false);
  const [selectedPositionName, setSelectedPositionName] = useState(false);
  const [operators, setOperators] = useState([]);
  const [packings, setPackings] = useState([]);
  const [qcs, setQcs] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [selectedName, setSelectedName] = useState([]);

  const Positionoptions = [
    { _id: "1", value: "selectedoperator", label: "Operator" },
    { _id: "2", value: "selectedpacking", label: "Packing" },
    { _id: "3", value: "selectedqc", label: "QC" },
    { _id: "4", value: "selectedtechnician", label: "Technician" },
    { _id: "5", value: "selectedsupervisor", label: "Supervisor" },
  ];
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
          setDataFetched(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getChangeovers();
    fetch("http://localhost:8080/api/operators/getoperators")
      .then((response) => response.json())
      .then((data) => {
        setOperators(data);
      });
    fetch("http://localhost:8080/api/packing/getpackings")
      .then((response) => response.json())
      .then((data) => {
        setPackings(data);
      });
    fetch("http://localhost:8080/api/qc/getqcs")
      .then((response) => response.json())
      .then((data) => {
        setQcs(data);
      });
    fetch("http://localhost:8080/api/technician/gettechnicians")
      .then((response) => response.json())
      .then((data) => {
        setTechnicians(data);
      });
    fetch("http://localhost:8080/api/supervisor/getsupervisors")
      .then((response) => response.json())
      .then((data) => {
        setSupervisors(data);
      });
  }, [startDate, endDate]);

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

    doc.save("Changeovers Details.pdf");
  };

  const generateFilteredPdf = () => {
    if (!dataFetched || changeovers1.length === 0) {
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
      body: changeovers1.map((changeover) => {
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

    doc.save(
      "Changeovers Details from " + startDate + " to " + endDate + ".pdf"
    );
  };
  const generateNameFilteredPdf = () => {
    if (!dataFetched || changeovers1.length === 0) {
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
      body: changeovers1.map((changeover) => {
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

    doc.save(
      "Changeovers Details from " + startDate + " to " + endDate + ".pdf"
    );
  };
  return (
    <div className="container">
      <div className="container1">
        <div className="container2">
          <span className="text"> GENERATE REPORTS</span>
        </div>
        <div className="container31">
          <div className="container42">
            <h3>EXPORT ALL DATA</h3>
            <div className="container53">
              <button onClick={generatePdf} className="generate-button">
                EXPORT ALL DATA
              </button>
            </div>
            <h3>FILTER DATA BY DATE</h3>
            <div className="container53">
              <form>
                <label className="Labelform" htmlFor="startDate">
                  FROM
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <label className="Labelform"> TO </label>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  className="form-control"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </form>
              &nbsp;&nbsp;
              <button onClick={generateFilteredPdf} className="generate-button">
                GENERATE REPORT
              </button>
            </div>
            <h3>FILTER DATA BY POSITION</h3>
            <div className="container53">
              <form>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label className="Labelform" htmlFor="startDate">
                      POSITION
                    </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Select
                      className="dropdownpdf"
                      options={Positionoptions}
                      menuPlacement="top"
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          const positionID = selectedOption._id;
                          setSelectedPositionID(positionID);
                          const positionName = selectedOption.value;
                          setSelectedPositionName(positionName);
                        }
                      }}
                      placeholder="Select Position"
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <label className="Labelform"> NAME </label>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Select
                      className="dropdownpdf"
                      placeholder="Select Name"
                      menuPlacement="top"
                      options={
                        selectedPositionId === "1"
                          ? operators.map((e, i) => ({
                              value: e.operator_name,
                              label: e.operator_name,
                            }))
                          : selectedPositionId === "2"
                          ? packings.map((e, i) => ({
                              value: e.packing_name,
                              label: e.packing_name,
                            }))
                          : selectedPositionId === "3"
                          ? qcs.map((e, i) => ({
                              value: e.qc_name,
                              label: e.qc_name,
                            }))
                          : selectedPositionId === "4"
                          ? technicians.map((e, i) => ({
                              value: e.technician_name,
                              label: e.technician_name,
                            }))
                          : selectedPositionId === "5"
                          ? supervisors.map((e, i) => ({
                              value: e.supervisor_name,
                              label: e.supervisor_name,
                            }))
                          : []
                      }
                      onChange={(selectedOption) => {
                        if (selectedOption) {
                          const name = selectedOption.value;
                          setSelectedName(name);
                          console.log(name);
                        } else {
                          // Handle the case when no option is selected
                        }
                      }}
                    />
                  </div>
                </div>
              </form>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button
                onClick={generateNameFilteredPdf}
                className="generate-button"
              >
                GENERATE REPORT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
