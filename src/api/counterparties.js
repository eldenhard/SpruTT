import {api} from '@/helpers/axios'

export const resource = 'personal'

const getAllcounterparties = (url) => {
    return api.get(`${url}`)
}
const getAllcounterpartie = (data) => {
    return api.get(`${resource}/counterparties/?search=` + data)
}
const getAllUser = (data) => {
    return api.get(`${resource}/users/?search=` + data)
}
const getUsers = (data) => {
    return api.get(`${resource}/users/?page_size=700`)
}
export default {
    getAllcounterparties,
    getAllcounterpartie,
    getAllUser,
    getUsers,
}

