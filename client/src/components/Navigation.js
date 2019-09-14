import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import auth from '../classes/auth';
import Login from './Login';


class Navigation extends Component {

  constructor(props){
    super(props);

    this.state = {
      isAuthenticated: auth.isAuthenticated()
    }

  }

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
                    <Login />
                    
                </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);

// { this.state.isAuthenticated !== true ? 
//   <Button variant='success' onClick={ () => {
//     auth.login( () => {
//           this.props.history.push("/home")
//         }
//       )
//     }}>Login
//   </Button> 
// : 
//   <Button variant='danger' onClick={ () => {
//     auth.logout( () => {
//           this.props.history.push("/")
//         }
//       )
//     }}>Logout
//   </Button>
//}