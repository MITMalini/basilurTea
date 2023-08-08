import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import Select from "react-select";

export default function GeneratePDF() {
  const [changeovers, setChangeovers] = useState([]);
  const [changeoverdaterange, setChangeoverdaterange] = useState([]);
  const [changeoversOneDay, setChangeoversOneDay] = useState([]);
  const [changeoversMRN, setChangeoversMRN] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [wantedDate, setWantedDate] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
  const [breakdowns, setBreakdowns] = useState([]);
  const [allbreakdowns, setAllBreakdowns] = useState([]);
  const [breakdownsMRN, setBreakdownsMRN] = useState([]);
  const [allMrns, SetMRNs] = useState([]);
  const [selectedMrns, SetSelectedMRNs] = useState([]);

  const [daterangebreakdowns, setDateRangeBreakdowns] = useState([]);
  // const [selectedPositionId, setSelectedPositionID] = useState(false);
  // const [selectedPositionName, setSelectedPositionName] = useState(false);
  // const [operators, setOperators] = useState([]);
  // const [packings, setPackings] = useState([]);
  // const [qcs, setQcs] = useState([]);
  // const [technicians, setTechnicians] = useState([]);
  // const [supervisors, setSupervisors] = useState([]);
  // const [selectedName, setSelectedName] = useState([]);

  // const Positionoptions = [
  //   { _id: "1", value: "selectedoperator", label: "Operator" },
  //   { _id: "2", value: "selectedpacking", label: "Packing" },
  //   { _id: "3", value: "selectedqc", label: "QC" },
  //   { _id: "4", value: "selectedtechnician", label: "Technician" },
  //   { _id: "5", value: "selectedsupervisor", label: "Supervisor" },
  // ];
  useEffect(() => {
    function getChangeovers() {
      axios
        .get("http://localhost:8080/api/changeover/getchangeovers")
        .then((res) => {
          const nofilter = res.data;
          SetMRNs(nofilter);
          setChangeovers(nofilter.reverse());

          const filteredChangeovers = nofilter.filter((changeover) => {
            return changeover.date >= startDate && changeover.date <= endDate;
          });
          setChangeoverdaterange(filteredChangeovers.reverse());

          const filteredChangeoversMRN = nofilter.filter((changeover) => {
            return changeover.mrnnumber === selectedMrns;
          });
          console.log(filteredChangeoversMRN);
          setChangeoversMRN(filteredChangeoversMRN);

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
          const nofilterbreakdown = res.data;
          setAllBreakdowns(nofilterbreakdown);

          const filtereddaterangeBreakdowns = nofilterbreakdown.filter(
            (breakdown) => {
              return breakdown.date >= startDate && breakdown.date <= endDate;
            }
          );

          const filteredBreakdownMRN = nofilterbreakdown.filter((breakdown) => {
            return breakdown.mrnnumber === selectedMrns;
          });
          setBreakdownsMRN(filteredBreakdownMRN);
          console.log(breakdownsMRN);
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
    }
    getChangeovers();
    // fetch("http://localhost:8080/api/operators/getoperators")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setOperators(data);
    //   });
    // fetch("http://localhost:8080/api/packing/getpackings")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setPackings(data);
    //   });
    // fetch("http://localhost:8080/api/qc/getqcs")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setQcs(data);
    //   });
    // fetch("http://localhost:8080/api/technician/gettechnicians")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTechnicians(data);
    //   });
    // fetch("http://localhost:8080/api/supervisor/getsupervisors")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setSupervisors(data);
    //   });
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
  const generatefilteredExcel = () => {
    if (changeovers.length === 0) {
      alert("No data available");
      return;
    }

    const data = changeoverdaterange.map((changeover) => ({
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

    const Otherdata = daterangebreakdowns.map((breakdown) => ({
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

    XLSX.writeFile(
      workbook,
      "Changeovers Details from " + startDate + " to " + endDate + ".xlsx"
    );
  };
  const generateFilteredPdf = () => {
    if (!dataFetched || changeoverdaterange.length === 0) {
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
      body: changeoverdaterange.map((changeover) => {
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
    if (!dataFetched || changeoversOneDay.length === 0) {
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
    XLSX.utils.book_append_sheet(workbook, worksheet2, "breakdowns");

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
          starttime: breakdown.starttime,
          endtime: breakdown.endtime,
          Description: breakdown.Description,
        };
      }),
      columnStylesbd,
    });
    doc.save("Changeovers Details on " + wantedDate + ".pdf");
  };
  const generateMRNfilteredExcel = () => {
    if (!dataFetched || changeoversMRN.length === 0) {
      alert("No data available");
      return;
    }

    const data = changeoversMRN.map((changeover) => ({
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

    const Otherdata = breakdownsMRN.map((breakdown) => ({
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
  const generateMRNFilteredPdf = () => {
    if (!dataFetched || changeoversMRN.length === 0) {
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
      body: changeoversMRN.map((changeover) => {
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
      body: breakdownsMRN.map((breakdown) => {
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
                onClick={generateFilteredPdf}
                className="generate-buttonpdf"
              >
                GENERATE PDF
              </button>
              <button
                onClick={generatefilteredExcel}
                className="generate-buttonexcel"
              >
                GENERATE EXCEL
              </button>
            </div>
            <h3>FILTER CHANGEOVERS BY MRN</h3>
            <div className="container53-mrn">
              <form className="container53-mrn2">
                <div className="mrnfilter">
                  <label className="Labelform" htmlFor="startDate">
                    SELECT MRN
                  </label>
                  <Select
                    className="dropdown"
                    options={allMrns.map((option) => ({
                      value: option.mrnnumber,
                      label: option.mrnnumber,
                    }))}
                    onChange={(selectedOption) => {
                      const mrn = allMrns?.find(
                        (x) => x.mrnnumber === selectedOption.value
                      );
                      const selectedMrnNumber = mrn.mrnnumber;
                      SetSelectedMRNs(selectedMrnNumber);
                    }}
                    placeholder="Select Value"
                  />
                  {console.log(selectedMrns)}
                </div>
              </form>
              &nbsp;&nbsp;
              <button
                onClick={generateMRNFilteredPdf}
                className="generate-buttonpdfmrn"
              >
                GENERATE PDF
              </button>
              <button
                onClick={generateMRNfilteredExcel}
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
