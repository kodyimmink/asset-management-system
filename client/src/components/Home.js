import React, { Component } from 'react';
import Search from '../components/Search';
import { Container } from 'react-bootstrap'


class Home extends Component{

    render(){
        return(
            <Container>
                <h2 className='center'>Home</h2>
                <Search/>
            </Container>
        )
    }
}

export default Home;