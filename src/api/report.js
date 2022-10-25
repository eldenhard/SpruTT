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
// для личного кабинета
const getUsersLK = (id) => {
    return api.get(`${resource}/users/`  + `${id}`)
}
const getManagerLK = (id) => {
    return api.get(`${resource}/users/?page_size=200&manager=` + `${id}`)
}


// БДР отчеты
const createBDRreport = () => {
    return api.post(`${reports}/bdr/create/`)
}
const getBDRreport = () => {
    return api.get(`${reports}/bdr`)
}
const getBDRreportByID = () => {
    return api.get(`${reports}/bdr/` + `32`)
}
export default {
    getUsers,
    getReportById,
    saveReport,
    deleteReport,
    CreateReportAbandone,
    GetReportAbandone,

    // Личный кабинет 
    getUsersLK,
    getManagerLK,

    // БДР отчет
    createBDRreport,
    getBDRreport,
    getBDRreportByID
}