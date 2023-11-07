import { api } from "@/helpers/axios"

export const resource = "personal"
export const reports = "reports"
export const documents = "documents"


const getUsers = () => {
    return api.get(`${resource}/users/`)
}
const getReportAbandoneAll = () => {
    return api.get(``)
}
const getReportById = (id) => {
    return api.get(`${reports}/kpi/` + `${id}`)
}
const getReportByIdCreator = (id) => {
    return api.get(`${reports}/kpi?` + `creator=${id}`)
}
const saveReport = (id, data) => {
    return api.put(`${reports}/kpi/${id}/update-report-file/`, data)
}
const getLastDataReports = (id) => {
    return api.get(`${reports}/kpi/${id}/get-last-on-employee/`)
}

const deleteReport = (id) => {
    return api.delete(`${reports}/kpi/` + `${id}`)
}
const deleteReportAbandon = (id) => {
    return api.delete(`${reports}/drop/` + `${id}`)
}
// const CreateReportAbandone = () => {
//     return api.post(`${reports}/drop/cs/create/`)
// }
const getFilterWafonAbadone = (format, filter) => {
    return api.get(`${reports}/drop/create-report?report_type=${format}`, { params: filter }, {timeout: 60000})
}
const GetReportAbandone = () => {
    return api.get(`${reports}/drop`)
}
const getAllgrades = () => {
    return api.get(`${reports}/kpi/total`)
}
// const postReport = () => {
//     return.post(`${resource}/`)
// }
// для личного кабинета
const getUsersLK = (id) => {
    return api.get(`${resource}/users/` + `${id}`)
}
const getManagerLK = (id) => {
    return api.get(`${resource}/users/?page_size=200&manager=` + `${id}`)
}
const getUser104 = () => {
    return api.get(`${resource}/users/104`)
}
const getAllKPI = () => {
    return api.get(`${reports}/kpi`)
}
// БДР отчеты
const createBDRreport = () => {
    return api.post(`${reports}/bdr/`)
}
const getBDRreport = () => {
    return api.get(`${reports}/bdr`)
}
const getBDRreportByID = (id) => {
    return api.get(`${reports}/bdr/` + `${id}`)
}
const putBDRreportsave = (id, data) => {
    return api.patch(`${reports}/bdr-row/update/` + `${id}`, data)
}
const saveBDRreport = (id, data) => {
    return api.get(`${reports}/bdr/${id}/save-file/`, data)
}
const changeBDRreport = (data) => {
    return api.post(`${reports}/bdr-row/update-table/`, {'data' : data})
}
// справочник контрагенты
const createCounterparties = (data) => {
    return api.post(`${resource}/counterparties/`, data)
}

// Для ключевых фактов
const getKeyFacts = () => {
    return api.get(`${reports}/key-facts/get-wagons-by-types-amount/`)
}
const getKeyFactsSpeedTon = () => {
    return api.get(`${reports}/key-facts/get-speed?wagon_type=Цистерна&data_source=Дислокации`)
}
const getKeyFactsSpeed = () => {
    return api.get(`${reports}/key-facts/get-speed?wagon_type=Полувагон&data_source=Дислокации`)
}
const getAllDataLastReportAdmin = (data) => {
    return api.get(`${reports}/kpi/get-all-last?date_begin=${data[0]}&date_end=${data[1]}`)
}

const getSpeedForWagon = (wagon_type, month) => {
    return api.get(`${reports}/key-facts/get-speed-new?wagon_type=${wagon_type}&month=${month}`)
}
// ДОГОВОРА
const createDocument = (data) => {
    return api.post(`${documents}/contract/`, data)
}
const getContractAnnex= (id) => {
    return api.get(`${documents}/contract-annex/${id}`)
}
const putContract= (id, data) => {
    return api.patch(`${documents}/contract/${id}/`, data)
}
// Финансовые отчеты
const getFinRep1= (date_begin, date_end) => {
    return api.get(`${reports}/fin/1?date_begin=${date_begin}&date_end=${date_end}`)
}
const getFinRep2= (date_begin, date_end) => {
    return api.get(`${reports}/fin/2?date_begin=${date_begin}&date_end=${date_end}`)
}

// Уведомления
const personalTasks = (id) => {
    return api.get(`${resource}/tasks/?user=${id}`)
}
export default {
    getUsers,
    getReportById,
    saveReport,
    deleteReport,
    // CreateReportAbandone,
    getFilterWafonAbadone, //замена верхнему
    GetReportAbandone,
    getAllgrades,
    getUser104,
    getAllKPI,
    deleteReportAbandon,
    getLastDataReports,
    getReportByIdCreator,
    getAllDataLastReportAdmin,
    putContract,
    // Личный кабинет 
    getUsersLK,
    getManagerLK,
    getContractAnnex,
    // БДР отчет

    createBDRreport,
    getBDRreport,
    getBDRreportByID,
    putBDRreportsave,
    saveBDRreport,
    changeBDRreport,

    // справовчник
    createCounterparties,
    createDocument,
    // Ключевые факты
    getKeyFacts,
    getKeyFactsSpeedTon,
    getKeyFactsSpeed,
    getSpeedForWagon,
    // Уведомеления
    personalTasks,

    getFinRep1,
    getFinRep2,
}