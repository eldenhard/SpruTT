import { api } from "@/helpers/axios"

export const resource = "wagon-park"

const getWagons = (filters) => {
    return api.get(`${resource}/wagons`, { params: filters })
}
const postInsuranceNote = (wagon_number, data) => {
    return api.patch(`${resource}/wagons/${wagon_number}/`, data)
}
const getWagon = (number) => {
    return api.get(`${resource}/wagons/${number}/`)
}
const getPassport = (filter) => {
    return api.get(`${resource}/wagon-passport/`, { params: filter })
}

const getArenda = () => {
    return api.get(`${resource}/wagon-rent`)
}

const getBelong = (filter) => {
    return api.get(`${resource}/wagon-belong`, { params: filter })
}
const getCurrentWagon = (numberWagon) => {
    return api.get(`${resource}/wagons` + `?number=${numberWagon}`)
}


const getAllStation = (url) => {
    return api.get(`${url}`)
}

const getCurrentStation = (data) => {
    return api.get(`${resource}/stations/?search=` + data)
}
const getCurrentStationByName = (data) => {
    return api.get(`${resource}/stations/?name=${data}`)
}
const getCurrentStationByCode = (data) => {
    return api.get(`${resource}/stations/?code=` + data)
}
// получить вагоны для селекта в фильтре 
const getWagonType = () => {
    return api.get(`${resource}/wagon-types/`)
}
const getCalculateValue = (Value) => {
    return api.post(`${resource}/stavki-calculator`, Value, {timeout: 600000})
}
// ------------- ЗАПРОСЫ ДЛЯ БРОШЕННЫХ ВАГОНОВ ---------------
// const getWagonsThrow = (url, filter_abadon) => {
//     return api.get(url, {params: filter_abadon})
// }
const getWagonsThrow = (url, filter) => {
    return api.get(url, { params: filter })
}

const getWagonsThrowTypes = () => {
    return api.get(`${resource}/wagon-type`)
}

const getDropsAmount = (date_begin, date_end, wagon_type) => {
    return api.get(`${resource}/get-drops-amount?date_begin=${date_begin} 00:00:00&date_end=${date_end} 23:59:59&wagon_type=${wagon_type}`)
}

// Запросы для дислокации
const getwagonDislocation = (filter_dislocation) => {
    return api.get(`${resource}/dislocations`, { params: filter_dislocation })
}

// Запросы для вагонов полигоны
const getPolygon = (filter_wagonpolygon) => {
    return api.get(`${resource}/dislocations`, { params: filter_wagonpolygon })
}

///api/wagon-park/dislocations/get-filters/
const getFilters = () => {
    return api.get(`${resource}/dislocations/polygons/`)
}



// Телеграммы
const getTelegram = (data) => {
    return api.get(`${resource}/telegrams/` + data)
}
const postTelegram = (data) => {
    return api.get(`${resource}/wagons/${data}/get-latest-info/`)

    // return api.post(`${resource}/telegrams/`, data={"wagons": data})
}
const getAllTelegrams = (id) => {
    return api.get(`${resource}/telegrams?creator=` + `${id}`)
}

const createTelegram = (data) => {
    return api.post(`${resource}/telegrams/`, data)
}


const getAllDataTelegram = (url) => {
    return api.get(`${url}`)
}
const getCargoCode = (url) => {
    return api.get(`${url}`)
}
const getCargoCode1 = () => {
    return api.get(`${resource}/cargo`)
}
const getCargoCodeSearch = (data) => {
    return api.get(`${resource}/cargo/?search=` + data)
}
// Получить послденю информацию по вагону
const getCurrentLastInfoWagon = (data) => {
    return api.get(`${resource}/wagons/${data}/get-latest-info/`)
}

// Получить данные по отправке
const getDataShipment = (data) => {
    return api.get(`${resource}/shipment-types`)
}
const getWagonRepair = () => {
    return api.get(`${resource}/repair-axis-wheels?page_size=500`)
}
// получение последней истории изменений
const getWagonRepairHistory = (id) => {
    return api.get(`${resource}/repair-axis-wheels/${id}/history`)
}
const getReportRepairData = () => {
    return api.get(`${resource}/repair-axis-wheels/export/`)
}
const getReportRepair = (data) => {
    return api.get(`${resource}/repair-axis-wheels/export/?wagon__in=` + data)
}
const getRepairWagon = (data) => {
    return api.get(`${resource}/repair-axis-wheels/?wagon__in=` + data)
}

