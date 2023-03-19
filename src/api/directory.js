import {api} from '@/helpers/axios'

export const resource = 'personal'
export const documents = 'documents'

const getAllcounterparties = (filter_directory) => {
    return api.get(`${resource}/counterparties`, {params: filter_directory})
}
const putCounterparties = (id, data) => {
    return api.put(`${resource}/counterparties/update/` + `${id}`, data)
}


// типы договоров
const getDirectoryFarm = (category, filter_farms) => {
    return api.get(`${documents}/contract/?category=${category}`,  {params: filter_farms})
}
const getDirectoryRenovation = (filter_renovation) => {
    return api.get(`${documents}/contract/?category=repair`,  {params: filter_renovation})
}
const getDirectoryBuyer = (filter_buyer) => {
    return api.get(`${documents}/contract/?category=buyer`,  {params: filter_buyer})
}
const getDirectoryProvider = (filter_provider) => {
    return api.get(`${documents}/contract/?category=other `,  {params: filter_provider})
}
const getDirectoryFinance = (filter_finance) => {
    return api.get(`${documents}/contract/?category=financial`,  {params: filter_finance})
}





const getNumberDog = (url) => {
    return api.get(`${url}`)
}
const deleteCurrentContract = (id) => {
    return api.delete(`${documents}/contract/${id}`)
}
const deleteCurrentAnnex = (id) => {
    return api.delete(`${documents}/contract-annex/${id}`)
}
const CreateCurrentAnnex = (data) => {
    return api.post(`${documents}/contract-annex/`, data)
}
const ChangeCurrentAnnex = (id,data) => {
    return api.put(`${documents}/contract-annex/${id}/`, data)
}
const getCurrentContract= (id) => {
    return api.get(`${documents}/contract/${id}/`)
}
export default {
    getAllcounterparties,
    putCounterparties,
    getDirectoryFarm,
    getDirectoryRenovation,
    getDirectoryBuyer,
    getDirectoryProvider,
    getDirectoryFinance,
    deleteCurrentContract,
    deleteCurrentAnnex,
    CreateCurrentAnnex,
    ChangeCurrentAnnex,
    getCurrentContract,
    // Телеграммы
    getNumberDog
}

