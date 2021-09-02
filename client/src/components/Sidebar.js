import React from 'react';
import '../App.css';
import logo from '../images/logo.png'

const Sidebar = ({ filter, filters = [], isPublic = false, onFliter, onToggleSideNav }) => {
    const filtersDisplay = filters.map(a => {
        return <li className={a === filter ? 'active' : ''} onClick={() => onFliter(a)}>{a}</li>
    })
    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={logo} />
                <div class="b-menu" onClick={onToggleSideNav}>
                    <div class="b-bun b-bun--top"></div>
                    <div class="b-bun b-bun--mid"></div>
                    <div class="b-bun b-bun--bottom"></div>
                </div>
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