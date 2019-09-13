// import React from 'react';
// import { Link, NavLink, withRouter } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';

// const Navigation = () => {
//     return(
//         <nav className="nav-wrapper navbar">
//             <div className='container'>
//                 <div>
//                             <Link to="/home" className="left brand-logo"> <img className='logoImage' src='https://static1.squarespace.com/static/5b9a8f85cef3721a831f6917/t/5c1a4d08b8a045eac311c4eb/1559658308940/?format=1500w' alt="K&S Ventures"/></Link>
//                             <b>Asset Manager</b>
                        
//                 </div>
                
//                 <ul className="right">
//                     <li><NavLink to="/home">Home</NavLink></li>
//                     <li><NavLink to="/sites">Sites</NavLink></li>
//                     <li><NavLink to="/addEquipment">Add Equipment</NavLink></li>
//                 </ul>
//             </div>
//         </nav>
//     )
// }

// export default withRouter(Navigation);

import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Navigation extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar expand='sm'>
            <Navbar.Brand as={Link} to="/home" >
            <img
                src="https://static1.squarespace.com/static/5b9a8f85cef3721a831f6917/t/5c1a4d08b8a045eac311c4eb/1559658308940/?format=1500w"
                width="auto"
                height="35"
                className="d-inline-block align-top"
                alt="K&S Ventures logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/home" >Home</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/sites" >Sites</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto">
                        <NavItem eventkey={1} href="/">
                        <Nav.Link as={Link} to="/addEquipment" >Add Equipment</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);