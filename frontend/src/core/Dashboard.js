import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Divider } from "antd";

const Dashboard = (props) => {
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
  const [otherdescription, setOtherDescription] = useState("");

  const [breakdowndata, setBreakDowndata] = useState("");

  const [isOn, setIsOn] = useState(false);
  const [newbreakdown, setNewBreakdown] = useState(null);

  const [isSelectedNoTea, setIsSelectedNoTea] = useState(false);
  const handleButtonClickNoTea = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNoTea();
    } else {
      functionWhenOffNoTea();
    }
  };
  const functionWhenOnNoTea = () => {
    // Logic for when the button is on
    setIsSelectedNoTea(!isSelectedNoTea);
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
      Description: "NO TEA",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNoTea = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };
  const [isSelectedNoOperator, setIsSelectedNoOperator] = useState(false);
  const handleButtonClickNoOperator = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNoOperator();
    } else {
      functionWhenOffNoOperator();
    }
  };
  const functionWhenOnNoOperator = () => {
    // Logic for when the button is on
    setIsSelectedNoOperator(!isSelectedNoOperator);
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
      Description: "NO OPERATOR",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNoOperator = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };
  const [isSelectedNoPacking, setIsSelectedNoPacking] = useState(false);
  const handleButtonClickNoPacking = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNoPacking();
    } else {
      functionWhenOffNoPacking();
    }
  };
  const functionWhenOnNoPacking = () => {
    // Logic for when the button is on
    setIsSelectedNoPacking(!isSelectedNoPacking);
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
      Description: "NO PACKING",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNoPacking = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedTeaTime, setIsSelectedTeaTime] = useState(false);
  const handleButtonClickTeaTime = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnTeaTime();
    } else {
      functionWhenOffTeaTime();
    }
  };
  const functionWhenOnTeaTime = () => {
    // Logic for when the button is on
    setIsSelectedTeaTime(!isSelectedTeaTime);
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
      Description: "TEA TIME",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffTeaTime = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedNoMaterial, setIsSelectedNoMaterial] = useState(false);
  const handleButtonClickNoMaterial = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNoMaterial();
    } else {
      functionWhenOffNoMaterial();
    }
  };
  const functionWhenOnNoMaterial = () => {
    // Logic for when the button is on
    setIsSelectedNoMaterial(!isSelectedNoMaterial);
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
      Description: "NO MATERIAL",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNoMaterial = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedLunch, setIsSelectedLunch] = useState(false);
  const handleButtonClickLunch = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnLunch();
    } else {
      functionWhenOffLunch();
    }
  };
  const functionWhenOnLunch = () => {
    // Logic for when the button is on
    setIsSelectedLunch(!isSelectedLunch);
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
      Description: "LUNCH",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffLunch = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedMEETING, setIsSelectedMEETING] = useState(false);
  const handleButtonClickMEETING = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnMEETING();
    } else {
      functionWhenOffMEETING();
    }
  };
  const functionWhenOnMEETING = () => {
    // Logic for when the button is on
    setIsSelectedMEETING(!isSelectedMEETING);
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
      Description: "MEETING",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffMEETING = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedNOPOWER, setIsSelectedNOPOWER] = useState(false);
  const handleButtonClickNOPOWER = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNOPOWER();
    } else {
      functionWhenOffNOPOWER();
    }
  };
  const functionWhenOnNOPOWER = () => {
    // Logic for when the button is on
    setIsSelectedNOPOWER(!isSelectedNOPOWER);
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
      Description: "NO POWER",
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNOPOWER = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedNOMRN, setIsSelectedNOMRN] = useState(false);
  const handleButtonClickNoMRN = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnNoMRN();
    } else {
      functionWhenOffNoMRN();
    }
  };
  const functionWhenOnNoMRN = () => {
    // Logic for when the button is on
    setIsSelectedNOMRN(!isSelectedNOMRN);
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
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffNoMRN = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error updating breakdown:", error);
        });
    } else {
      alert("No active breakdown to end.");
    }
  };

  const [isSelectedOTHER, setIsSelectedOTHER] = useState(false);
  const handleButtonClickOTHER = (e) => {
    // Toggle the state
    setIsOn((prevIsOn) => !prevIsOn);
    localStorage.setItem("isOn", JSON.stringify(!isOn));
    // Execute different functions based on the state
    if (!isOn) {
      functionWhenOnOTHER();
    } else {
      functionWhenOffOTHER();
    }
  };
  const functionWhenOnOTHER = () => {
    // Logic for when the button is on
    setIsSelectedOTHER(!isSelectedOTHER);
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
      Description: otherdescription,
      changeoverNumber,
    };

    axios
      .post("http://localhost:8080/api/breakdown/addbreakdown", newBreakdown)
      .then((res) => {
        // Store the created breakdown in state
        setNewBreakdown(res.data._id);
        localStorage.setItem("newBreakdownId", res.data._id);
        console.log(res.data._id);
        alert("Breakdown started successfully!");
      })
      .catch((error) => {
        console.error("Error creating breakdown:", error);
      });
  };
  const functionWhenOffOTHER = () => {
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
          localStorage.removeItem("newBreakdownId");
          alert("Breakdown ended successfully!");
          window.location.reload();
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

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/breakdown/getbreakdowns")
      .then((res) => {
        const nofilter = res.data;
        const filteredData = nofilter.filter((breakdown) => {
          return (breakdown.machinenumber =
            machinenumber &&
            breakdown.date == date &&
            breakdown.changeoverNumber == changeoverNumber &&
            breakdown.IsBreakdown == true);
        });
        // console.log(filteredData);
        if (filteredData.length > 0 && filteredData[0].Description) {
          setDescription(filteredData[0].Description);
          console.log(filteredData[0].Description);
        }

        setBreakDowndata(filteredData);
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while fetching the breakdown.");
      });
  }, [machinenumber, date, changeoverNumber, breakdowndata]);

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
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoTea ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO TEA"}
                  onClick={handleButtonClickNoTea}
                >
                  {description === "NO TEA"
                    ? "MACHINE BREAKDOWN - NO TEA"
                    : "NO TEA"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoOperator ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO OPERATOR"}
                  onClick={handleButtonClickNoOperator}
                >
                  {description === "NO OPERATOR"
                    ? "MACHINE BREAKDOWN - NO OPERATOR"
                    : "NO OPERATOR"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoPacking ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO PACKING"}
                  onClick={handleButtonClickNoPacking}
                >
                  {description === "NO PACKING"
                    ? "MACHINE BREAKDOWN - NO PACKING"
                    : "NO PACKING"}
                </button>
              </div>
              <div className="container5-addbrdwn">
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNoMaterial ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO MATERIAL"}
                  onClick={handleButtonClickNoMaterial}
                >
                  {description === "NO MATERIAL"
                    ? "MACHINE BREAKDOWN - NO MATERIAL"
                    : "NO MATERIAL"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedLunch ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"LUNCH"}
                  onClick={handleButtonClickLunch}
                >
                  {description === "LUNCH"
                    ? "MACHINE BREAKDOWN - LUNCH"
                    : "LUNCH"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedTeaTime ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"TEA TIME"}
                  onClick={handleButtonClickTeaTime}
                >
                  {description === "TEA TIME"
                    ? "MACHINE BREAKDOWN - TEA TIME"
                    : "TEA TIME"}
                </button>
              </div>
              <div className="container5-addbrdwn">
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedMEETING ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO MEETING"}
                  onClick={handleButtonClickMEETING}
                >
                  {description === "MEETING"
                    ? "MACHINE BREAKDOWN - MEETING"
                    : "MEETING"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNOPOWER ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO POWER"}
                  onClick={handleButtonClickNOPOWER}
                >
                  {description === "NO POWER"
                    ? "MACHINE BREAKDOWN - NO POWER"
                    : "NO POWER"}
                </button>
                <button
                  type="submit"
                  className={`button-addbrdwn ${
                    isSelectedNOMRN ? "selected" : ""
                  }`}
                  id="myButton"
                  value={"NO MRN"}
                  onClick={handleButtonClickNoMRN}
                >
                  {description === "NO MRN"
                    ? "MACHINE BREAKDOWN - NO MRN"
                    : "NO MRN"}
                </button>
              </div>
              {/* <div className="container5-addbrdwn">
                 <Popup
                  trigger={
                    <button
                      type="button"
                      className={`button-addbrdwn ${
                        isSelectedOTHER ? "selected" : ""
                      }`}
                      onClick={handleButtonClickOTHER}
                    >
                      {otherdescription
                        ? "MACHINE BREAKDOWN - OTHER "
                        : "OTHER"}
                    </button>
                  }
                  modal
                  nested
                >
                  {(close) => (
                    <div className="modal">
                      <form className="form">
                        <div className="container5">
                          <h6 className="text0">DESCRIPTION</h6>
                          <input
                            type="text"
                            name="name"
                            className="textinput3"
                            placeholder="Breakdown description"
                            value={otherdescription}
                            onChange={(e) => {
                              setOtherDescription(e.target.value);
                            }}
                          />
                        </div>
                        <br></br>
                        <button
                          className="savebutton"
                          onClick={() => {
                            close();
                            isOn
                              ? functionWhenOffOTHER()
                              : functionWhenOnOTHER();
                          }}
                        >
                          SAVE
                        </button>
                      </form>
                    </div>
                  )}
                </Popup> 
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
