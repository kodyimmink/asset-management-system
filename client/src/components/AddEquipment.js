import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_API = "http://localhost:5000";

class AddEquipment extends Component{
    constructor(props){
        super(props);
    
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEquipmentType = this.onChangeEquipmentType.bind(this);
        this.onChangeModelNumber = this.onChangeModelNumber.bind(this);
        this.onChangeSerialNumber = this.onChangeSerialNumber.bind(this);
        this.onChangeSiteLocation = this.onChangeSiteLocation.bind(this);
        this.onChangeSpecificLocation = this.onChangeSpecificLocation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            equipmentType: '',
            modelNumber: '',
            serialNumber: '',
            siteLocation: '',
            specificLocation: ''
        }    
    }

    componentDidMount(){
        //
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

    onChangeSiteLocation(e){
        this.setState({
            siteLocation: e.target.value
        })
    }

    onChangeSpecificLocation(e){
        this.setState({
            specificLocation: e.target.value
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
            specificLocation: this.state.specificLocation
        }

        console.log(equipment);

        //window.location = '/listEquipment';

        axios.post(BACKEND_API+'/equipment/add', equipment)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div className='container'>
            <h3>Create New Equipment</h3>
                <div className='row'>
                    <div className='col s12'>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12 ">
                                <input placeholder="Name" id='equipmentName' type="text" className="validate" value={this.state.name} onChange={this.onChangeName} />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Equipment Type" type="text" className="input-field col s12" value={this.state.equipmentType} onChange={this.onChangeEquipmentType} />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Model Number" type="text" className="input-field col s12" value={this.state.modelNumber} onChange={this.onChangeModelNumber} />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Serial Number" type="text" className="input-field col s12" value={this.state.serialNumber} onChange={this.onChangeSerialNumber} />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Site Location" type="text" className="input-field col s12" value={this.state.siteLocation} onChange={this.onChangeSiteLocation} />
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Specific Location" type="text" className="input-field col s12" value={this.state.specificLocation} onChange={this.onChangeSpecificLocation} />
                            </div>
                            <div className="input-field col s12">
                                <button className="btn waves-effect blue darken-4" type="submit" name="submitEquipment" onClick={this.onSubmit} >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddEquipment;