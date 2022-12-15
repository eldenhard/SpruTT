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
const getAllStation = () => {
    return api.get(`${url}`)
}
// получить вагоны для селекта в фильтре 
const getWagonType = () => {
    return api.get(`${resource}/wagon-type`)
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
    return api.get(`${resource}/dislocations/get-filters/`)
}

// Для ключевых фактов
const getKeyFacts = () => {
    return api.get(`${resource}/key-facts/`)
}

// Телеграммы
const getTelegram = (data) => {
    return api.get(`${resource}/telegrams/` + data)
}
const postTelegram = (data) => {

    return api.post(`${resource}/telegram-data/`, data={"wagons": [data]})
}
const postTelegram2 = (data) => {

    return api.post(`${resource}/telegram-data/`, data={"wagons": data})
}
export default {
    getWagons,
    getPassport,
    getArenda,
    getBelong,
    getCurrentWagon,
    getWagonType,
    getAllStation,
    
// Брошенные вагоны
    getWagonsThrow,
    getWagonsThrowTypes,

// Дислокация вагонов
getwagonDislocation,

// 60606670

// полигоны вагонов
getPolygon,
getFilters,

// ключевы факты
getKeyFacts,


// Телеграммы
getTelegram,
postTelegram,
postTelegram2,



}