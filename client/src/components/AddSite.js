import React, { Component } from 'react';
import { Form, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';

const BACKEND_API = 'http://localhost:5000';

class AddSite extends Component{
    constructor(props){
        super(props);

        this.state = {
            siteLocation: '',
            siteStreetAddress: '',
            siteState: '',
            siteZipCode: '',
            siteCountry: 'USA'
        }

        this.onChangeSiteLocation = this.onChangeSiteLocation.bind(this);
        this.onChangeSiteState = this.onChangeSiteState.bind(this);
        this.onChangeSiteStreetAddress = this.onChangeSiteStreetAddress.bind(this);
        this.onChangeSiteZipCode = this.onChangeSiteZipCode.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeSiteLocation(e){
        this.setState({
            siteLocation: e.target.value
        })
    }

    onChangeSiteState(e){
        this.setState({
            siteState: e.target.value
        })
    }

    onChangeSiteStreetAddress(e){
        this.setState({
            siteStreetAddress: e.target.value
        })
    }

    onChangeSiteZipCode(e){
        this.setState({
            siteZipCode: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const newSite = {
            siteLocation: this.state.siteLocation,
            siteStreetAddress: this.state.siteStreetAddress,
            siteState: this.state.siteState,
            siteZipCode: this.state.siteZipCode,
            siteCountry: this.state.siteCountry
        }

        axios.post(BACKEND_API + '/site/add', newSite)
        .then(res => console.log(res.data))
        .then( () => 
            this.setState({
                siteLocation: '',
                siteStreetAddress: '',
                siteState: '',
                siteZipCode: '',
                siteCountry: 'USA'
        }))
        .catch(err => console.error(err));
    }

    render(){
        return(
            <Container>
                <h2>Create Site</h2>
                <div className='col s12'>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId='formAddSiteName'>
                                <Form.Label><b>Site Name</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter site name" value={this.state.siteLocation} onChange={this.onChangeSiteLocation}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddSiteState">
                                <Form.Label><b>State</b></Form.Label>
                                    <Form.Control as="select" value={this.state.siteState} onChange={this.onChangeSiteState}>
                                        <option value="N/A">N/A</option>
                                        <option value="MI">MI - Michigan</option>
                                    </Form.Control>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formAddStreetAddress'>
                                    <Form.Label><b>Site Name</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter site street address" value={this.state.siteStreetAddress} onChange={this.onChangeSiteStreetAddress}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formAddZipCode">
                                    <Form.Label><b>Zip Code</b></Form.Label>
                                    <Form.Control type="text" placeholder="Enter site zip code" value={this.state.siteZipCode} onChange={this.onChangeSiteZipCode}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        <div className="text-right">
                            <Button as="input" type="submit" onChange={this.onSubmit} onClick={this.onSubmit} value="Submit" />
                        </div>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default AddSite;