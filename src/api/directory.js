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

const getAllDocumentsNotType = (data, page_size, page = 1, contract_type = "", created_at_gte = "") => {
    return api.get(`${documents}/contract/?search=${data}&contract_type=${contract_type}&created_at_gte=${created_at_gte}&page_size=${page_size}&page=${page}`)
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
    return api.get(`${finance}/pps/?page=${page_number}`, {params: filter_arendaData})
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
const createAgreeemntStivkaPV = (data) => {
    return api.post(`${finance}/stavki-revenue/`, data)
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
    return api.get(`${finance}/stavki-revenue/?page_size=1_000_000&wagon_type=Цистерна`, )
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

const LoadingPlanAndFact = (data) => {
    return api.get(`${finance}/loading-plan-and-fact?month_begin=${data[0]}&year_begin=${data[1]}&month_end=${data[2]}&year_end=${data[3]}`)
}

// Загрузка актов
const getActs = (filter) => {
    return api.get(`${finance}/acts/`, {params: filter})
}
const saveActs = (data) => {
    return api.post(`${finance}/acts/save-many/`, data)
}
const patchActs = (id, data) => {
    return api.patch(`${finance}/acts/${id}/`, data)
}
const deleteActs = (id, data) => {
    return api.patch(`${finance}/acts/${id}/`, data)
}

const fullSearchDirectory = (data) => {
    return api.get(`${documents}/contract/?created_at_gte=${data.on_date}&category=${data.category}&counterparty_like=${data.counterparty}&is_annex=${data.type}&annex_date=${data.annex_date}`)
// &counterparty=${data.counterparty}
}

const getManyCategoryDate = (category, date, counterparty, typeAgr, annex_date) => {
    return api.get(`${documents}/contract/?created_at_gte=${date}&category=${category}&counterparty_like=${counterparty}&is_annex=${typeAgr}&annex_date=${annex_date}`)
}

const testCounterparty = (dataTest) => {
    return api.get(`${documents}/contract/counterparties`)
}

const getAllDocumentsByCounterparty = (data) => {
    return api.post(`${documents}/contract/`, data)
}
const getAllDocumentsByCounterparty2 = (data) => {
    return api.get(`${documents}/contract/?counterparty_like=${data}`)
}
// Оперативная справка
const sendDataForOperSpravka = (data) => {
    return api.post(`${finance}/operativnaya-spravka/`,  data )
}
const getDataForOperSpravka = (wag_type, date) => {
    return api.get(`${finance}/operativnaya-spravka/report/?wagon_type=${wag_type}&report_date=${date}` )
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
    createAgreeemntStivkaPV,

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

    LoadingPlanAndFact,

    // Загрузка актов
    getActs,
    saveActs,
    patchActs,

    // новая загрузка документов
    getAllDocumentsNotType,
    fullSearchDirectory,
    getManyCategoryDate,
    testCounterparty,

    getAllDocumentsByCounterparty,
    getAllDocumentsByCounterparty2,


    // Оперативная справка
    sendDataForOperSpravka,
    getDataForOperSpravka,
}

