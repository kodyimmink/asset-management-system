import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_API = "http://localhost:5000";


const Issue = props => (
    <div className="card-panel lightGrey">
        <div className="card-content black-text">
            <p><b>Issue: </b>{props.issue.issueContent}</p>
            <p><b>Created At: </b>{props.issue.issueCreatedAt}</p>
            <p><b>Note: </b>{props.issue.notes[0].note}</p>
            <p><b>Created At: </b>{props.issue.noteCreatedAt}</p>
            
        </div>
    </div>
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
                    <h3>New Issue</h3>
                    <div className='col s12'>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12 select">
                                <label>Select Equipment Issue:</label>
                                <select value={this.state.issueContent} onChange={this.onChangeIssue}>
                                    <option value="N/A">N/A</option>
                                    <option value="Heating coil not working">Heating coil not working</option>
                                    <option value="Cooling coil not working">Cooling coil not working</option>
                                    <option value="Supply Fan not working">Supply Fan not working</option>
                                    <option value="Discharge Air Temp faulted">Discharge Air Temp faulted</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <label>Notes:</label>
                                <input placeholder="Notes" id='issueNotes' type="text" className="validate" value={this.state.noteContent} onChange={this.onChangeNoteContent} />
                            </div>
                            <div className="input-field col s12 select">
                                <label>Status:</label>
                                <select value={this.state.issueStatus} onChange={this.onChangeIssueStatus}>
                                    <option value="N/A">N/A</option>
                                    <option value="Unresolved">Unresolved</option>
                                    <option value="Resolved">Resolved</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <button className="btn waves-effect blue darken-4" type="submit" name="submitEquipment" onClick={this.onSubmit} >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className='row'>
                <h3>History</h3>
                    <div className='col s12'>
                        { this.equipmentIssuesList()}
                    </div>
        
                </div>
            </div>
        )
    }
}

export default EquipmentDetails;