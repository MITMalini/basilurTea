import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="container1">
        <div className="container2">
          <span className="text">HOME</span>
        </div>
        <div className="container31">
          <div className="container41">
            <div className="containerhome">
              <a href="./addchangeover" className="homebutton">
                ADD CHANGEOVER
              </a>
              <a href="./viewallchangeovers" className="homebutton">
                VIEW CHANGEOVERS
              </a>
              <a href="./generatemachinereport" className="homebutton">
                GENERATE REPORT
              </a>
              <a href="./breakdowns" className="homebutton">
                ADD BREAKDOWN
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
