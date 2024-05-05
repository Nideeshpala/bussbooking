import axios from "axios";

export function RegisterUser(newUserDetails){
    const apiurl='http://localhost:4000/user/register'
    return axios.post(apiurl.newUserDetails,{
        headers:{
            'Content-Type':'application/json'
        }
    })
}