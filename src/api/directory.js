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
const getDirectoryFarm = (filter_farms) => {
    return api.get(`${documents}/contract/?category=Общехозяйственные`,  {params: filter_farms})
}
const getDirectoryRenovation = (filter_renovation) => {
    return api.get(`${documents}/contract/?category=Ремонтные`,  {params: filter_renovation})
}
const getDirectoryBuyer = (filter_buyer) => {
    return api.get(`${documents}/contract/?category=С+Покупателями`,  {params: filter_buyer})
}
const getDirectoryProvider = (filter_provider) => {
    return api.get(`${documents}/contract/?category=С+Поставщиками`,  {params: filter_provider})
}
const getDirectoryFinance = (filter_finance) => {
    return api.get(`${documents}/contract/?category=Финансовые`,  {params: filter_finance})
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
    // Телеграммы
    getNumberDog
}

