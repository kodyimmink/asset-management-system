import React, { Component } from 'react';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import auth from '../helpers/auth';

class Register extends Component{
    constructor(props){
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }

        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    change(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        auth.register({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password  
        }, () => { this.props.history.push('/')}) 
    }

    render(){
        return(
            <Container className="w-50 p-3">
            <h4>Register New User</h4>
                <Form onSubmit={this.onSubmit}>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='text' name='firstName' placeholder='First Name' value={this.state.firstName} onChange={this.change}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='text' name='lastName' placeholder='Last Name' value={this.state.lastName} onChange={this.change}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Control type='email' name='email' placeholder='Email' value={this.state.email} onChange={this.change}></Form.Control>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Control type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.change}></Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="text-right">
                        <Button  onChange={this.onSubmit} onClick={this.onSubmit}>Register</Button>
                    </div>
                </Form>
            </Container>
        )
    }
}

export default withRouter(Register);