const postNewRowInReport = (data) => {
    return api.post(`${resource}/shipments/`, data)
}

// Запрос на рэйлтариф
const postRailTarif = (data) => {
    return api.post(`${resource}/rt/tariff/`, data)
}
// Преобразование файла БЧ
const postShipmentList = (data) => {
    return api.post(`${resource}/shipments/convert-file/`, data)
}
const postViewFile = (view, data) => {
    return api.post(`${resource}/shipments/${view}/load-file/`, data)
}
const createReportTerritory = (data, start, end) => {
    return api.post(`${resource}/shipments/export/?date_begin=${start}&date_end=${end}`, { 'wagons': data })
}
const getAmountShipments = (source, date) => {
    return api.get(`${resource}/shipments/?shipment_source=${source}&act_date=${date}`)
}
const getCountries = (data) => {
    return api.get(`${resource}/countries/?search=${data}`)
}
const getClient = () => {
    return api.get(`${resource}/flights/clients/`)
}
const getFlights = (wagon) => {
    return api.get(`${resource}/flights/?wagon=${wagon}&page_size=500`)
}
const getAllCountries = (data) => {
    return api.get(`${resource}/dislocations/countries/`)
}
const getExtensionData = (data) => {
    return api.get(`${resource}/dislocations/last-operations/`, {params: data})
}
// дороги стран
const getAllRoad = () => {
    return api.get(`${resource}/countries/`)
}
// дороги станций
const getWagonRoads = () => {
    return api.get(`${resource}/roads/?page_size=500`)
}
const getDislocation = (date_begin, date_end) => {
    return api.get(`${resource}/dislocations/restricted/?date_begin=${date_begin}&date_end=${date_end}`)
}
const postFileGLP = (file) => {
    return api.post(`${resource}/shipments/match-glp-belongs/`, file)
}
const postGetDropsAmount = (file) => {
    return api.post(`${resource}/get-drops-amount-from-xlsx-file-of-flights/`, file)
}

const getFileFlights = (date_begin, date_end, wagon_types, belongs) => {
    return api.get(`${resource}/flights/export-to-file?date_begin=${date_begin} 00:00:00&date_end=${date_end} 00:00:00&wagon_types=${wagon_types}&belongs=${belongs}`)
}
const getFileFlights2 = (date_begin, date_end, wagon_types, belongs) => {
    return api.get(`${resource}/flights/export-to-file/?date_begin=${date_begin}&date_end=${date_end}&wagon_types=${wagon_types}&belongs=${belongs}`)
}
const test = () => {
    return api.get(`${resource}/flights/belongs`)
}
const getAllRoads = (road_name) => {
    return api.get(`${resource}/roads/?page_size=500&search=${road_name}/`)
}
// Получить все
export default {
    postInsuranceNote,
    getWagons,
    getWagon,
    getPassport,
    getArenda,
    getBelong,
    getCurrentWagon,
    getWagonType,
    getAllStation,
    getCurrentLastInfoWagon,
    getDataShipment,
    getCargoCode1,
    getWagonRepair,
    getWagonRepairHistory,
    getReportRepair,
    postRailTarif,
    postShipmentList,
    getRepairWagon,
    getReportRepairData,
    getCurrentStation,
    getCargoCodeSearch,
    postViewFile,
    createReportTerritory,
    postNewRowInReport,
    getAmountShipments,
    getCountries,
    getCurrentStationByCode,
    getAllRoad,
    getDislocation,
    postFileGLP,
    getCurrentStationByName,
    getCalculateValue,
    getFileFlights,
    getFileFlights2,
    test,
    getAllRoads,
    getWagonRoads,
    // Брошенные вагоны
    getWagonsThrow,
    getWagonsThrowTypes,
    getDropsAmount,
    getFlights,
    // Дислокация вагонов
    getwagonDislocation,

    // 60606670

    // полигоны вагонов
    getPolygon,
    getFilters,



    // Телеграммы
    getTelegram,
    postTelegram,
    createTelegram,
    getAllTelegrams,
    getAllDataTelegram,
    getCargoCode,

    // Клиенты
    getClient,


    // Продление срока ввоза
    getAllCountries,
    getExtensionData,

    // ImpactDowntime
    postGetDropsAmount
}