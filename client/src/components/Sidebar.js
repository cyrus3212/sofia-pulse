import React from 'react';
import '../App.css';
import logo from '../images/logo.png'

const Sidebar = ({ filter, filters = [], isPublic = false, onFliter }) => {
    const filtersDisplay = filters.map(a => {
        return <li className={a === filter ? 'active' : ''} onClick={() => onFliter(a)}>{a}</li>
    })
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
                        {filtersDisplay}
                    </ul>
                }
            </div>
            
        </div>
    )
}

export default Sidebar;