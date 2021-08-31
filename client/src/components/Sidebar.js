import React from 'react';
import '../App.css';
import logo from '../images/logo.png'

const Sidebar = ({ isPublic = false }) => {
    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logo} />
            </div>
            <div>
                { !isPublic ? 
                    <ul>
                        <li>Dashboard</li>
                    </ul>
                    :
                    <ul>
                        <li>Home</li>
                    </ul>
                }
            </div>
            
        </div>
    )
}

export default Sidebar;