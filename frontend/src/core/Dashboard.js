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
  const [date, setDate] = useState(location.state.date);
  const [shift, setShift] = useState(location.state.selectedshift);
  const [machinenumber, setMachine] = useState(location.state.selectedMachine);
  const [changeoverNumber, setChangeover] = useState(
    location.state.changeoverNumber
  );
  const [mrnnumber, setMrnNumber] = useState(location.state.mrnnumber);
  const [description, setDescription] = useState("");

  const [isOn, setIsOn] = useState(false);
  const [newbreakdown, setNewBreakdown] = useState(null);
  const handleButtonClickNoMRN = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);

    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOn();
    } else {
      functionWhenOff();
    }
  };

  const functionWhenOn = () => {
    // Logic for when the button is on
    const currentTime = new Date();
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
      Description: "NO MRN",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOff = () => {
    const currentTime = new Date();
    if (newbreakdown) {
      axios
        .patch(
          `http://localhost:8080/api/breakdown/updatebreakdown${newbreakdown}`,
          {
            endtime: currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            }),
            IsBreakdown: "false",
          }
        )
        .then((response) => {
          setNewBreakdown(null); // Clear the stored breakdown object
          alert("Breakdown ended successfully!");
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
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

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/breakdown/getbreakdowns")
  //     .then((res) => {
  //       const nofilter = res.data;
  //       const filteredData = nofilter.filter((breakdown) => {
  //         return (breakdown.machinenumber =
  //           machinenumber &&
  //           breakdown.date == date &&
  //           breakdown.changeoverNumber == changeoverNumber &&
  //           breakdown.IsBreakdown == true);
  //       });
  //       // console.log(filteredData);
  //       setBreakDowndata(filteredData);
  //       if (filteredData.length > 0 && filteredData[0].Description) {
  //         setDescription(filteredData[0].Description);
  //       }
  //       // console.log(filteredData[0].Description);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       alert("An error occurred while fetching the breakdown.");
  //     });
  // }, [breakdowndata]);

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
              {/* <div className="container5-addbrdwn">
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
                  type="submit"
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
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoPacking ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoPacking}
                >
                  {isSelectedNoPacking
                    ? "MACHINE BREAKDOWN - NO PACKING"
                    : "NO PACKING"}
                </button>
              </div> */}
              {/* <div className="container5-addbrdwn">
                <button
                  type="submit"
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
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedLunch ? "selected" : ""
                  }`}
                  onClick={handleButtonClickLunch}
                >
                  {isSelectedLunch ? "MACHINE BREAKDOWN - LUNCH" : "LUNCH"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedTeaTime ? "selected" : ""
                  }`}
                  onClick={handleButtonClickTeaTime}
                >
                  {isSelectedTeaTime
                    ? "MACHINE BREAKDOWN - TEA TIME"
                    : "TEA TIME"}
                </button>
              </div> */}
              <div className="container5-addbrdwn">
                {/* <button
                  type="submit"
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
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoPower ? "selected" : ""
                  }`}
                  onClick={handleButtonClickNoPower}
                >
                  {isSelectedNoPower
                    ? "MACHINE BREAKDOWN  - NO POWER"
                    : "NO POWER"}
                </button> */}
                <button
                  type="submit"
                  className={`button-addbrdwn`}
                  id="myButton"
                  value={"NO MRN"}
                  onClick={handleButtonClickNoMRN}
                >
                  NO MRN
                </button>
              </div>
              <div className="container5-addbrdwn">
                {/* <button
                  className={`button-addbrdwn ${
                    isSelectedDinner ? "selected" : ""
                  }`}
                  onClick={handleButtonClickDinner}
                >
                  {isSelectedDinner
                    ? "MACHINE BREAKDOWN - NO DINNER"
                    : "DINNER"}
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
