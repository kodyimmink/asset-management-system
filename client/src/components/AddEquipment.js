import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import {Button, Container, Col, Form, Row} from 'react-bootstrap';

const BACKEND_API = "http://localhost:5000";


const SiteItem = props => (
    <option value={props.site.siteLocation}>{props.site.siteLocation}</option>
)

class AddEquipment extends Component{
    constructor(props){
        super(props);

        this.change = this.change.bind(this);
        this.onChangeSiteLocation = this.onChangeSiteLocation.bind(this);
        this.sitesList = this.sitesList.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            equipmentType: '',
            modelNumber: '',
            serialNumber: '',
            siteLocation: '',
            siteId: '',
            gpsLat: '',
            gpsLng: '',
            specificLocation: '',
            sitesList: []
        }    
    }

    componentDidMount(){
        //get site locations
        axios.get(BACKEND_API + '/site/listAll')
        .then(res => {
            this.setState({
                sitesList: res.data
            })
        })
    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onChangeSiteLocation(e){
        const siteLocation = {
            siteLocation: e.target.value
        }
        axios.post(BACKEND_API + '/site/getId', siteLocation)
        .then(response => {
        this.setState({
            siteLocation: response.data[0].siteLocation,
            siteId: response.data[0]._id
            })
        })
    }


    sitesList(){
        return this.state.sitesList.map( currentSite => {
            return <SiteItem site={currentSite} key={currentSite._id}/>
        })
    }

    onSubmit(e){
        e.preventDefault();

        const equipment = {
            name: this.state.name,
            equipmentType: this.state.equipmentType,
            modelNumber: this.state.modelNumber,
            serialNumber: this.state.serialNumber,
            siteLocation: this.state.siteLocation,
            siteId: this.state.siteId,
            specificLocation: this.state.specificLocation,
            gpsLat: this.state.gpsLat,
            gpsLng: this.state.gpsLng
        }

        axios.post(BACKEND_API+'/equipment/add', equipment)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));

        this.props.history.push('/site/' +this.state.siteId);
    }

    render(){
        return(
            <Container>
            <h2>Add Equipment</h2>
                <div className='col s12'>
                    <Form onSubmit={this.onSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId='formAddEquipmentName'>
                                <Form.Label><b>Equipment Name</b></Form.Label>
                                    <Form.Control type="text" name="name" placeholder="Enter equipment name" value={this.state.name} onChange={this.change}/>
                                    <Form.Text className="text-muted">
                                        General or common name used to identify the equipment.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddEquipmentType">
                                <Form.Label><b>Equipment Type</b></Form.Label>
                                    <Form.Control as="select" name="equipmentType" value={this.state.equipmentType} onChange={this.change}>
                                        <option value="N/A">N/A</option>
                                        <option value="AC">AC - Air Conditioner</option>
                                        <option value="AHU">AHU - Air Handling Unit</option>
                                        <option value="ASH">ASH - Air Supply House</option>
                                        <option value="BLR">BLR - Boiler</option>
                                        <option value="CHLR">CHLR - Chiller</option>
                                        <option value="CHWP">CHWP - Chilled Water Pump</option>
                                        <option value="CT">CT - Cooling Tower</option>
                                        <option value="CUH">CUH - Cabinet Unit Heater</option>
                                        <option value="EAHU">EAHU - Exhaust Air Handling Unit</option>
                                        <option value="EF">EF - Exhaust Fan</option>
                                        <option value="ERU">ERU - Energy Recovery Unit</option>                                            <option value="EHU">EHU - Electric Unit Heater</option>
                                        <option value="FCU">FCU - Fan Coil Unit</option>
                                        <option value="HRU">HRU - Heat Recovery Unit</option>
                                        <option value="HWP">HWP - Hot Water Pump</option>
                                        <option value="RTU">RTU - Roof Top Unit</option>
                                        <option value="VAV">VAV - Variable Air Volume</option>
                                        <option value="UV">UV - Unit Ventilator</option>
                                        <option value="VUV">VUV - Vertical Unit Ventilator</option>
                                    </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formAddEquipmentModelNumber'>
                                    <Form.Label><b>Model Number</b></Form.Label>
                                        <Form.Control type="text" name="modelNumber" placeholder="Enter equipment model number" value={this.state.modelNumber} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formAddEquipmentSerialNumber'>
                                    <Form.Label><b>Serial Number</b></Form.Label>
                                        <Form.Control type="text" name="serialNumber" placeholder="Enter equipment serial number" value={this.state.serialNumber} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>                                
                                <Col>
                                    <Form.Group controlId="formAddSiteLocation">
                                    <Form.Label><b>Site Location</b></Form.Label>
                                        <Form.Control as="select" value={this.state.siteLocation} onChange={this.onChangeSiteLocation}>
                                            <option value="N/A">N/A</option>
                                            { this.sitesList() }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formAddSpecificLocation'>
                                    <Form.Label><b>Specific Location</b></Form.Label>
                                        <Form.Control type="text" name="specificLocation" placeholder="Enter equipment name" value={this.state.specificLocation} onChange={this.change}/>
                                        <Form.Text className="text-muted">
                                            Description of the physical location of the equipment.
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId='formAddGpsLatitude'>
                                    <Form.Label><b>Latitude</b></Form.Label>
                                        <Form.Control type="text" name="gpsLat" placeholder="Enter GPS Latitude" value={this.state.gpsLat} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formAddGpsLongitude'>
                                    <Form.Label><b>Longitude</b></Form.Label>
                                        <Form.Control type="text" name="gpsLng" placeholder="Enter GPS Longitude" value={this.state.gpsLng} onChange={this.change}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        <div className="text-right">
                            <Button  onChange={this.onSubmit} onClick={this.onSubmit}>Submit</Button>
                        </div>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default withRouter(AddEquipment);