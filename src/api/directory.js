import {api} from '@/helpers/axios'

export const resource = 'personal'

const getAllcounterparties = (filter_directory) => {
    return api.get(`${resource}/counterparties`, {params: filter_directory})
}
const putCounterparties = (id, data) => {
    return api.put(`${resource}/counterparties/update/`, + `${id}`, data)
}

export default {
    getAllcounterparties,
    putCounterparties
}

