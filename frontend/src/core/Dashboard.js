import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Dashboard = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [starttime, setStartTime] = useState("");
  const [date, setDate] = useState(location.state.date);
  const [shift, setShift] = useState(location.state.selectedshift);
  const [machinenumber, setMachine] = useState(location.state.selectedMachine);
  const [changeoverNumber, setChangeover] = useState(
    location.state.changeoverNumber
  );
  const [Description, setDescription] = useState("");

  function sendData(e) {
    e.preventDefault();
    try {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      axios.patch(
        `http://localhost:8080/api/changeover/updatechangeover/${location.state.changeoverid}`,
        {
          endedAt: formattedTime,
        }
      );
    } catch (err) {
      console.error(err);
    }
    alert("Changeover Ended");
    navigate(`/Basilur/home/${id}/addchangeover`);
  }
  function sendBDData(e) {
    e.preventDefault();
    try {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      const newBreakdown = {
        date,
        shift,
        machinenumber,
        mrnnumber,
        starttime,
        Description,
        endtime: formattedTime,
      };

      newBreakdown.endtime = formattedTime; // Add endtime property to newBreakdown object
      axios
        .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
        .then((response) => {
          console.log(response.data); // Log the response from the server (optional)
          alert("Breakdown saved successfully!");
          close(); // Close the popup
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while saving the breakdown.");
        });
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the breakdown.");
    }
  }
  useEffect(() => {
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setStartTime(formattedTime); // Set start time in state
  }, []);

  return (
    <div className="container">
      <div className="container1">
        <div className="container21">
          <span className="text"> CHANGEOVER</span>
        </div>
        <div className="container3-Dashboard">
          <div className="container4-Dashboard">
            <form className="form-dashboard" onSubmit={sendData}>
              <div className="container5">
                <span className="textview">DATE&nbsp;</span>
                <input
                  type="text"
                  name="name"
                  className="textinputviewl"
                  defaultValue={location.state.date}
                  readOnly
                />
                <span className="textviewo">
                  START TIME &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <input
                  type="text"
                  name="name"
                  className="textinputviewr"
                  defaultValue={location.state.starttime}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">SHIFT </span>
                <input
                  type="text"
                  name="name"
                  className="textinputviewl"
                  defaultValue={location.state.selectedshift}
                  readOnly
                />

                <span className="textviewo">CHANGE OVER </span>
                <input
                  type="text"
                  name="name"
                  className="textinputviewr"
                  defaultValue={location.state.changeoverNumber}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">MACHINE NUMBER </span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.selectedMachine}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">MRN NUMBER</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.mrnnumber}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">PLANNED BAG COUNT</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.plannedbagcount}
                  readOnly
                />
              </div>

              <div className="container5">
                <span className="textview">OPERATOR</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.selectedoperator.operator_name}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">PACKING</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.selectedpacking.packing_name}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">TECHNICIAN</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={
                    location.state.selectedtechnician.technician_name
                  }
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">QC</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={location.state.selectedqc.qc_name}
                  readOnly
                />
              </div>
              <div className="container5">
                <span className="textview">IN-CHARGE</span>
                <input
                  type="text"
                  name="name"
                  className="textinputview1"
                  defaultValue={
                    location.state.selectedsupervisor.supervisor_name
                  }
                  readOnly
                />
              </div>
              <div className="buttondiv1">
                <a type="submit" className="buttonm">
                  <button className="buttonmm">END CHANGE OVER</button>
                </a>
              </div>
            </form>
            <div className="optionbox">
              <div>
                <Popup
                  trigger={
                    <button className="optionbox-botton">ADD BREAKDOWN</button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className="modal">
                      <form
                        className="form"
                        onSubmit={(e) => sendBDData(e, close)}
                      >
                        <span className="text-BD"> ADD BREAKDOWN</span>
                        <div className="container5">
                          <h6 className="text0">DATE</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Customer Code"
                            value={date}
                            readOnly
                          />
                        </div>
                        <div className="container5">
                          <h6 className="text0">SHIFT</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Customer Code"
                            value={shift}
                            readOnly
                          />
                        </div>
                        <div className="container5">
                          <h6 className="text0">MACHINE</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            value={machinenumber}
                            readOnly
                          />
                        </div>
                        <div className="container5">
                          <h6 className="text0">CHANGEOVER</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Customer Code"
                            value={changeoverNumber}
                            readOnly
                          />
                        </div>

                        <div className="container5">
                          <h6 className="text0">START TIME</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Customer Code"
                            value={starttime}
                            readOnly
                          />
                        </div>
                        <div className="container5">
                          <h6 className="text0">DESCRIPTION</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Breakdown description"
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </div>
                        <br></br>
                        <button className="savebutton">SAVE</button>
                      </form>
                    </div>
                  )}
                </Popup>
              </div>
              <a href="./true" className="optionbox-a">
                <button className="optionbox-botton">GO BACK TO HOME</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
