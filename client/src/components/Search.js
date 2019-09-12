import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const BACKEND_API = "http://localhost:5000";

const SearchResult = props => (
    <ListGroup.Item>
    <span>
        <Link to={"/equipmentDetails/"+props.searchItem._id}><b>{props.searchItem.name}</b></Link>
        <Link to={"/site/"+ props.searchItem.siteId}><b> @ {props.searchItem.siteLocation}</b></Link>
    </span>
       
    </ListGroup.Item>
)

class Search extends Component{
    constructor(props){
        super(props);

        this.state = {
            searchTerm: '',
            searchResult: []
        }

        this.onChangeSearchTerm = this.onChangeSearchTerm.bind(this);
        this.searchResultsList = this.searchResultsList.bind(this);
    }

    onChangeSearchTerm(e){
        this.setState({
            searchTerm: e.target.value
        }, () => {
            if(this.state.searchTerm !== ''){
                axios.get(BACKEND_API + '/search/' + this.state.searchTerm)
                .then(response => {
                this.setState({
                    searchResult: response.data
                })
            })
            }
        })
    }

    searchResultsList(){
        return this.state.searchResult.map( searchItem => {
            return <SearchResult searchItem={searchItem} key={searchItem._id}/>
        })
    }

    render(){
        return(
            <Container>
                <Form onSubmit={this.onSubmitSearch}>
                    <Form.Group className="mb-2 mr-sm-2 mb-sm-2">
                    <Form.Label><b>Search</b></Form.Label>
                        <Form.Control type="text" value={this.state.searchTerm} onChange={this.onChangeSearchTerm} placeholder="Search..."></Form.Control>
                    </Form.Group>
                </Form>
                <ListGroup>
                    { this.state.searchResult.length !== 0 ? this.searchResultsList() : '' }
                </ListGroup>
            </Container>
        )
    }
}

export default Search;
