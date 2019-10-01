import axios from 'axios';

class Auth {
    constructor(){
        this.authenticated = false;
    }

    register(newUser, cb){
        axios.post(process.env.REACT_APP_BACKEND_API + '/auth/register', newUser )
        .then(res => console.log(res))

        cb();
    }
    
    login(userLogin, cb){
        axios.post(process.env.REACT_APP_BACKEND_API + '/auth/login', userLogin )
        .then(res => {
            localStorage.setItem('auth-token', res.data.token)
            axios.defaults.headers.common['auth-token'] = res.data.token
        })

        //redux state set here
        this.authenticated = true;
        cb();
    }

    //needs work; does not check token against server
    checkLoginToken(){
        let token = localStorage.getItem('auth-token');
        if( token !== null){
            axios.defaults.headers.common['auth-token'] = token;
            this.authenticated = true;
            return true;
        }else{
            return false;
        }
    }

    logout(cb) {
        //redux state set here
        this.authenticated = false;
        cb();
    }

    //check redux state
    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth()