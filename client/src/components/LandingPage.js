import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import auth from '../helpers/auth';
import Login from './Login';

class LandingPage extends Component{

    render(){
        return(
            <Container>
            { auth.checkLoginToken() === true ?
                this.props.history.push('/home')
                :
                <Login/>
            }
            </Container>
        )
    }
}

export default LandingPage;