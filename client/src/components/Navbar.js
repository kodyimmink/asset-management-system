import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className="nav-wrapper navbar">
            <div className='container'>
                <Link to="/home" className="left brand-logo"> <img className='logoImage' src='https://static1.squarespace.com/static/5b9a8f85cef3721a831f6917/t/5c1a4d08b8a045eac311c4eb/1559658308940/?format=1500w' alt="K&S Ventures"/></Link>
                <ul className="right">
                    <li><NavLink to="/home">Home</NavLink></li>
                    <li><NavLink to="/addEquipment">Add Equipment</NavLink></li>
                    <li><NavLink to="/listEquipment">Logged Equipment</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Navbar);