import { userTypes } from "./user.types"
import axios from 'axios';


export const userLogin = (userData) => { 

    console.log('inside login action');
    
    const user = axios.post('/api/users/login',userData).then(data => console.log(data)).catch(err => console.log(err));
    
    return {
    type:userTypes.USER_LOGIN,
    payload:userData
}

}