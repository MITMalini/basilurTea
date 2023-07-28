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

  const [breakdowndata, setBreakDowndata] = useState(location.state.mrnnumber);
  const [mrnnumber, setMrnNumber] = useState(location.state.mrnnumber);
  const [Description, setDescription] = useState("");
  const [refreshTime, setRefreshTime] = useState(null);

  const [isSelectedNOMRN, setIsSelectedNOMRN] = useState(false);
  const handleButtonClickNoMRN = () => {
    setIsSelectedNOMRN(!isSelectedNOMRN);
    setDescription("NO MRN");
  };
  const [isSelectedMeeting, setIsSelectedMeeting] = useState(false);
  const handleButtonClickMeeting = () => {
    setIsSelectedMeeting(!isSelectedMeeting);
    setDescription("MEETING");
    setRefreshTime(new Date().toLocaleTimeString());
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  const [isSelectedNoPower, setIsSelectedNoPower] = useState(false);
  const handleButtonClickNoPower = () => {
    setIsSelectedNoPower(!isSelectedNoPower);
    setDescription("NO POWER");
  };
  const [isSelectedTeaTime, setIsSelectedTeaTime] = useState(false);
  const handleButtonClickTeaTime = () => {
    setIsSelectedTeaTime(!isSelectedTeaTime);
    setDescription("TEA TIME");
  };
  const [isSelectedLunch, setIsSelectedLunch] = useState(false);

  const handleButtonClickLunch = () => {
    setIsSelectedLunch(!isSelectedLunch);
    setDescription("LUNCH");
    if (!isSelectedNOMRN) {
      setStartTime(formattedTime);
      setIsSelectedNOMRN(!isSelectedNOMRN);
      setDescription("NO MRN");
      console.log(starttime);
    } else {
      setEndTime(formattedTime);
      setIsSelectedNOMRN(true);
      console.log(endedAt);
    }
  };
  const [isSelectedNoMaterial, setIsSelectedNoMaterial] = useState(false);
  const handleButtonClickNoMaterial = () => {
    setIsSelectedNoMaterial(!isSelectedNoMaterial);
    setDescription("NO MATERIAL");
  };
  const [isSelectedNoPacking, setIsSelectedNoPacking] = useState(false);
  const handleButtonClickNoPacking = () => {
    setIsSelectedNoPacking(!isSelectedNoPacking);
    setDescription("NO PACKING");
  };

  const [isSelectedNoOperator, setIsSelectedNoOperator] = useState(false);

  const handleButtonClickNoOperator = () => {
    setIsSelectedNoOperator(!isSelectedNoOperator);
    setDescription("NO OPERATOR");
  };

  const [isSelectedNoTea, setIsSelectedNoTea] = useState(false);
  const handleButtonClickNoTea = () => {
    setIsSelectedNoTea(!isSelectedNoTea);
    setDescription("NO TEA");
  };
  const [isSelectedDinner, setIsSelectedDinner] = useState(false);
  const handleButtonClickDinner = () => {
    setIsSelectedDinner(!isSelectedDinner);
    setDescription("DINNER");
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
        starttime: currentTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
        Description,
        changeoverNumber,
        // endtime: formattedTime,
      };
      // newBreakdown.endtime = formattedTime; // Add endtime property to newBreakdown object
      axios
        .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
        .then((response) => {
          console.log(response.data); // Log the response from the server (optional)
          alert("Breakdown saved successfully!");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while saving the breakdown.");
        });
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the breakdown.");
    }

    axios
      .get("http://localhost:8080/api/breakdown/getbreakdowns")
      .then((res) => {
        const nofilter = res.data;
        const filteredbreakdown = nofilter.filter((breakdown) => {
          return breakdown.IsBreakdown === true;
        });
        setBreakDowndata(filteredbreakdown);
      })
      .catch((err) => console.log(`get machine data failed ${err}`));
  }
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
              <form className="container5-addbrdwn" onSubmit={sendBDData}>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoTea ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoTea}
                >
                  {isSelectedNoTea ? "MACHINE BREAKDOWN - NO TEA" : "NO TEA"}
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedNoOperator ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoOperator}
                >
                  {isSelectedNoOperator
                    ? "MACHINE BREAKDOWN - NO OPERATOR"
                    : "NO OPERATOR"}
                </button>
                <button
                  className={`button-addbrdwn ${
                    isSelectedNoPacking ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoPacking}
                >
                  {isSelectedNoPacking
                    ? "MACHINE BREAKDOWN - NO PACKING"
                    : "NO PACKING"}
                </button>
              </form>
              <form className="container5-addbrdwn" onSubmit={sendBDData}>
                <button
                  className={`button-addbrdwn ${
                    isSelectedNoMaterial ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoMaterial}
                >
                  {isSelectedNoMaterial
                    ? "MACHINE BREAKDOWN - NO MATERIAL"
                    : "NO MATERIAL"}
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
              </form>
              <form className="container5-addbrdwn" onSubmit={sendBDData}>
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
              </form>
              <div className="container5-addbrdwn" onSubmit={sendBDData}>
                <button
                  className={`button-addbrdwn ${
                    isSelectedDinner ? "selected" : ""
                  }`}
                  onClick={handleButtonClickDinner}
                >
                  {isSelectedDinner
                    ? "MACHINE BREAKDOWN - NO DINNER"
                    : "DINNER"}
                </button>
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
