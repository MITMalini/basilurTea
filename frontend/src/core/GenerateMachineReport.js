import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function GenerateMachineReport() {
  const { id } = useParams();
  const location = useLocation();
  const [changeovers, setChangeovers] = useState([]);
  const [changeoversDateRange, setChangeoverDateRange] = useState([]);
  const [changeoversOneDay, setChangeoversOneDay] = useState([]);
  const [breakdowns, setBreakdowns] = useState([]);
  const [allbreakdowns, setAllBreakdowns] = useState([]);
  const [daterangebreakdowns, setDateRangeBreakdowns] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [wantedDate, setWantedDate] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [mrnchangeovers, setMRNChangeOver] = useState([]);
  const [mrnbreakdowns, setMRNBreakdowns] = useState([]);

  useEffect(() => {
    function getChangeovers() {
      axios.get(`http://localhost:8080/api/user/getuser/${id}`).then((res) => {
        const user = res.data.number;
        console.log(user);
        axios
          .get("http://localhost:8080/api/changeover/getchangeovers")
          .then((res) => {
            const allChangeovers = res.data;
            const nofilter = allChangeovers.filter((changeover) => {
              return changeover.selectedMachine === user;
            });
            {
              console.log(nofilter);
            }
            setChangeovers(nofilter.reverse());
            const filteredChangeovers = nofilter.filter((changeover) => {
              return changeover.date >= startDate && changeover.date <= endDate;
            });
            setChangeoverDateRange(filteredChangeovers.reverse());
            const filteredODChangeovers = nofilter.filter((changeover) => {
              const changeoverDate = changeover.date.split("T")[0];
              return changeoverDate === wantedDate;
            });
            console.log(filteredODChangeovers);
            setChangeoversOneDay(filteredODChangeovers.reverse());
            setDataFetched(true);
          })
          .catch((err) => {
            alert(err.message);
          });
        axios
          .get("http://localhost:8080/api/breakdown/getbreakdowns")
          .then((res) => {
            const allBreakdowns = res.data;
            const nofilterbreakdown = allBreakdowns.filter((breakdown) => {
              return breakdown.machinenumber === user;
            });
            setAllBreakdowns(nofilterbreakdown);
            const filtereddaterangeBreakdowns = nofilterbreakdown.filter(
              (breakdown) => {
                return breakdown.date >= startDate && breakdown.date <= endDate;
              }
            );
            const filteredBreakdowns = nofilterbreakdown.filter((breakdown) => {
              const breakdownDate = breakdown.date.split("T")[0];
              return breakdownDate === wantedDate;
            });
            console.log(filteredBreakdowns);
            setDateRangeBreakdowns(filtereddaterangeBreakdowns.reverse());
            setBreakdowns(filteredBreakdowns.reverse());
            setDataFetched(true);
          })
          .catch((err) => {
            alert(err.message);
          });
      });
    }
    getChangeovers();
  }, [startDate, endDate, wantedDate]);

  const generateExcel = () => {
    if (changeovers.length === 0) {
      alert("No data available");
      return;
    }

    const data = changeovers.map((changeover) => ({
      Changeoverdate: changeover.date.split("T")[0],
      ChangeoverMachine: changeover.selectedMachine,
      Changeovershift: changeover.selectedshift,
      ChangeoverNumber: changeover.changeoverNumber,
      Changeoveroperator: changeover.selectedoperator
        .map((operator) => operator.operator_name)
        .join(", "),
      Changeoverpacking: changeover.selectedpacking
        .map((packing) => packing.packing_name)
        .join(", "),
      Changeoverqc: changeover.selectedqc.map((qc) => qc.qc_name).join(", "),
      Changeovertechnician: changeover.selectedtechnician
        .map((technician) => technician.technician_name)
        .join(", "),
      Changeoversupervisor: changeover.selectedsupervisor
        .map((supervisor) => supervisor.supervisor_name)
        .join(", "),
      ChangeoverstartedAt: changeover.startedAt,
      ChangeoverendedAt: changeover.endedAt,
    }));

    const worksheet1 = XLSX.utils.json_to_sheet(data);

    const Otherdata = allbreakdowns.map((breakdown) => ({
      Breakdowndate: breakdown.date.split("T")[0],
      BreakdownMachine: breakdown.machinenumber,
      Breakdownshift: breakdown.shift,
      BreakdownMRN: breakdown.mrnnumber,
      BreakdownChangeoverNumber: breakdown.changeoverNumber,
      BreakdownDescription: breakdown.Description,
      BreakdownstartedAt: breakdown.starttime,
      BreakdownendedAt: breakdown.endtime,
    }));

    const worksheet2 = XLSX.utils.json_to_sheet(Otherdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Changeovers");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "breakdowns");

    XLSX.writeFile(workbook, "Changeovers_Details.xlsx");
  };

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
          Changeoverdate: changeover.date.split("T")[0],
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
    doc.addPage();
    const columnStylesbd = {
      machinenumber: { cellWidth: 20 },
      date: { cellWidth: 25 },
      shift: { cellWidth: 25 },
      changeoverNumber: { cellWidth: 25 },
      starttime: { cellWidth: 25 },
      endtime: { cellWidth: 25 },
      Description: { cellWidth: 40 },
    };
    autoTable(doc, {
      columns: [
        { header: "machine number", dataKey: "machinenumber" },
        { header: "date", dataKey: "date" },
        { header: "Shift", dataKey: "shift" },
        { header: "Changeover Number", dataKey: "changeoverNumber" },
        { header: "start time", dataKey: "starttime" },
        { header: "end time", dataKey: "endtime" },
        { header: "Description", dataKey: "Description" },
      ],
      body: allbreakdowns.map((breakdown) => {
        return {
          machinenumber: breakdown.machinenumber,
          date: breakdown.date.split("T")[0],
          Changeovershift: breakdown.selectedshift,
          shift: breakdown.shift,
          changeoverNumber: breakdown.changeoverNumber,
          Description: breakdown.Description,
          starttime: breakdown.starttime,
          endtime: breakdown.endtime,
        };
      }),
      columnStylesbd,
    });

    doc.save("Changeovers Details.pdf");
  };

  const generateDateRangeExcel = () => {
    if (changeoversDateRange.length === 0) {
      alert("No data available");
      return;
    }

    const data = changeoversDateRange.map((changeover) => ({
      Changeoverdate: changeover.date.split("T")[0],
      ChangeoverMachine: changeover.selectedMachine,
      Changeovershift: changeover.selectedshift,
      ChangeoverNumber: changeover.changeoverNumber,
      Changeoveroperator: changeover.selectedoperator
        .map((operator) => operator.operator_name)
        .join(", "),
      Changeoverpacking: changeover.selectedpacking
        .map((packing) => packing.packing_name)
        .join(", "),
      Changeoverqc: changeover.selectedqc.map((qc) => qc.qc_name).join(", "),
      Changeovertechnician: changeover.selectedtechnician
        .map((technician) => technician.technician_name)
        .join(", "),
      Changeoversupervisor: changeover.selectedsupervisor
        .map((supervisor) => supervisor.supervisor_name)
        .join(", "),
      ChangeoverstartedAt: changeover.startedAt,
      ChangeoverendedAt: changeover.endedAt,
    }));

    const worksheet1 = XLSX.utils.json_to_sheet(data);
    const otherdata = daterangebreakdowns.map((breakdown) => ({
      Breakdowndate: breakdown.date.split("T")[0],
      BreakdownMachine: breakdown.machinenumber,
      Breakdownshift: breakdown.shift,
      BreakdownMRN: breakdown.mrnnumber,
      BreakdownChangeoverNumber: breakdown.changeoverNumber,
      BreakdownDescription: breakdown.Description,
      BreakdownstartedAt: breakdown.starttime,
      BreakdownendedAt: breakdown.endtime,
    }));

    const worksheet2 = XLSX.utils.json_to_sheet(otherdata);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Changeovers");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "BreakDowns");

    XLSX.writeFile(
      workbook,
      "Changeovers Details from " + startDate + " to " + endDate + ".xlsx"
    );
  };
  const generateDateRangePdf = () => {
    if (!dataFetched || changeoversDateRange.length === 0) {
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
      body: changeoversDateRange.map((changeover) => {
        return {
          Changeoverdate: changeover.date.split("T")[0],
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
    doc.addPage();
    const columnStylesbd = {
      machinenumber: { cellWidth: 20 },
      date: { cellWidth: 25 },
      shift: { cellWidth: 25 },
      changeoverNumber: { cellWidth: 25 },
      starttime: { cellWidth: 25 },
      endtime: { cellWidth: 25 },
      Description: { cellWidth: 40 },
    };
    autoTable(doc, {
      columns: [
        { header: "machine number", dataKey: "machinenumber" },
        { header: "date", dataKey: "date" },
        { header: "Shift", dataKey: "shift" },
        { header: "Changeover Number", dataKey: "changeoverNumber" },
        { header: "start time", dataKey: "starttime" },
        { header: "end time", dataKey: "endtime" },
        { header: "Description", dataKey: "Description" },
      ],
      body: daterangebreakdowns.map((breakdown) => {
        return {
          machinenumber: breakdown.machinenumber,
          date: breakdown.date.split("T")[0],
          Changeovershift: breakdown.selectedshift,
          shift: breakdown.shift,
          changeoverNumber: breakdown.changeoverNumber,
          Description: breakdown.Description,
          starttime: breakdown.starttime,
          endtime: breakdown.endtime,
        };
      }),
      columnStylesbd,
    });

    doc.save(
      "Changeovers Details from " + startDate + " to " + endDate + ".pdf"
    );
  };
  const generatefilteredDateExcel = () => {
    if (changeoversOneDay.length === 0) {
      alert("No data available");
      return;
    }

    const data = changeoversOneDay.map((changeover) => ({
      Changeoverdate: changeover.date.split("T")[0],
      ChangeoverMachine: changeover.selectedMachine,
      Changeovershift: changeover.selectedshift,
      ChangeoverNumber: changeover.changeoverNumber,
      Changeoveroperator: changeover.selectedoperator
        .map((operator) => operator.operator_name)
        .join(", "),
      Changeoverpacking: changeover.selectedpacking
        .map((packing) => packing.packing_name)
        .join(", "),
      Changeoverqc: changeover.selectedqc.map((qc) => qc.qc_name).join(", "),
      Changeovertechnician: changeover.selectedtechnician
        .map((technician) => technician.technician_name)
        .join(", "),
      Changeoversupervisor: changeover.selectedsupervisor
        .map((supervisor) => supervisor.supervisor_name)
        .join(", "),
      ChangeoverstartedAt: changeover.startedAt,
      ChangeoverendedAt: changeover.endedAt,
    }));

    const worksheet1 = XLSX.utils.json_to_sheet(data);
    const Otherdata = breakdowns.map((breakdown) => ({
      Breakdowndate: breakdown.date.split("T")[0],
      BreakdownMachine: breakdown.machinenumber,
      Breakdownshift: breakdown.shift,
      BreakdownMRN: breakdown.mrnnumber,
      BreakdownChangeoverNumber: breakdown.changeoverNumber,
      BreakdownDescription: breakdown.Description,
      BreakdownstartedAt: breakdown.starttime,
      BreakdownendedAt: breakdown.endtime,
    }));

    const worksheet2 = XLSX.utils.json_to_sheet(Otherdata);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet1, "Changeovers");
    XLSX.utils.book_append_sheet(workbook, worksheet2, "Breakdowns");

    XLSX.writeFile(workbook, "Changeovers Details on " + wantedDate + ".xlsx");
  };
  const generateFilteredDatePdf = () => {
    if (!dataFetched || changeoversOneDay.length === 0) {
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
      body: changeoversOneDay.map((changeover) => {
        return {
          Changeoverdate: changeover.date.split("T")[0],
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
    doc.addPage();
    const columnStylesbd = {
      machinenumber: { cellWidth: 20 },
      date: { cellWidth: 25 },
      shift: { cellWidth: 25 },
      changeoverNumber: { cellWidth: 25 },
      starttime: { cellWidth: 25 },
      endtime: { cellWidth: 25 },
      Description: { cellWidth: 40 },
    };
    autoTable(doc, {
      columns: [
        { header: "machine number", dataKey: "machinenumber" },
        { header: "date", dataKey: "date" },
        { header: "Shift", dataKey: "shift" },
        { header: "Changeover Number", dataKey: "changeoverNumber" },
        { header: "start time", dataKey: "starttime" },
        { header: "end time", dataKey: "endtime" },
        { header: "Description", dataKey: "Description" },
      ],
      body: breakdowns.map((breakdown) => {
        return {
          machinenumber: breakdown.machinenumber,
          date: breakdown.date.split("T")[0],
          Changeovershift: breakdown.selectedshift,
          shift: breakdown.shift,
          changeoverNumber: breakdown.changeoverNumber,
          Description: breakdown.Description,
          starttime: breakdown.starttime,
          endtime: breakdown.endtime,
        };
      }),
      columnStylesbd,
    });
    doc.save("Changeovers Details on " + wantedDate + ".pdf");
  };

  return (
    <div className="container">
      <div className="container1">
        <div className="container21">
          <span className="text"> GENERATE REPORTS</span>
        </div>
        <div className="container31">
          <div className="container42">
            <h3>EXPORT ALL DATA</h3>
            <div className="container53">
              <button onClick={generatePdf} className="generate-buttonpdf">
                EXPORT ALL DATA
              </button>
              <button onClick={generateExcel} className="generate-buttonexcel">
                GENERATE EXCEL
              </button>
            </div>
            <h3>FILTER CHANGEOVERS BY DATE</h3>
            <div className="container53">
              <form>
                <label className="Labelform" htmlFor="startDate">
                  SELECT DATE
                </label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input
                  type="date"
                  className="form-control"
                  value={wantedDate}
                  onChange={(e) => setWantedDate(e.target.value)}
                />
                {console.log(wantedDate)}
              </form>
              &nbsp;&nbsp;
              <button
                onClick={generateFilteredDatePdf}
                className="generate-buttonpdf"
              >
                GENERATE PDF
              </button>
              <button
                onClick={generatefilteredDateExcel}
                className="generate-buttonexcel"
              >
                GENERATE EXCEL
              </button>
            </div>
            <h3>FILTER CHANGEOVERS BY DATE RANGE</h3>
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
              <button
                onClick={generateDateRangePdf}
                className="generate-buttonpdf"
              >
                GENERATE PDF
              </button>
              <button
                onClick={generateDateRangeExcel}
                className="generate-buttonexcel"
              >
                GENERATE EXCEL
              </button>
            </div>

            {/* <h3>FILTER DATA BY POSITION</h3>
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
                className="generate-buttonpdf"
              >
                GENERATE PDF
              </button>
              <button
                onClick={generateNameFilteredPdf}
                className="generate-buttonexcel"
              >
                GENERATE EXCEL
              </button>
            </div> */}
            <a href="./true"> Go back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
