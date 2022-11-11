import {api} from '@/helpers/axios'

export const resource = 'personal'

const getAllcounterparties = (url) => {
    return api.get(`${url}`)
}


export default {
    getAllcounterparties,
}

