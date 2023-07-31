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
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762ee0624805bb4f219f0`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c799a63dd725b825818bb3`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79a443dd725b825818bb5`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79a533dd725b825818bb7`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79e853dd725b825818bc9`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79ab73dd725b825818bb9`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79ac23dd725b825818bbb`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79b213dd725b825818bbd`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79b813dd725b825818bbf`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79b913dd725b825818bc1`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79c1b3dd725b825818bc3`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c79c303dd725b825818bc5`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedMeeting, setIsSelectedMeeting] = useState(false);
  const handleButtonClickMeeting = () => {
    setIsSelectedMeeting(!isSelectedMeeting);
    setDescription("MEETING");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762dc0624805bb4f219ec`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7941e3dd725b825818b9d`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7942c3dd725b825818b9f`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794633dd725b825818ba1`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7946f3dd725b825818ba3`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794993dd725b825818ba5`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794a53dd725b825818ba7`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794b13dd725b825818ba9`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794cf3dd725b825818bab`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c794dd3dd725b825818bad`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7950f3dd725b825818baf`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c795233dd725b825818bb1`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedNoPower, setIsSelectedNoPower] = useState(false);
  const handleButtonClickNoPower = () => {
    setIsSelectedNoPower(!isSelectedNoPower);
    setDescription("NO POWER");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762e70624805bb4f219ee`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790133dd725b825818b87`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790503dd725b825818b89`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790623dd725b825818b8b`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdow64c790713dd725b825818b8d`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790883dd725b825818b8f`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790ae3dd725b825818b91`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790c63dd725b825818b93`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c790e93dd725b825818b95`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c791063dd725b825818b97`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c791273dd725b825818b99`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7915a3dd725b825818b9b`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedTeaTime, setIsSelectedTeaTime] = useState(false);
  const handleButtonClickTeaTime = () => {
    setIsSelectedTeaTime(!isSelectedTeaTime);
    setDescription("TEA TIME");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762d50624805bb4f219ea`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ed73dd725b825818b71`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ee83dd725b825818b73`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ef53dd725b825818b75`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f173dd725b825818b77`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f263dd725b825818b79`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f393dd725b825818b7b`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f463dd725b825818b7d`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f553dd725b825818b7f`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown4c78f623dd725b825818b81`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f703dd725b825818b83`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78f7c3dd725b825818b85`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedLunch, setIsSelectedLunch] = useState(false);
  const handleButtonClickLunch = () => {
    setIsSelectedLunch(!isSelectedLunch);
    setDescription("LUNCH");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762cc0624805bb4f219e8`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d483dd725b825818b5a`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d563dd725b825818b5c`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d673dd725b825818b5e`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d7a3dd725b825818b60`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d8b3dd725b825818b62`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78d9a3dd725b825818b64`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78dac3dd725b825818b66`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78db73dd725b825818b68`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78dc83dd725b825818b6a`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ddd3dd725b825818b6c`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78de93dd725b825818b6e`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedNoMaterial, setIsSelectedNoMaterial] = useState(false);
  const handleButtonClickNoMaterial = () => {
    setIsSelectedNoMaterial(!isSelectedNoMaterial);
    setDescription("NO MATERIAL");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762b80624805bb4f219e6`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788f53dd725b825818b3e`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788da3dd725b825818b3c`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788c23dd725b825818b3a`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788b43dd725b825818b38`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788a63dd725b825818b36`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7888e3dd725b825818b34`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788783dd725b825818b32`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788653dd725b825818b30`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c788413dd725b825818b2e`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7883d3dd725b825818b2c`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7883a3dd725b825818b2a`,
          {
            option: "true",
          }
        );
    }
  };
  const [isSelectedNoPacking, setIsSelectedNoPacking] = useState(false);
  const handleButtonClickNoPacking = () => {
    setIsSelectedNoPacking(!isSelectedNoPacking);
    setDescription("NO PACKING");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762af0624805bb4f219e4`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787a23dd725b825818b14`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787aa3dd725b825818b16`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787ae3dd725b825818b18`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787b43dd725b825818b1a`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787b83dd725b825818b1c`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787bd3dd725b825818b1e`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787c13dd725b825818b20`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787c43dd725b825818b22`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787c83dd725b825818b24`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787cc3dd725b825818b26`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c787cf3dd725b825818b28`,
          {
            option: "true",
          }
        );
    }
  };

  const [isSelectedNoOperator, setIsSelectedNoOperator] = useState(false);
  const handleButtonClickNoOperator = () => {
    setIsSelectedNoOperator(!isSelectedNoOperator);
    setDescription("NO OPERATOR");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c762a70624805bb4f219e2`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c785e0e8943110ed70bb1e`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c785eae8943110ed70bb1f`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c785f5e8943110ed70bb20`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c785fde8943110ed70bb21`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78607e8943110ed70bb22`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78610e8943110ed70bb23`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7861ce8943110ed70bb24`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78626e8943110ed70bb25`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c7862ee8943110ed70bb26`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78645e8943110ed70bb27`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78652e8943110ed70bb28`,
          {
            option: "true",
          }
        );
    }
  };

  const [isSelectedNoTea, setIsSelectedNoTea] = useState(false);
  const handleButtonClickNoTea = () => {
    setIsSelectedNoTea(!isSelectedNoTea);
    setDescription("NO TEA");
    switch (machinenumber) {
      case 1:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c77bb7e8943110ed70bb19`,
          {
            option: "true",
          }
        );
      case 2:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ac33dd725b825818b42`,
          {
            option: "true",
          }
        );
      case 3:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ad53dd725b825818b44`,
          {
            option: "true",
          }
        );
      case 4:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78ae23dd725b825818b46`,
          {
            option: "true",
          }
        );
      case 5:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78af43dd725b825818b48`,
          {
            option: "true",
          }
        );
      case 6:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b0e3dd725b825818b4a`,
          {
            option: "true",
          }
        );
      case 7:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown"64c78b223dd725b825818b4c`,
          {
            option: "true",
          }
        );
      case 8:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b393dd725b825818b4e`,
          {
            option: "true",
          }
        );
      case 9:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b473dd725b825818b50`,
          {
            option: "true",
          }
        );
      case 10:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b533dd725b825818b52`,
          {
            option: "true",
          }
        );
      case 11:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b623dd725b825818b54`,
          {
            option: "true",
          }
        );
      case 12:
        axios.patch(
          `http://localhost:8080/api/isbreakdown/updateisbreakdown64c78b753dd725b825818b56`,
          {
            option: "true",
          }
        );
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
  function sendBDData(e) {
    e.preventDefault();
    try {
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
        Description,
        changeoverNumber,
        // endtime: formattedTime,
      };
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
      });
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
