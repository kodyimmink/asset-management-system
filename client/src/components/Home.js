import React, { Component } from 'react';
import Search from '../components/Search';


class Home extends Component{

    render(){
        return(
            <div className='container'>
                <h2 className='center'>Home</h2>
                <Search/>
            </div>
        )
    }
}

export default Home;