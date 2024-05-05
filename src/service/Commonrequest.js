import axios from "axios"

export const commonRequest = async (method,url,body) => {

    let config = {
        method,
        url,
        data:body
    }
    return axios(config).then(response => {
        console.log(response);
        return response
    }).catch(err => {
        console.log(err);
        return err
    })

}   