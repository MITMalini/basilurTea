import React from "react";
import "./style.css";

export default function AddError() {
  return (
    <div className="econtainer">
      <div className="econtainer1">
        <header className="econtainer2">
          <span className="text">ADD ERROR</span>
        </header>
        <div className="econtainer3">
          <div className="econtainer4">
            <div className="econtainer5">
              <span className="text1">ERROR CODE : </span>
              <input
                type="text"
                placeholder="Operator's Name"
                className="textinput"
              />
            </div>
            <div className="econtainer6">
              <span className="text2">ERROR NAME : </span>
              <input
                type="text"
                placeholder="Operator's Email"
                className="textinput1"
              />
            </div>
            <div className="econtainer7">
              <span className="text3">DESCRIPTION : </span>
              <input
                type="text"
                placeholder="Operator's EPF Number"
                className="textinput2"
              />
            </div>
            <button className="savebutton">SAVE</button>
          </div>
        </div>
      </div>
    </div>
  );
}
