import React, { Component } from 'react';
import axios from 'axios';

const BACKEND_API = "http://localhost:5000";

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
            issueNoteContent: '',
            issueNoteCreatedAt: new Date(),
            //future addition, user auth and account id
            issueNoteCreatedBy: null            
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeIssue = this.onChangeIssue.bind(this);
        this.onChangeIssueNoteContent = this.onChangeIssueNoteContent.bind(this);
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

    onChangeIssueNoteContent(e){
        this.setState({
            issueNoteContent: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();

        const issue = {
            equipmentId: this.state.equipmentDetails.equipmentId,
            issue: this.state.issueContent,
            created_at: new Date(),
            created_by: this.state.issueCreatedBy,
            closed_at: this.state.issueClosedAt,
            closed_by: this.state.issueClosedBy,
            status: this.state.issueStatus,
            issueNoteContent: this.state.issueNoteContent,
            issueNoteCreatedAt: this.state.issueNoteCreatedAt,
            issueNoteCreatedBy: this.state.issueNoteContentBy
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
            issueNoteContent: '',
            issueNoteCreatedAt: new Date(),
            //future addition, user auth and account id
            issueNoteCreatedBy: null  
        }))
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div className='container'>
            <h3>New Issue</h3>
                <div className='row'>
                    <div className='col s12'>
                        <form onSubmit={this.onSubmit}>
                            <div className="input-field col s12 select">
                                <label>Select Equipment Issue:</label>
                                <select value={this.state.issueContent} onChange={this.onChangeIssue}>
                                    <option value="Heating coil not working">Heating coil not working</option>
                                    <option value="Cooling coil not working">Cooling coil not working</option>
                                    <option value="Supply Fan not working">Supply Fan not working</option>
                                    <option value="Discharge Air Temp faulted">Discharge Air Temp faulted</option>
                                </select>
                            </div>
                            <div className="input-field col s12">
                                <input placeholder="Notes" id='issueNotes' type="text" className="validate" value={this.state.issueNoteContent} onChange={this.onChangeIssueNoteContent} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EquipmentDetails;