import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Table } from 'react-bootstrap';

const BACKEND_API = "http://localhost:5000";

const Equipment = props => (
    <tr>
        <td>{props.equipment.name}</td>
        <td>{props.equipment.equipmentType}</td>
        <td>{props.equipment.modelNumber}</td>
        <td>{props.equipment.serialNumber}</td>
        <td>{props.equipment.siteLocation}</td>
        <td>{props.equipment.specificLocation}</td>
        <td>
            <Link className="btn btn-primary btn-sm" to={"/editEquipment/"+props.equipment._id}>Edit</Link>
        </td>
        <td>
            <Button variant="danger" size="sm" onClick={() => {props.deleteEquipment(props.equipment._id)}}>X</Button>
        </td>
        <td>
            <Link className="btn btn-dark btn-sm" to={"/equipmentDetails/"+props.equipment._id}>Details</Link>
        </td>
    </tr>
)

class Site extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            siteLocation: '',
            siteAddress: '',
            equipmentDetailsList: []
        }

        //function bind this here
        this.deleteEquipment = this.deleteEquipment.bind(this);
    }

    deleteEquipment(id){
        axios.delete(BACKEND_API + "/equipment/" + id)
        .then(res => console.log(res.data))
        this.setState({
            equipmentDetailsList: this.state.equipmentDetailsList.filter(el => el._id !== id)
        })
    }


    //I think this is okay? Refactor later?
    componentDidMount(){
        axios.get(BACKEND_API + "/site/" + this.props.match.params.id)
        .then(response => {
            this.setState({ 
                    siteLocation: response.data.siteLocation,
                    siteAddress: response.data.siteAddress
                }, () => {
                    const siteId = {
                        siteId: this.props.match.params.id
                    }
                    axios.post(BACKEND_API + '/equipment/getEquipmentDetails', siteId)
                    .then(res => {
                        this.setState({
                        equipmentDetailsList: res.data
                    })})
                })
        })
        .catch(err => console.error(err));
    }

    equipmentList(){
        return this.state.equipmentDetailsList.map( currentEquipment => {
            return <Equipment equipment={currentEquipment} deleteEquipment={this.deleteEquipment} key={currentEquipment._id}/>
        })
    }

    render(){
        return(
            <Container>
                <h2>Site Equipment: {this.state.siteLocation}</h2>
                <div className='col s12'>
                    <Table striped bordered hover size="sm">
                        <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Equipment Type</th>
                                    <th>Model Number</th>
                                    <th>Serial Number</th>
                                    <th>Site Location</th>
                                    <th>Specific Location</th>
                                </tr>
                        </thead>
                        <tbody>
                            { this.equipmentList() }
                        </tbody>
                    </Table>
               </div>
            </Container>
        )
    }
}

export default Site;