import {api} from "@/helpers/axios"

export const resource = "wagon-park" 

const getWagons = () => {
    return api.get(`${resource}/wagons`, {params: {is_active:'True'}})
}

const getWagonType = () => {
    return api.get(`${resource}/wagon-type`)
}

export default {
    getWagons,
    getWagonType
}