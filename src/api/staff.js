import {api} from '@/helpers/axios'

export const resource = 'personal'

const getAllStaff = (filter_staff) => {
   return api.get(`${resource}/users/`, {params: filter_staff})
}
const deleteUser = (id) => {
    return api.delete(`${resource}/users/delete/` + `${id}`)
}
const currentUser = (id) => {
    return api.get(`${resource}/users/` + `${id}`)
}
const changeUserData = (id, data) => {
    return api.put(`${resource}/users/update/` + `${id}` + data)
}

export default {
    getAllStaff,
    deleteUser,
    currentUser,
    changeUserData
}