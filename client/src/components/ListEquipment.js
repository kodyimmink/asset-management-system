import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BACKEND_API = 'http://localhost:5000';

const Equipment = props => (
    <tr>
        <td>{props.equipment.name}</td>
        <td>{props.equipment.equipmentType}</td>
        <td>{props.equipment.modelNumber}</td>
        <td>{props.equipment.serialNumber}</td>
        <td>{props.equipment.siteLocation}</td>
        <td>{props.equipment.specificLocation}</td>
        <td>
            <Link to= {"/edit/"+props.equipment._id}>edit</Link> | <a href="#" onClick={() => {props.deleteEquipment(props.equipment._id)}}>delete</a>
        </td>
    </tr>
)

class ListEquipment extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            equipmentArray:[]
        }

        this.deleteEquipment =this.deleteEquipment.bind(this);
    }

    componentDidMount(){
        axios.get(BACKEND_API + "/equipment/listAll")
        .then(response => {
            this.setState({ equipmentArray: response.data })
        })
        .catch(err => console.error(err));
    }

    deleteEquipment(id){
        axios.delete(BACKEND_API + "/equipment/" + id)
        .then(res => console.log(res.data))
        this.setState({
            equipmentArray: this.state.equipmentArray.filter(el => el._id !== id)
        })
    }

    equipmentList(){
        return this.state.equipmentArray.map( currentEquipment => {
            return <Equipment equipment={currentEquipment} deleteEquipment={this.deleteEquipment} key={currentEquipment._id}/>
        })
    }

    render(){
        return(
            <div className="container">
               <h3>Logged Equipment</h3>
               <table className='table'>
                   <thead className='thead-light'>
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
               </table>
            </div>
        )
    }
}


export default ListEquipment;