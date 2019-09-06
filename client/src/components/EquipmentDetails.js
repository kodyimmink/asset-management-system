import React, { Component } from 'react';
import axios from 'axios';
import { Select, CardPanel, Button, Badge} from 'react-materialize';


const BACKEND_API = "http://localhost:5000";


const Issue = props => (
    <tr>
        <td>{props.issue.issueContent}</td>
        <td>{props.issue.issueCreatedAt}</td>
        <td>
            <Button className='blue darken-4'>Notes<Badge className='white-text'>{props.issue.notes.length}</Badge></Button></td>
        <td>
            {props.issue.issueStatus === 'Resolved' ? <Button className='green darken-4 white-text'>{props.issue.issueStatus}</Button> :
            <Button className='red darken-4 white-text'>{props.issue.issueStatus}</Button>}
        </td>
    </tr>
)


class EquipmentDetails extends Component{
    constructor(props){
        super(props);

        this.state = {
            equipmentDetails: {
                equipmentId: '',
                name: '',
                equipmentType: '',
                modelNumber: '',
                serialNumber: '',
                siteLocation: '',
                specificLocation: ''
            },
            equipmentIssues: [],
            //specific set of issues enums available on frontend?
            issueContent: '',
            issueCreatedAt: new Date(),
            //future addition, user auth and account id
            issueCreatedBy: null,
            issueClosedAt: null,
            issueClosedBy: null,
            issueStatus: '',
            noteContent: '',
            noteCreatedAt: new Date(),
            //future addition, user auth and account id
            noteCreatedBy: null            
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeIssue = this.onChangeIssue.bind(this);
        this.onChangeNoteContent = this.onChangeNoteContent.bind(this);
        this.onChangeIssueStatus = this.onChangeIssueStatus.bind(this);
        this.equipmentIssuesList = this.equipmentIssuesList.bind(this);
    }


    componentDidMount(){
        //get equipment details from backend
        axios.get(BACKEND_API + '/equipment/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                equipmentDetails: {
                    equipmentId: response.data._id,
                    name: response.data.name,
                    equipmentType: response.data.equipmentType,
                    modelNumber: response.data.modelNumber,
                    siteLocation: response.data.siteLocation,
                    specificLocation: response.data.specificLocation,
                    serialNumber: response.data.serialNumber
                }
            })
        }).catch(err => console.error(err));

        // get equipment specific issues from the backend
        axios.get(BACKEND_API + '/issues/find/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                equipmentIssues: response.data
            }, () => console.log(this.state))
        }).catch(err => console.error(err));
    }

    onChangeIssue(e){
        this.setState({
            issueContent: e.target.value
        })
    }

    onChangeIssueStatus(e){
        this.setState({
            issueStatus: e.target.value
        })
    }

    onChangeNoteContent(e){
        this.setState({
            noteContent: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const issue = {
            equipmentId: this.state.equipmentDetails.equipmentId,
            issueContent: this.state.issueContent,
            issueCreatedAt: new Date(),
            issueCreatedBy: this.state.issueCreatedBy,
            issueClosedAt: this.state.issueClosedAt,
            issueClosedBy: this.state.issueClosedBy,
            issueStatus: this.state.issueStatus,
            noteContent: this.state.noteContent,
            noteCreatedAt: this.state.noteCreatedAt,
            noteCreatedBy: this.state.noteCreatedBy
        }

        axios.post(BACKEND_API +'/issues/add', issue)
        .then(res => console.log(res.data))
        .then(this.setState({
            //clear newIssue
            issueContent: '',
            issueCreatedAt: new Date(),
            //future addition, user auth and account id
            issueCreatedBy: null,
            issueClosedAt: null,
            issueClosedBy: null,
            issueStatus: '',
            noteContent: '',
            noteCreatedAt: new Date(),
            //future addition, user auth and account id
            noteCreatedBy: null  
        }))
        .catch(err => console.error(err));
    }

    equipmentIssuesList(){
        return this.state.equipmentIssues.map( currentIssue => {
            return <Issue issue={currentIssue} deleteIssue={this.deleteIssue} key={currentIssue._id}/>
        })
    }

    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <h3>Equipment Details</h3>
                    <div className='col s6'>
                        <CardPanel className='lightGrey'>
                            <div className='card-content black-text'></div>
                                <h6><b>Name: </b>{this.state.equipmentDetails.name}</h6>
                        </CardPanel>
                    </div>
                    <div className='col s6'>
                        <CardPanel className='lightGrey'>
                            <div className='card-content black-text'></div>
                                <h6><b>Equipment Type: </b>{this.state.equipmentDetails.equipmentType}</h6>
                        </CardPanel>
                    </div>
                    <div className='col s6'>
                        <CardPanel className='lightGrey'>
                            <div className='card-content black-text'></div>
                                <h6><b>Location: </b>{this.state.equipmentDetails.siteLocation}</h6>
                        </CardPanel>
                    </div>
                    <div className='col s6'>
                        <CardPanel className='lightGrey'>
                            <div className='card-content black-text'></div>
                                <h6><b>Specific Location: </b>{this.state.equipmentDetails.specificLocation}</h6>
                        </CardPanel>
                    </div>
                
                    <h3>New Issue</h3>
                    <div className='col s12'>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12 select">
                                <label >Select Equipment Issue:</label>
                                <Select id='issueContentSelect' value={this.state.issueContent} onChange={this.onChangeIssue}>
                                    <option value="N/A">N/A</option>
                                    <option value="Heating coil not working">Heating coil not working</option>
                                    <option value="Cooling coil not working">Cooling coil not working</option>
                                    <option value="Supply Fan not working">Supply Fan not working</option>
                                    <option value="Discharge Air Temp faulted">Discharge Air Temp faulted</option>
                                </Select>
                            </div>
                            <div className="input-field col s12">
                                <label>Notes:</label>
                                <input placeholder="Notes" id='issueNotes' type="text" className="validate" value={this.state.noteContent} onChange={this.onChangeNoteContent} />
                            </div>
                            <div className="input-field col s12 select">
                                <label>Status:</label>
                                <Select value={this.state.issueStatus} onChange={this.onChangeIssueStatus}>
                                    <option value="N/A">N/A</option>
                                    <option value="Unresolved">Unresolved</option>
                                    <option value="Resolved">Resolved</option>
                                </Select>
                            </div>
                            <div className="input-field col s12">
                                <button className="btn waves-effect blue darken-4" type="submit" name="submitEquipment" onClick={this.onSubmit} >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <h3>History</h3>
                <table className='table'>
                    <thead className='thead-light'>
                        <tr>
                            <th>Issue</th>
                            <th>Created At</th>
                            <th>Notes</th>
                            <th>Status</th>
                        </tr>
                   </thead>
                   <tbody>
                       { this.equipmentIssuesList() }
                   </tbody>
               </table>
            </div>
        )
    }
}

export default EquipmentDetails;