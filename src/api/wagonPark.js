import {api} from "@/helpers/axios"

export const resource = "wagon-park" 

const getWagons = () => {
    return api.get(`${resource}/wagons`)
}

const getWagonType = () => {
    return api.get(`${resource}/wagon-type`)
}

const getPassport = () => {
    return api.get(`${resource}/wagon-passport`)
}

const getArenda = () => {
    return api.get(`${resource}/wagon-rent`)
}

const getBelong = () => {
    return api.get(`${resource}/wagon-belong`)
}

export default {
    getWagons,
    getWagonType,
    getPassport,
    getArenda,
    getBelong

}