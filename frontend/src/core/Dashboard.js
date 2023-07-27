import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Divider } from "antd";

const Dashboard = () => {
  const dividerStyle = {
    backgroundColor: "#D9D9D9",
    width: "40%",
    height: "0.1px",
  };
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

  const [isSelected, setIsSelected] = useState(false);
  const [isSelectedNOMRN, setIsSelectedNOMRN] = useState(false);
  const handleButtonClickNoMRN = () => {
    setIsSelectedNOMRN(!isSelectedNOMRN);
  };
  const [isSelectedMeeting, setIsSelectedMeeting] = useState(false);
  const handleButtonClickMeeting = () => {
    setIsSelectedMeeting(!isSelectedMeeting);
  };
  const [isSelectedNoPower, setIsSelectedNoPower] = useState(false);
  const handleButtonClickNoPower = () => {
    setIsSelectedNoPower(!isSelectedNoPower);
  };
  const [isSelectedTeaTime, setIsSelectedTeaTime] = useState(false);
  const handleButtonClickTeaTime = () => {
    setIsSelectedTeaTime(!isSelectedTeaTime);
  };
  const [isSelectedLunch, setIsSelectedLunch] = useState(false);
  const handleButtonClickLunch = () => {
    setIsSelectedLunch(!isSelectedLunch);
  };
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
    // const intervalId = setInterval(() => {
    //   window.location.reload();
    // }, 5000);
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    setStartTime(formattedTime); // Set start time in state
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-Dashboard">
      <div className="container1-Dashboard">
        <div className="container2-Dashboard">
          <span className="text"> CHANGEOVER</span>
        </div>
        <div className="container3-Dashboard">
          <form className="container4-Dashboard" onSubmit={sendData}>
            <div className="container5-Dashboard">
              <div className="container7-Dashboard">
                <span className="textview-dashboard">
                  &nbsp;&nbsp;&nbsp;MACHINE{" "}
                </span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.selectedMachine}
                  readOnly
                />
                <span className="textview-dashboard">MRN </span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.mrnnumber}
                  readOnly
                />
                <span className="textview-dashboard">BAG COUNT</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.plannedbagcount}
                  readOnly
                />
                <span className="textview-dashboard">DATE</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.date.split("T")[0]}
                  readOnly
                />
              </div>
              <div className="container7-Dashboard">
                <span className="textview-dashboard">START TIME</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.starttime}
                  readOnly
                />
                <span className="textview-dashboard">SHIFT </span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.selectedshift}
                  readOnly
                />

                <span className="textview-dashboard">CHANGE OVER </span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.changeoverNumber}
                  readOnly
                />
                <span className="textview-dashboard">IN-CHAERGE</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={
                    location.state.selectedsupervisor.supervisor_name
                  }
                  readOnly
                />
              </div>
              <div className="container7-Dashboard">
                <span className="textview-dashboard">
                  &nbsp;&nbsp;&nbsp;OPERATOR
                </span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.selectedoperator.operator_name}
                  readOnly
                />
                <span className="textview-dashboard">PACKING</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.selectedpacking.packing_name}
                  readOnly
                />
                <span className="textview-dashboard">TECHNICIAN</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={
                    location.state.selectedtechnician.technician_name
                  }
                  readOnly
                />
                <span className="textview-dashboard">QC</span>
                <input
                  type="text"
                  name="name"
                  className="textinput-dashboard"
                  defaultValue={location.state.selectedqc.qc_name}
                  readOnly
                />
              </div>
            </div>
            <button type="submit" className="button-Dashboard">
              END CHANGEOVER
            </button>
          </form>

          <div className="container6-Dashboard">
            <div className="container8-Dashboard">
              <Divider type="vertical" style={dividerStyle} />
              <span className="text-Dashboard "> ADD BREAKDOWN</span>
              <Divider type="vertical" style={dividerStyle} />
            </div>
            <div className="container4-addbrdwn">
              <div className="container5-addbrdwn">
                <button type="submit" className="button-addbrdwn">
                  NO TEA
                </button>
                <button type="button" className="button-addbrdwn">
                  NO OPERATOR
                </button>
                <button type="button" className="button-addbrdwn">
                  NO PACKING
                </button>
              </div>
              <div className="container5-addbrdwn">
                <button type="button" className="button-addbrdwn">
                  NO MATERIAL
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedLunch ? "selected" : ""
                  }`}
                  onClick={handleButtonClickLunch}
                >
                  {isSelectedLunch ? "MACHINE BREAKDOWN - LUNCH" : "LUNCH"}
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedTeaTime ? "selected" : ""
                  }`}
                  onClick={handleButtonClickTeaTime}
                >
                  {isSelectedTeaTime
                    ? "MACHINE BREAKDOWN - TEA TIME"
                    : "TEA TIME"}
                </button>
              </div>
              <div className="container5-addbrdwn">
                <button
                  className={`button-addbrdwn ${
                    isSelectedMeeting ? "selected" : ""
                  }`}
                  onClick={handleButtonClickMeeting}
                >
                  {isSelectedMeeting
                    ? "MACHINE BREAKDOWN - MEETING"
                    : "MEETING"}
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedNoPower ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoPower}
                >
                  {isSelectedNoPower
                    ? "MACHINE BREAKDOWN  - NO POWER"
                    : "NO POWER"}
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedNOMRN ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoMRN}
                >
                  {isSelectedNOMRN ? "MACHINE BREAKDOWN - NO MRN" : "NO MRN"}
                </button>
              </div>
              <div className="container5-addbrdwn">
                {/* <button
                  className={`button-addbrdwn ${isSelected ? "selected" : ""}`}
                  onClick={handleButtonClick1}
                >
                  {isSelected ? "Selected" : "Not Selected"}
                </button> */}
                <button type="button" className="button-addbrdwn">
                  Button
                </button>
                <button type="button" className="button-addbrdwn">
                  OTHER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
