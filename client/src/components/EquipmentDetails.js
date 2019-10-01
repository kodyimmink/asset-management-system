import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button, Badge, Container, Col, Row, Form, Table, Modal } from 'react-bootstrap';
import EquipmentMapContainer from './EquipmentMapContainer';


const BACKEND_API = "http://localhost:5000";


const Issue = props => (
    <tr>
        <td>{props.issue.issueContent}</td>
        <td>{props.issue.issueCreatedAt}</td>
        <td>{props.issue.issueClosedAt}</td>
        <td>
            <div className="parent">
                <Button className="children" variant="primary" size="sm" onClick={ ()=> {props.setModalNotes(props.issue.notes)}}> Notes <Badge variant="light">{props.issue.notes.length}</Badge>
                    <span className="sr-only">notes count</span>
                </Button>
                <Button className="children" variant="primary" size="sm" onClick={ ()=> {props.setIssueNoteId(props.issue._id)}}>+</Button>
            </div>
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
                specificLocation: '',
                gpsLat: '',
                gpsLng: ''
                
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
            focusedNotes: [],
            issueNoteId: '',
            showNewNoteModal: false,
            newNoteContent: '',
        }
        
        this.onSubmit = this.onSubmit.bind(this);
        this.equipmentIssuesList = this.equipmentIssuesList.bind(this);
        this.setModalNotes = this.setModalNotes.bind(this);
        this.generateNotesList = this.generateNotesList.bind(this);
        this.handleModal = this.handleModal.bind(this);
        this.setIssueNoteId = this.setIssueNoteId.bind(this);
        this.handleNewNoteModal = this.handleNewNoteModal.bind(this);
        this.change = this.change.bind(this);
        this.onSubmitNewNote = this.onSubmitNewNote.bind(this);
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
                    serialNumber: response.data.serialNumber,
                    gpsLat: response.data.gpsLat,
                    gpsLng: response.data.gpsLng
                    
                }
            })
        }).catch(err => console.error(err));

        // get equipment specific issues from the backend
        axios.get(BACKEND_API + '/issues/find/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                equipmentIssues: response.data
            })
        }).catch(err => console.error(err));
    }

    change(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    setIssueNoteId(id){
        this.handleNewNoteModal()
        this.setState({
            issueNoteId: id,
        })
    }

    handleModal(){
        this.setState({
            showModal: !this.state.showModal
        })
    }

    handleNewNoteModal(){
        this.setState({
            showNewNoteModal: !this.state.showNewNoteModal
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

    onSubmitNewNote(e){
        e.preventDefault();

        const newNote = {
            note: this.state.newNoteContent,
            noteCreatedAt: new Date(),
            noteCreatedBy: this.state.noteCreatedBy
        }

        axios.post(BACKEND_API + '/issues/notes/add/' + this.state.issueNoteId, newNote)
        .then(res => console.log(res.data))
        .then(

        axios.get(BACKEND_API + '/issues/find/' + this.props.match.params.id)
        .then(response => {
            this.setState({
                equipmentIssues: response.data
            }, () => this.setState({
                        showNewNoteModal: false,
                        newNoteContent: '',
            }))
        }).catch(err => console.error(err))
        )
    }

    equipmentIssuesList(){
        return this.state.equipmentIssues.map( currentIssue => {
            return <Issue issue={currentIssue} setIssueNoteId={this.setIssueNoteId} setModalNotes={this.setModalNotes} key={currentIssue._id}/>
        })
    }

    generateNotesList(){
        return this.state.focusedNotes.map( currentNote => {
            return <Note note={currentNote} key={currentNote._id}/>
        })
    }

    singleEquipmentArray = []


    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <h2>Details</h2>
                        <div className='col s12'>
                            <h6><b>Name: </b>{this.state.equipmentDetails.name}</h6>
                            <h6><b>Equipment Type: </b>{this.state.equipmentDetails.equipmentType}</h6>
                            <h6><b>Site Location: </b>{this.state.equipmentDetails.siteLocation}</h6>
                            <h6><b>Specific Location: </b>{this.state.equipmentDetails.specificLocation}</h6>
                            <h6><b>Model Number: </b>{this.state.equipmentDetails.modelNumber}</h6>
                            <h6><b>Serial Number: </b>{this.state.equipmentDetails.serialNumber}</h6>
                            <h6><b>Latitude: </b>{this.state.equipmentDetails.gpsLat}</h6>
                            <h6><b>Longitude </b>{this.state.equipmentDetails.gpsLng}</h6>
                            <Link className="btn btn-dark btn-sm" to={"/editEquipment/"+this.state.equipmentDetails.equipmentId}>Edit</Link>
                        </div>
                    </Col>
                    <Col>
                        <h2>Location</h2>
                        { this.state.equipmentDetails.gpsLat !== '' ? 
                            <EquipmentMapContainer zoom={18} centerMap={{lat: this.state.equipmentDetails.gpsLat, lng: this.state.equipmentDetails.gpsLng}} equipmentDetails={this.state.equipmentDetails}/>
                        :''}
                        
                    </Col>
                </Row>
            <br/>
            <h2>New Issue</h2>
                <div className='col s12'>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formAddEquipmentType">
                        <Form.Label><b>Equipment Issue</b></Form.Label>
                            <Form.Control as="select" name="issueContent" value={this.state.issueContent} onChange={this.change}>
                                <option value="N/A">N/A</option>
                                <option value="Heating coil not working">Heating coil not working</option>
                                <option value="Cooling coil not working">Cooling coil not working</option>
                                <option value="Supply Fan not working">Supply Fan not working</option>
                                <option value="Discharge Air Temp faulted">Discharge Air Temp faulted</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='formAddIssueNotes'>
                            <Form.Label><b>Notes</b></Form.Label>
                                <Form.Control type="text" name="noteContent" placeholder="Enter issue notes" value={this.state.noteContent} onChange={this.change}/>
                                <Form.Text className="text-muted">
                                    Detailed description of the issue.
                                </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formAddIssueStatus">
                        <Form.Label><b>Status</b></Form.Label>
                            <Form.Control as="select" name="issueStatus" value={this.state.issueStatus} onChange={this.change}>
                                <option value="N/A">N/A</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Unresolved">Unresolved</option>
                                
                            </Form.Control>
                        </Form.Group>
                        <div className="text-right">
                            <Button onChange={this.onSubmit} onClick={this.onSubmit} value="Submit">Submit</Button>
                        </div>
                        </Form>
                    </div>
                <h2>History</h2>
                <div className='col s12'>
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
               </div>
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
                
                <Modal centered show={this.state.showNewNoteModal} onHide={this.handleNewNoteModal}>
                    <Modal.Body>
                        <Form onSubmit={this.onSubmitNewNote}>
                            <Form.Group controlId='formAddIssueNotes'>
                                <Form.Label><b>New Note</b></Form.Label>
                                    <Form.Control type="text" as="textarea" name="newNoteContent" placeholder="Enter issue notes" value={this.state.newNoteContent} onChange={this.change}/>
                                    <Form.Text className="text-muted">
                                        Detailed description of the issue.
                                    </Form.Text>
                            </Form.Group>
                            <Form.Check 
                                type="checkbox"
                                id="formIssueIsResolved"
                                label="Issue Resolved"
                                onClick={(e) => console.log(e.target.value)}
                            />
                            <div className="text-right">
                                <Button as="input" type="submit" onChange={this.onSubmitNewNote} onClick={this.onSubmitNewNote} value="Submit" />
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        )
    }
}

export default EquipmentDetails;