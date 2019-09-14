import React from 'react';
import MicrosoftLogin from 'react-microsoft-login';
import { withRouter } from 'react-router-dom'
import auth from '../classes/auth';

const MS_CLIENT = process.env.REACT_APP_MS_CLIENT;

const Login = props => {
    const authHandler = (err, data) => {
        console.log(err, data)
        auth.login( () => {
            props.history.push("/home")
          })
    }


    return(
        <MicrosoftLogin
            clientId= {MS_CLIENT}
            authCallback={authHandler}
            buttonTheme={'light_short'}
            />
    )
}

export default withRouter(Login);