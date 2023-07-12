import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

export default function FirstPage() {
  return (
    <div className="container-FP">
      <div className="container1-FP">
        <div className="container2-FP"></div>
        <div className="container3-FP">
          <a type="button" className="button-FP">
            LIVE DASHBOARD
          </a>
          <a href="/Basilur" type="button" className="button-FP">
            MACHINE DETAILS
          </a>
        </div>
      </div>
    </div>
  );
}
