import React, { Component } from 'react';
import axios from 'axios';

import {Button, Container, Col, Form, Row} from 'react-bootstrap';

const BACKEND_API = "http://localhost:5000";


const SiteItem = props => (
    <option value={props.site.siteLocation}>{props.site.siteLocation}</option>
)

class AddEquipment extends Component{
    constructor(props){
        super(props);
    
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEquipmentType = this.onChangeEquipmentType.bind(this);
        this.onChangeModelNumber = this.onChangeModelNumber.bind(this);
        this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
        this.onChangeSiteLocation = this.onChangeSiteLocation.bind(this);
        this.onChangeLat = this.onChangeLat.bind(this);
        this.onChangeLng = this.onChangeLng.bind(this);
        this.onChangeSpecificLocation = this.onChangeSpecificLocation.bind(this);
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

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeEquipmentType(e){
        this.setState({
            equipmentType: e.target.value
        })
    }

    onChangeModelNumber(e){
        this.setState({
            modelNumber: e.target.value
        })
    }

    onChangeSerialNumber(e){
        this.setState({
            serialNumber: e.target.value
        })
    }

    onChangeLat(e){
        this.setState({
            gpsLat: e.target.value
        })
    }

    onChangeLng(e){
        this.setState({
            gpsLng: e.target.value
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

    onChangeSpecificLocation(e){
        this.setState({
            specificLocation: e.target.value
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

        console.log(equipment);

        window.location = '/site/' +this.state.siteId;

        axios.post(BACKEND_API+'/equipment/add', equipment)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
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
                                    <Form.Control type="text" placeholder="Enter equipment name" value={this.state.name} onChange={this.onChangeName}/>
                                    <Form.Text className="text-muted">
                                        General or common name used to identify the equipment.
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddEquipmentType">
                                <Form.Label><b>Equipment Type</b></Form.Label>
                                    <Form.Control as="select" value={this.state.equipmentType} onChange={this.onChangeEquipmentType}>
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
                                        <Form.Control type="text" placeholder="Enter equipment model number" value={this.state.modelNumber} onChange={this.onChangeModelNumber}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formAddEquipmentModelNumber'>
                                    <Form.Label><b>Serial Number</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter equipment serial number" value={this.state.serialNumber} onChange={this.onChangeSerialNumber}/>
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
                                        <Form.Control type="text" placeholder="Enter equipment name" value={this.state.specificLocation} onChange={this.onChangeSpecificLocation}/>
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
                                        <Form.Control type="text" placeholder="Enter GPS Latitude" value={this.state.gpsLat} onChange={this.onChangeLat}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId='formAddGpsLongitude'>
                                    <Form.Label><b>Longitude</b></Form.Label>
                                        <Form.Control type="text" placeholder="Enter GPS Longitude" value={this.state.gpsLng} onChange={this.onChangeLng}/>
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

export default AddEquipment;