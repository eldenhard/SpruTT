import {api} from "@/helpers/axios"

export const resource = "personal" 
export const reports = "reports"

const getUsers = () => {
    return api.get(`${resource}/users/`)
}

const getReportById = (id) => {
    return api.get(`${reports}/kpi/` + `${id}`)
}

const saveReport = (id, data) => {
    return api.put(`${reports}/kpi/update/` + `${id}`, data)
}

const deleteReport = (id) => {
    return api.delete(`${reports}/kpi/delete/` + `${id}`)
}

const CreateReportAbandone = () => {
    return api.post(`${reports}/drop/cs/create/`)
}
const GetReportAbandone = () => {
    return api.get(`${reports}/drop`)
}
// const postReport = () => {
//     return.post(`${resource}/`)
// }

export default {
    getUsers,
    getReportById,
    saveReport,
    deleteReport,
    CreateReportAbandone,
    GetReportAbandone
}