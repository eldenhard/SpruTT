import {api} from '@/helpers/axios'

export const resource = 'personal'

const getAllcounterparties = (url) => {
    return api.get(`${url}`)
}
const getAllcounterpartie = (data) => {
    return api.get(`${resource}/counterparties/?search=` + data)
}

export default {
    getAllcounterparties,
    getAllcounterpartie,
}

