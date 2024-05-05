import BASE_URL from "./Baseurl"
import { commonRequest } from "./Commonrequest"

// account creation
export const registerapi = async (body) => {

    return await commonRequest('POST',`${BASE_URL}/user/register`,body)

}

export const loginapi=async(body)=>{
    return await commonRequest('POST',`${BASE_URL}/user/login`,body)
}

export const addbus=async(body)=>{
    return await commonRequest('POST',`${BASE_URL}/admin/addbus`,body)
}

export const getallbus=async()=>{
    return await commonRequest('GET',`${BASE_URL}/user/buss`,"")
}
export const getbos=async(id)=>{
    return await commonRequest('GET',`${BASE_URL}/user/seat/${id}`,"")
}

export const bookapi=async(body)=>{
    return await commonRequest('POST',`${BASE_URL}/user/book`,body)
}