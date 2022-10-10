import {api} from "@/helpers/axios"

export const resource = "personal" 

const getUsers = () => {
    return api.get(`${resource}/users/`)
}

// const postReport = () => {
//     return.post(`${resource}/`)
// }

export default {
    getUsers
}