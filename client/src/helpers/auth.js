import axios from 'axios';

class Auth {
    constructor(){
        this.authenticated = true;
    }

    login(userLogin, cb){
        console.log(userLogin)
        axios.post(process.env.REACT_APP_BACKEND_API + '/user/login', userLogin )

        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenticated;
    }
}

export default new Auth()