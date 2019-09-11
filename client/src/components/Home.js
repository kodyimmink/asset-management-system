import React, { Component } from 'react';
import Search from '../components/Search';
import AddSite from '../components/AddSite';
import { Container } from 'react-bootstrap'


class Home extends Component{

    render(){
        return(
            <Container>
                <h2 className='center'>Home</h2>
                <Search/>
                <AddSite/>
            </Container>
        )
    }
}

export default Home;