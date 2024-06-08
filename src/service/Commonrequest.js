import axios from "axios"

export const commonRequest = async (method,url,header,body) => {

    let config = {

        method,
        url,
        headers: header ? header : { "Content-Type": "application/json" },
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