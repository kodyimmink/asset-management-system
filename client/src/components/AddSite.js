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
            siteCountry: 'USA',
            gpsLat: '',
            gpsLng: ''
        }

        this.change = this.change.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const newSite = {
            siteLocation: this.state.siteLocation,
            siteStreetAddress: this.state.siteStreetAddress,
            siteState: this.state.siteState,
            siteZipCode: this.state.siteZipCode,
            siteCountry: this.state.siteCountry,
            gpsLat: this.state.gpsLat,
            gpsLng: this.state.gpsLng
        }

        axios.post(BACKEND_API + '/site/add', newSite)
        .then(res => console.log(res.data))
        .then( () => 
            this.setState({
                siteLocation: '',
                siteStreetAddress: '',
                siteState: '',
                siteZipCode: '',
                siteCountry: 'USA',
                gpsLat: '',
                gpsLng: ''
        }))
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div>
            <Container>  
                <div className='col s12'>
                    <Form type="hidden" value="something" onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId='formAddSiteName'>
                                <Form.Label><b>Site Name</b></Form.Label>
                                    <Form.Control autoComplete="off" type="text" name="siteLocation" placeholder="Enter site name" value={this.state.siteLocation} onChange={this.change}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddSiteState">
                                <Form.Label><b>State</b></Form.Label>
                                    <Form.Control as="select" name="siteState" value={this.state.siteState} onChange={this.change}>
                                        <option value="N/A">N/A</option>
                                        <option value="MI">MI - Michigan</option>
                                    </Form.Control>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formAddStreetAddress'>
                                    <Form.Label><b>Street Address</b></Form.Label>
                                        <Form.Control autoComplete="off" type="text" name="siteStreetAddress" placeholder="Enter site street address" value={this.state.siteStreetAddress} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formAddZipCode">
                                    <Form.Label><b>Zip Code</b></Form.Label>
                                    <Form.Control autoComplete="off" type="text" name="siteZipCode" placeholder="Enter site zip code" value={this.state.siteZipCode} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formAddGPSLatitude'>
                                    <Form.Label><b>Latitude</b></Form.Label>
                                        <Form.Control autoComplete="off" type="text" name="gpsLat" placeholder="Enter latitude" value={this.state.gpsLat} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="formAddGPSLongitude">
                                    <Form.Label><b>Longitude</b></Form.Label>
                                    <Form.Control autoComplete="off" type="text" name="gpsLng" placeholder="Enter longitude" value={this.state.gpsLng} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        <div className="text-right">
                            <Button as="input" type="submit" onChange={this.onSubmit} onClick={this.onSubmit} value="Submit" />
                        </div>
                    </Form>
                </div>
            </Container>
            </div>
        )
    }
}

export default AddSite;