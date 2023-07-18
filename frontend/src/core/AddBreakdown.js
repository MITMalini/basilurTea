import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import "./style.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AddBreakdown() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [machinedata, setMachinedata] = useState([]);
  const machineId = useRef();
  function sendData(e) {}
  useEffect(() => {
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
          <span className="text">ADD BREAKDOWN</span>
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
                    readOnly
                  />
                </div>
              )}
              <div className="container5">
                <h6 className="text0">CHANGEOVER</h6>
                <input
                  type="text"
                  name="name"
                  className="textinput3"
                  placeholder="Customer Code"
                />
              </div>
              <div className="container5">
                <h6 className="text0">START TIME</h6>
                <input
                  type="text"
                  name="name"
                  className="textinput3"
                  placeholder="Customer Code"
                />
              </div>
              <div className="container5">
                <h6 className="text0">DESCRIPTION</h6>
                <input
                  type="text"
                  name="name"
                  className="textinput3"
                  placeholder="Order Number"
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
