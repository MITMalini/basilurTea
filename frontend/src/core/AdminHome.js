import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminHome() {
  return (
    <div className="container">
      <div className="container1">
        <div className="container21">
          <span className="text">HOME</span>
        </div>
        <div className="container31">
          <div className="container41">
            <div className="containerhome">
              <a href="./adminviewallchangeovers" className="homebutton">
                VIEW CHANGEOVERS
              </a>
              <a href="./generatereport" className="homebutton">
                GENERATE REPORT
              </a>
              <a href="./addoperator" className="homebutton">
                ADD OPERATOR
              </a>
              <a href="./addpacking" className="homebutton">
                ADD PACKING
              </a>
              <a href="./addqc" className="homebutton">
                ADD QC
              </a>
              <a href="./addtechnician" className="homebutton">
                ADD TECHNICIAN
              </a>
              <a href="./addsupervisor" className="homebutton">
                ADD SUPERVISOR
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
