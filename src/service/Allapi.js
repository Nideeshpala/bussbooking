import BASE_URL from "./Baseurl"
import { commonRequest } from "./Commonrequest"

// account creation
export const registerapi = async (body) => {

    return await commonRequest('POST', `${BASE_URL}/user/register`, "", body)
}

export const loginapi = async (body) => {
    return await commonRequest('POST', `${BASE_URL}/user/login`, "", body)
}

export const addbus = async (body) => {
    return await commonRequest('POST', `${BASE_URL}/admin/addbus`, body)
}

export const getallbus = async (header) => {
    return await commonRequest('GET', `${BASE_URL}/user/buss`, header, "")
}
export const getbos = async (id, header) => {
    return await commonRequest('GET', `${BASE_URL}/user/seat/${id}`, header)
}

export const bookapi = async (body, header) => {
    return await commonRequest('POST', `${BASE_URL}/user/book`, header, body)
}

export const fetchBusSearch = async (body) => {
    return await commonRequest('POST', `${BASE_URL}/user/search`, body);
}

export const cancelticket = async (body, header) => {
    return await commonRequest('POST', `${BASE_URL}/user/cancel`, header, body)
}

export const ticketgen = async (body,header) => {
    return await commonRequest('POST', `${BASE_URL}/user/ticket`, header, body)
}

export const tableticket=async(body,header)=>{
    return await commonRequest('POST',`${BASE_URL}/user/tabletic`,header,body)
}

export const selticket=async(body,header)=>{
    return await commonRequest('POST',`${BASE_URL}/user/seltic`,header,body)
}