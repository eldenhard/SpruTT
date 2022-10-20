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

// получить вагоны для селекта в фильтре 
const getWagonType = () => {
    return api.get(`${resource}/wagon-type`)
}

// ------------- ЗАПРОСЫ ДЛЯ БРОШЕННЫХ ВАГОНОВ ---------------
const getWagonsThrow = (filter_abadon) => {
    return api.get(`${resource}/dislocations?operation=БРОС`, {params: filter_abadon})
}

const getWagonsThrowTypes = () => {
    return api.get(`${resource}/wagon-type`)
}


// Запросы для дислокации
const getwagonDislocation = () => {
    return api.get(`${resource}/dislocations`)
}

export default {
    getWagons,
    getPassport,
    getArenda,
    getBelong,
    getCurrentWagon,
    getWagonType,
    
// Брошенные вагоны
    getWagonsThrow,
    getWagonsThrowTypes,

// Дислокация вагонов
getwagonDislocation
}