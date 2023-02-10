import {api} from "@/helpers/axios"

export const resource = "wagon-park" 

const getWagons = (filters) => {
    return api.get(`${resource}/wagons`, {params: filters})
}

const getPassport = (filter) => {
    return api.get(`${resource}/wagon-passport/`, {params: filter})
}

const getArenda = () => {
    return api.get(`${resource}/wagon-rent`)
}

const getBelong = (filter) => {
    return api.get(`${resource}/wagon-belong`, {params: filter})
}
const getCurrentWagon = (numberWagon) => {
    return api.get(`${resource}/wagons`+ `?number=${numberWagon}`)
}


const getAllStation = (url) => {
    return api.get(`${url}`)
}



// получить вагоны для селекта в фильтре 
const getWagonType = () => {
    return api.get(`${resource}/wagon-types/`)
}

// ------------- ЗАПРОСЫ ДЛЯ БРОШЕННЫХ ВАГОНОВ ---------------
// const getWagonsThrow = (url, filter_abadon) => {
//     return api.get(url, {params: filter_abadon})
// }
const getWagonsThrow = (url, filter) => {
    return api.get(url, {params: filter})
}

const getWagonsThrowTypes = () => {
    return api.get(`${resource}/wagon-type`)
}


// Запросы для дислокации
const getwagonDislocation = (filter_dislocation) => {
    return api.get(`${resource}/dislocations`, {params: filter_dislocation})
}

// Запросы для вагонов полигоны
const getPolygon = (filter_wagonpolygon) => {
    return api.get(`${resource}/dislocations`, {params: filter_wagonpolygon})
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
    return api.get(`${resource}/telegrams?creator=`+ `${id}`)
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

// Получить послденю информацию по вагону
const getCurrentLastInfoWagon = (data) => {
    return api.get(`${resource}/wagons/${data}/get-latest-info/`)
}

// Получить данные по отправке
const getDataShipment = (data) => {
    return api.get(`${resource}/shipment`)
}
const getWagonRepair = () => {
    return api.get(`${resource}/repair-axis-wheels?page_size=500`)
}
// получение последней истории изменений
const getWagonRepairHistory = (id) => {
    return api.get(`${resource}/repair-axis-wheels/${id}/history`)
}
const getReportRepair = () => {
    return api.get(`${resource}/repair-axis-wheels/export/`)
}
export default {
    getWagons,
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
// Брошенные вагоны
    getWagonsThrow,
    getWagonsThrowTypes,

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


}