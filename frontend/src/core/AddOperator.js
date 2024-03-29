import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Addoperator() {
  const [operator_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [epfno, setEpf] = useState("");
  function sendData(e) {
    e.preventDefault();

    //java script objectw
    const newOperator = {
      operator_name,
      epfno,
    };
    axios
      .post("http://localhost:8080/api/operators/addoperator", newOperator)
      .then(() => {
        alert("New Operator Added");
      })
      .catch((err) => {
        alert(err);
      });
  }
  return (
    <div className="container">
      <div className="container1">
        <div className="container2">
          <span className="text">ADD OPERATOR</span>
        </div>
        <div className="container3">
          <div className="container4">
            <form className="form" onSubmit={sendData}>
              <div className="container5">
                <span className="text1">NAME </span>
                <input
                  type="text"
                  placeholder="Operator's Name"
                  className="textinput"
                  id="name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              {/* <div className="container5">
                <span className="text2">EMAIL </span>
                <input
                  type="text"
                  placeholder="Operator's Email"
                  className="textinput1"
                  id="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div> */}
              <div className="container5">
                <span className="text3">EPF NO</span>
                <input
                  type="text"
                  placeholder="Operator's EPF Number"
                  className="textinput2"
                  id="epf"
                  onChange={(e) => {
                    setEpf(e.target.value);
                  }}
                />
              </div>
              <div className="buttondiv">
                <button className="buttonl">SAVE</button>
              </div>
            </form>
            <a href="./true" classname="adiv">
              Go back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
