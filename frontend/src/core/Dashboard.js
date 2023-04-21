import React from "react";
import {Link } from "react-router-dom";


export default function Dashboard(props){
    return(
        <div>
            <p>{props.operator.operator_name + ' ' + props.operator.epfno} </p>
        </div>
    )
};