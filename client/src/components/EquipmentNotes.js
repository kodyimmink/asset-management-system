import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_API = "http://localhost:5000";

const Notes = props => (
    <tr>
        <td>{props.noteItem.note}</td>
        <td>{props.noteItem.dateTime}</td>
        <td><button className= 'btn waves-effect red darken-4' onClick={() => {props.deleteNote(props.noteItem._id)}}>delete</button></td>
    </tr>
)  

class EquipmentNotes extends Component{
    constructor(props){
        super(props);
    
        this.onChangeNewNote = this.onChangeNewNote.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.equipmentNotesList = this.equipmentNotesList.bind(this);
        this.deleteNote = this.deleteNote.bind(this);

        this.state = {
            name: '',
            newNote: {
                note: '',
                dateTime: new Date()
            },
            equipmentNotes: [],
            equipmentId: ''
        }    
    }

    componentDidMount(){
        //
        axios.get(BACKEND_API + '/equipment/notes/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                name: response.data.name,
                equipmentNotes: response.data.notes,
                equipmentId: this.props.match.params.id
        })
    }).catch(err => console.error(err));

    }


    onChangeNewNote(e){
        this.setState({
            newNote: {
                note: e.target.value,
                dateTime: new Date()
            }
        })
    }

    onSubmit(e){
        e.preventDefault();

        const newEquipmentNotes = {
            newNote: this.state.newNote.note,
            dateTime: new Date()
        }

        axios.post(BACKEND_API+'/equipment/addNote/' + this.props.match.params.id, newEquipmentNotes)
        .then(res => console.log(res.data))
        .catch(err => console.error(err));

        this.setState(state => {
            // const equipmentNotes = [...state.equipmentNotes, newEquipmentNotes];
        
            return {
                // equipmentNotes,
                newNote: {
                    note: '',
                    dateTime: new Date()
                }
            };
        })
    }

    deleteNote(id){
        axios.delete(BACKEND_API + "/equipment/notes/" + this.state.equipmentId + '/' + id)
        .then(res => console.log(res.data))
        this.setState({
            equipmentNotes: this.state.equipmentNotes.filter(el => el._id !== id)
        })
    }

    equipmentNotesList(){
        console.log(this.state.equipmentNotes)
        return this.state.equipmentNotes.map( noteObject => {
            return <Notes noteItem={noteObject} deleteNote={this.deleteNote} key={noteObject._id}/>
        })
    }

    render(){
        return(
            <div className='container'>
            <h3>Equipment Notes: {this.state.name}</h3>
                <div className='row'>
                    <div className='col s12'>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input placeholder="Note" id='equipmentNote' type="text" className="validate" value={this.state.newNote.note} onChange={this.onChangeNewNote} />
                                <button className= 'btn waves-effect blue darken-4'>Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className='col s12'>
                        <h4>History</h4>
                        <table className='table'>
                            <thead className='thead-light'>
                                <tr>
                                    <th>Notes</th>
                                    <th>Date Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.equipmentNotes.length > 0 ? this.equipmentNotesList() : 
                                    <tr>
                                        <td><b>No Notes</b></td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default EquipmentNotes;