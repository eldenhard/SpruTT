import {api} from '@/helpers/axios'

export const resource = 'personal'
export const documents = 'documents'
export const finance = 'finance'

const getAllcounterparties = (filter_directory) => {
    return api.get(`${resource}/counterparties`, {params: filter_directory})
}
const putCounterparties = (id, data) => {
    return api.patch(`${resource}/counterparties/update/` + `${id}`, data)
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
    return api.patch(`${documents}/contract-annex/${id}/`, data)
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
const postpps = (data) => {
    return api.post(`${finance}/pps/save-many/`, data)
}
const getpps = (data) => {
    return api.get(`${finance}/pps/?`, {params: data})
}
const getPaginationPPS = (filter_arendaData, page_size, page_number) => {
    return api.get(`${finance}/pps/?page_size=${page_size}&page=${page_number}`, )
}
const patchpps = (id,data) => {
    return api.patch(`${finance}/pps/${id}`, data)
}
const deletePPS = (id) => {
    return api.delete(`${finance}/pps/${id}`)
}

const saveIncomes = (data) => {
    return api.post(`${documents}/incomes/tables/`, data)
}
const getIncomes = (data) => {
    return api.get(`${documents}/incomes/tables/?file_name=${data}` )
}
const patchIncomes = (data) => {
    return api.patch(`${documents}/incomes/tables/` ,data)
}

const postTarifData = (data) => {
    return api.post(`${finance}/stavki-revenue/save-many/`, data)
}
const getTarifData = (data) => {
    return api.get(`${finance}/stavki-revenue/`, {params: data})
}
const deleteTarifData = (id) => {
    return api.delete(`${finance}/stavki-revenue/${id}`)
}
const patchTarifData = (id, data) => {
    return api.patch(`${finance}/stavki-revenue/${id}/`, data)
}
const getAllTarifDataPagination = (filter_arendaData, page_size, page_number) => {
    return api.get(`${finance}/stavki-revenue/?page_size=${page_size}&page=${page_number}`,   {params: filter_arendaData})
}
const getAllDocuments = () => {
    return api.get(`${finance}/stavki-revenue/?page_size=1_000_000`, )
}
const getAllDocumentsByClient = (client) => {
    return api.get(`${finance}/stavki-revenue/?page_size=1_000_000&client=${client}`, )
}
const getAllStandardDog = () => {
    return api.get(`${finance}/penalty-standards/?page_size=1_000_000`, )
}

const getExportExcel = (filter_arendaData) => {
    return api.get(`${finance}/stavki-arenda/export/?`,  {params: filter_arendaData})
}


const postOtherChanges = (data) => {
    return api.post(`${finance}/other-charges/save-many/`, data)
}
const getOtherChanges = (filter) => {
    return api.get(`${finance}/other-charges/`, {params: filter})
}

const putOtherChanges = (id, data) => {
    return api.put(`${finance}/other-charges/${id}/`, data)
}
const deleteOtherChanges = (id) => {
    return api.delete(`${finance}/other-charges/${id}`)
}

const postDocuments = (data) => {
    return api.post(`${documents}/docs-templates/`, data)
}

const getDocuments = (data, filter) => {
    return api.get(`${documents}/docs-templates?category=${data}`, {params: filter})
}
const getCurrentDocument = (type, data) => {
    return api.get(`${documents}/docs-templates/?category=${type}&search=${data}`)
}

// фильтры для договоров
const getIncompleteOccurrence = (category, occurence, data, filter) => {
    return api.get(`${documents}/contract/?${occurence}=${data}&category=${category}`, {params: filter})
}
// Загрузить файл по пути
const getFilesToPath = (data) => {
    return api.post(`${documents}/contract/files-list/`, data)
}
const getFilesToPath2 = (data) => {
    return api.post(`${documents}/contract/files-download/`, data)
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
    getIncompleteOccurrence,
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

    postpps,
    getpps,
    patchpps,
    getPaginationPPS,
    deletePPS,
    // ФИн служба
    saveIncomes,
    getIncomes,
    patchIncomes,

    // Данные по тарифам
    postTarifData,
    getTarifData,
    deleteTarifData,
    patchTarifData,
    getAllTarifDataPagination,
    getAllDocuments,
    getAllStandardDog,
    getExportExcel,

    // данные по пр
    postOtherChanges,
    getOtherChanges,
    putOtherChanges,
    deleteOtherChanges,
    postDocuments,
    getDocuments,
    getCurrentDocument,
    getAllDocumentsByClient,
    getFilesToPath,
    getFilesToPath2,
}

