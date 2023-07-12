import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddChangeOver() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [machinedata, setMachinedata] = useState([]);
  const [operators, setOperators] = useState([]);
  const [selectedoperator, setSelectedOperator] = useState();
  const [packings, setPackings] = useState([]);
  const [selectedpacking, setSelectedPacking] = useState();
  const [qcs, setQcs] = useState([]);
  const [selectedqc, setSelectedQc] = useState();
  const [technicians, setTechnicians] = useState([]);
  const [selectedtechnician, setSelectedTechnician] = useState();
  const [supervisors, setSupervisors] = useState([]);
  const [selectedsupervisor, setSelectedSupervisor] = useState();
  const [selectedshift, setSelectedshift] = useState();
  const [customercode, setCustomerCode] = useState("");
  const [ordernumber, setOrderNumber] = useState("");

  const machineId = useRef();

  const Shiftoptions = [
    { _id: "1", value: "A", label: "A" },
    { _id: "2", value: "B", label: "B" },
  ];

  function sendData(e) {
    e.preventDefault();

    const newChangeover = {
      selectedMachine: machineId.current.value,
      selectedoperator,
      selectedpacking,
      selectedqc,
      selectedtechnician,
      selectedsupervisor,
      selectedshift,
      customercode,
      ordernumber,
    };
    axios
      .post("http://localhost:8080/api/changeover/addchangeover", newChangeover)
      .then((response) => {
        const { date, changeoverNumber, startedAt, _id } = response.data;
        alert("New Changeover Added");
        navigate(`/Basilur/home/${id}/dashboard`, {
          state: {
            selectedMachine: machineId.current.value,
            selectedoperator: selectedoperator,
            selectedpacking: selectedpacking,
            selectedqc: selectedqc,
            selectedtechnician: selectedtechnician,
            selectedsupervisor: selectedsupervisor,
            selectedshift: selectedshift,
            date: date,
            changeoverNumber: changeoverNumber,
            starttime: startedAt,
            changeoverid: _id,
            customercode: customercode,
            ordernumber: ordernumber,
          },
        });
      })
      .catch((err) => {
        alert(err);
      });
  }
  useEffect(() => {
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
    axios
      .get(`http://localhost:8080/api/user/getuser/${id}`)

      .then((res) => {
        setMachinedata(res.data);
      })
      .catch((err) => console.log(`get machine data failed ${err}`));
  }, [id]);

  return (
    <div className="container">
      <div className="container1">
        <header className="container21">
          <span className="text">ADD CHANGEOVER</span>
        </header>
        <div className="container31">
          <div className="container41">
            <form className="form" onSubmit={sendData}>
              {machinedata && (
                <div className="container5">
                  <h6 className="text0">MACHINE</h6>
                  <input
                    type="text"
                    name="name"
                    className="textinput3"
                    defaultValue={machinedata["number"] || ""}
                    ref={machineId}
                  />
                </div>
              )}
              <div className="container5">
                <h6 className="text0">CUSTOMER CODE</h6>
                <input
                  type="text"
                  name="name"
                  className="textinput3"
                  placeholder="Customer Code"
                  onChange={(e) => {
                    setCustomerCode(e.target.value);
                  }}
                />
              </div>
              <div className="container5">
                <h6 className="text0">ORDER NUMBER</h6>
                <input
                  type="text"
                  name="name"
                  className="textinput3"
                  placeholder="Order Number"
                  onChange={(e) => {
                    setOrderNumber(e.target.value);
                  }}
                />
              </div>
              <div className="container5">
                <h6 className="text0">SHIFT</h6>
                <Select
                  className="dropdown"
                  options={Shiftoptions}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      const shift = selectedOption.value;
                      setSelectedshift(shift);
                    }
                  }}
                  placeholder="Select Value"
                />
              </div>
              <div className="container5">
                <h6 className="text0">OPERATOR</h6>
                <Select
                  className="dropdown"
                  options={operators.map((option) => ({
                    value: option.operator_name,
                    label: option.operator_name,
                  }))}
                  onChange={(selectedOption) => {
                    const opt = operators?.find(
                      (x) => x.operator_name === selectedOption.value
                    );

                    setSelectedOperator(opt);
                  }}
                  placeholder="Select Value"
                />
              </div>
              <div className="container5">
                <h6 className="text0">PACKING</h6>
                <Select
                  className="dropdown"
                  options={packings.map((option) => ({
                    value: option.packing_name,
                    label: option.packing_name,
                  }))}
                  onChange={(selectedOption) => {
                    const pckn = packings?.find(
                      (x) => x.packing_name === selectedOption.value
                    );
                    setSelectedPacking(pckn);
                  }}
                  placeholder="Select Value"
                />
              </div>
              <div className="container5">
                <h6 className="text0">TECHNICIAN</h6>
                <Select
                  className="dropdown"
                  options={technicians.map((option) => ({
                    value: option.technician_name,
                    label: option.technician_name,
                  }))}
                  onChange={(selectedOption) => {
                    const tech = technicians?.find(
                      (x) => x.technician_name === selectedOption.value
                    );
                    setSelectedTechnician(tech);
                  }}
                  placeholder="Select Value"
                />
              </div>
              <div className="container5">
                <h6 className="text0">QC</h6>
                <Select
                  className="dropdown"
                  options={qcs.map((option) => ({
                    value: option.qc_name,
                    label: option.qc_name,
                  }))}
                  onChange={(selectedOption) => {
                    const qc = qcs?.find(
                      (x) => x.qc_name === selectedOption.value
                    );
                    setSelectedQc(qc);
                  }}
                  placeholder="Select Value"
                />
              </div>
              <div className="container5">
                <h6 className="text0">IN-CHARGE</h6>
                <Select
                  className="dropdown"
                  options={supervisors.map((option) => ({
                    value: option.supervisor_name,
                    label: option.supervisor_name,
                  }))}
                  onChange={(selectedOption) => {
                    const spvs = supervisors?.find(
                      (x) => x.supervisor_name === selectedOption.value
                    );
                    setSelectedSupervisor(spvs);
                  }}
                  placeholder="Select Value"
                />
              </div>
              <br></br>
              <div className="buttondiv1">
                <button className="savebutton">SAVE</button>
              </div>
            </form>
            <a href="./true"> Go back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
