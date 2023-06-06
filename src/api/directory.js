import {api} from '@/helpers/axios'

export const resource = 'personal'
export const documents = 'documents'
export const finance = 'finance'

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


// Ставки по аренде
const postSaveMany = ( data) => {
    return api.post(`${finance}/stavki-arenda/save-many/` ,data)
}

const getAllArendaDataStavka = (filter_arendaData) => {
    return api.get(`${finance}/stavki-arenda/?`,  {params: filter_arendaData})
}
const getAllArendaDataStavkaPage = (filter_arendaData, page_size, page_number) => {
    return api.get(`${finance}/stavki-arenda/?page_size=${page_size}&page=${page_number}`,   {params: filter_arendaData})
}
const patchStavkiArenda = (id, data) => {
    return api.patch(`${finance}/stavki-arenda/${id}/`, data)
}
const deleteStavkiArenda = (id) => {
    return api.delete(`${finance}/stavki-arenda/${id}/`)
}
const postPenaltyStandards = (data) => {
    return api.post(`${finance}/penalty-standards/`, data)
}
const getStandard = (data) => {
    return api.get(`${finance}/penalty-standards/`,  {params: data})
}
const patchStandard = (id, data) => {
    return api.patch(`${finance}/penalty-standards/${id}/`, data)
}
const deleteStandard = (id) => {
    return api.delete(`${finance}/penalty-standards/${id}/`)
}
const getAllArendaDataStandard = (filter_arendaData, page_size, page_number) => {
    return api.get(`${finance}/penalty-standards/?page_size=${page_size}&page=${page_number}`,   {params: filter_arendaData})
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
    getNumberDog,

    // Ставки по аренде
    postSaveMany,
    getAllArendaDataStavka,
    getAllArendaDataStavkaPage,
    patchStavkiArenda,
    deleteStavkiArenda,
    postPenaltyStandards,

    // Нормативы
    getStandard,
    patchStandard,
    deleteStandard,
    getAllArendaDataStandard,
}

