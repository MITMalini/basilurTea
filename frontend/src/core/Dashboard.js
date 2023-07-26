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
    // <div className="container">
    //   <div className="container1">
    //     <div className="container21">
    //       <span className="text"> CHANGEOVER</span>
    //     </div>
    //     <div className="container3-Dashboard">
    //       <div className="container4main-Dashboard">
    //         <div className="container4-Dashboard">
    //           <form className="form-Dashboard">
    //             <div className="container5-Dashboard">
    //               <span className="textview-dashboard">MACHINE NUMBER </span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.selectedMachine}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">MRN NUMBER</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.mrnnumber}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">PLANNED BAG COUNT</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.plannedbagcount}
    //                 readOnly
    //               />
    //             </div>
    //             <div className="container5-Dashboard">
    //               <span className="textview-dashboard">DATE</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.date.split("T")[0]}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">START TIME</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.starttime}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">SHIFT </span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.selectedshift}
    //                 readOnly
    //               />

    //               <span className="textview-dashboard">CHANGE OVER </span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.changeoverNumber}
    //                 readOnly
    //               />
    //             </div>
    //             <div className="container5-Dashboard">
    //               <span className="textview-dashboard">OPERATOR</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.selectedoperator.operator_name}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">PACKING</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.selectedpacking.packing_name}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">TECHNICIAN</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={
    //                   location.state.selectedtechnician.technician_name
    //                 }
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">QC</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={location.state.selectedqc.qc_name}
    //                 readOnly
    //               />
    //               <span className="textview-dashboard">In-Charge</span>
    //               <input
    //                 type="text"
    //                 name="name"
    //                 className="textinput-dashboard"
    //                 defaultValue={
    //                   location.state.selectedsupervisor.supervisor_name
    //                 }
    //                 readOnly
    //               />
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //       <div className="containerbotton-Dashboard">
    //         <button>end changeover</button>
    //       </div>
    //       <div></div>
    //       {/* <div className="optionbox">
    //         <div className="buttondiv1">
    //           <a type="submit" className="buttonm" onSubmit={sendData}>
    //             <button className="buttonmm">END CHANGE OVER</button>
    //           </a>
    //         </div>
    //         <div className="buttondiv1">
    //           <a href="./true" className="buttonm">
    //             <button className="buttonmm">Breakdown</button>
    //           </a>
    //         </div>

    //         <a href="./true" className="optionbox-a">
    //           <button className="optionbox-botton">GO BACK TO HOME</button>
    //         </a>
    //       </div> */}
    //     </div>
    //   </div>
    // </div>

    <div className="container">
      <div className="container1">
        <div className="container21">
          <span className="text"> CHANGEOVER</span>
        </div>
        <div className="container3-Dashboard">
          <div className="container4-Dashboard">
            <div className="container5-Dashboard"></div>
            <button type="button" className="button-Dashboard">
              Button
            </button>
          </div>
          <div className="container6-Dashboard"></div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
