import {api} from "@/helpers/axios"

export const resource = "personal" 

const login = data => {
    return api.post(`${resource}/login/`, data)
}

export default {
    login
}