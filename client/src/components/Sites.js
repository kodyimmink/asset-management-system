import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Jumbotron, Accordion, Button } from 'react-bootstrap';
import AddSite from './AddSite';

const BACKEND_API = "http://localhost:5000";

const divStyle = {
    color: 'white',
    backgroundImage: 'url(https://placeimg.com/1000/480/nature)',
  };

const SiteItem = props => (
    <Jumbotron style={divStyle}>
        <h3>{props.site.siteLocation}</h3>
        <h5>{props.site.siteStreetAddress}, {props.site.siteState} {props.site.siteZipCode}</h5>
        <Link className="btn btn-primary btn-sm" to={"/site/"+props.site._id}>Site Equipment</Link>
    </Jumbotron>
)

class Sites extends Component{
    constructor(props){
        super(props);
    
        this.state = {
            sitesList: []
        }

        this.sitesList = this.sitesList.bind(this);
    }

    componentDidMount(){
        axios.get(BACKEND_API + "/site/listAll")
        .then(response => {
            this.setState({ 
                sitesList: response.data
                })
        })
        .catch(err => console.error(err));
    }

    sitesList(){
        return this.state.sitesList.map( currentSite => {
            return <SiteItem site={currentSite} key={currentSite._id}/>
        })
    }

    render(){
        return(
            <Container>
                <h2>Add Site</h2>
                <Accordion>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                        <h6 className="btn btn-primary btn-sm">Add Site</h6>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <AddSite/>
                    </Accordion.Collapse>
                    
                </Accordion>
                <h2>Existing Sites</h2>
                {this.state.sitesList.length !== 0 ? this.sitesList() : ''}
            </Container>
        )
    }
}

export default Sites;