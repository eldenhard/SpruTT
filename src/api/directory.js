import {api} from '@/helpers/axios'

export const resource = 'personal'
export const documents = 'documents'

const getAllcounterparties = (filter_directory) => {
    return api.get(`${resource}/counterparties`, {params: filter_directory})
}
const putCounterparties = (id, data) => {
    return api.put(`${resource}/counterparties/update/` + `${id}`, data)
}
// типы договоров
const getDirectoryFarm = () => {
    return api.get(`${documents}/contract/?category=Общехозяйственные`)
}
export default {
    getAllcounterparties,
    putCounterparties,
    getDirectoryFarm
}

