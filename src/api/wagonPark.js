import {api} from "@/helpers/axios"

export const resource = "wagon-park" 

const getWagons = (filters) => {
    return api.get(`${resource}/wagons`, {params: filters})
}


const getPassport = (filter) => {
    return api.get(`${resource}/wagon-passport`, {params: filter})
}

const getArenda = () => {
    return api.get(`${resource}/wagon-rent`)
}

const getBelong = (filter) => {
    return api.get(`${resource}/wagon-belong`, {params: filter})
}
// const getWagons = () => {
//     return api.get(`${resource}/wagons`, {params: {is_active:'True'}})
// }
export default {
    getWagons,
    getPassport,
    getArenda,
    getBelong

}