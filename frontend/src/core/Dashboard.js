import React from 'react'
import "./dashboard.css";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export default function Dashboard() {
    const options = [
        'one', 'two', 'three'
    ];
    const defaultOption = options[0];
    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;


    return (
        <div className='dcontainer'>
            <div className='dcontainer1'>
                <span className='dtext'>PRODUCTION DETAILS</span>
            </div>
            <div className='dcontainer2'>
                <div className='dcontainer3'>
                    <div className='dcontainer5'>
                    <Dropdown className='myClassName' />;
                    </div>
                </div>
            </div>
        </div>
    )
}