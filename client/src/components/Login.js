import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import auth from '../helpers/auth';

let userLogin = {};

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.authHandler = this.authHandler.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    authHandler(data){
        auth.login( data, () => {
            this.props.history.push("/home")
          })
    }

    onChangeEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        userLogin = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userLogin)
        this.authHandler(userLogin)
    }

    render(){
        return(
            <Container className="w-50 p-3">
            <h4>Login</h4>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='email' placeholder='Email' value={this.state.email} onChange={this.onChangeEmail}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='password' placeholder='Password' value={this.state.password} onChange={this.onChangePassword}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <Button  onChange={this.onSubmit} onClick={this.onSubmit}>Login</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default withRouter(Login);