import React, { Component } from 'react';
import axios from 'axios';
import {Button, Badge, Container, Form, Table, Modal } from 'react-bootstrap';


const BACKEND_API = "http://localhost:5000";


const Issue = props => (
    <tr>
        <td>{props.issue.issueContent}</td>
        <td>{props.issue.issueCreatedAt}</td>
        <td>{props.issue.issueClosedAt}</td>
        <td>
            <Button variant="primary" size="sm" onClick={ ()=> {props.setModalNotes(props.issue.notes)}}> Notes <Badge variant="light">{props.issue.notes.length}</Badge>
                <span className="sr-only">notes count</span>
            </Button>
        </td>
        <td>
            {props.issue.issueStatus === 'Resolved' ? <Badge variant="success">{props.issue.issueStatus}</Badge> :
            <Badge variant="danger">{props.issue.issueStatus}</Badge>}
        </td>
    </tr>
)

const Note = props => (
    <tr>
        <td>{props.note.note}</td>
        <td>{props.note.noteCreatedAt}</td>
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
            noteCreatedBy: null,
            showModal: false,
            focusedNotes: []
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeIssue = this.onChangeIssue.bind(this);
        this.onChangeNoteContent = this.onChangeNoteContent.bind(this);
        this.onChangeIssueStatus = this.onChangeIssueStatus.bind(this);
        this.equipmentIssuesList = this.equipmentIssuesList.bind(this);
        this.setModalNotes = this.setModalNotes.bind(this);
        this.generateNotesList = this.generateNotesList.bind(this);
        this.handleModal = this.handleModal.bind(this);
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

    handleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    setModalNotes(notes){
        this.handleModal()
        this.setState({
            focusedNotes: notes
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
            return <Issue issue={currentIssue} setModalNotes={this.setModalNotes} key={currentIssue._id}/>
        })
    }

    generateNotesList(){
        return this.state.focusedNotes.map( currentNote => {
            return <Note note={currentNote} key={currentNote._id}/>
        })
    }


    render(){
        return(
            <Container>
            <h2>Equipment Details</h2>
                <div className='col s12'>
                    <h6><b>Name: </b>{this.state.equipmentDetails.name}</h6>
                    <h6><b>Equipment Type: </b>{this.state.equipmentDetails.equipmentType}</h6>
                    <h6><b>Site Location: </b>{this.state.equipmentDetails.siteLocation}</h6>
                    <h6><b>Specific Location: </b>{this.state.equipmentDetails.specificLocation}</h6>
                    <h6><b>Model Number: </b>{this.state.equipmentDetails.modelNumber}</h6>
                    <h6><b>Serial Number: </b>{this.state.equipmentDetails.serialNumber}</h6>
                </div>
            <br/>
            <h2>New Issue</h2>
                <div className='col s12'>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formAddEquipmentType">
                        <Form.Label><b>Equipment Issue</b></Form.Label>
                            <Form.Control as="select" value={this.state.issueContent} onChange={this.onChangeIssue}>
                                <option value="N/A">N/A</option>
                                <option value="Heating coil not working">Heating coil not working</option>
                                <option value="Cooling coil not working">Cooling coil not working</option>
                                <option value="Supply Fan not working">Supply Fan not working</option>
                                <option value="Discharge Air Temp faulted">Discharge Air Temp faulted</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formAddIssueNotes'>
                            <Form.Label><b>Notes</b></Form.Label>
                                <Form.Control type="text" placeholder="Enter issue notes" value={this.state.noteContent} onChange={this.onChangeNoteContent}/>
                                <Form.Text className="text-muted">
                                    Detailed description of the issue.
                                </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formAddIssueStatus">
                        <Form.Label><b>Status</b></Form.Label>
                            <Form.Control as="select" value={this.state.equipmentType} onChange={this.onChangeEquipmentType}>
                                <option value="N/A">N/A</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Unresolved">Unresolved</option>
                                
                            </Form.Control>
                        </Form.Group>
                        <div className="text-right">
                            <Button as="input" type="submit" onChange={this.onSubmit} onClick={this.onSubmit} value="Submit" />
                        </div>
                        </Form>
                    </div>
                <h3>History</h3>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Issue</th>
                            <th>Created At</th>
                            <th>Closed At</th>
                            <th>Notes</th>
                            <th>Status</th>
                        </tr>
                   </thead>
                   <tbody>
                       { this.equipmentIssuesList() }
                   </tbody>
               </Table>
                <Modal centered show={this.state.showModal} onHide={this.handleModal}>
                    <Modal.Body>
                        <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Note</th>
                                <th>Date Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.focusedNotes !== 'undefined' ? this.generateNotesList() : ''}
                        </tbody>
                        </Table>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default EquipmentDetails;