import {api} from '@/helpers/axios'

export const resource = 'personal'
const staffGlobal = () => {
    return api.get(`${resource}/users?page_size=300`)
}

const getAllStaff = (filter_staff) => {
   return api.get(`${resource}/users/`, {params: filter_staff})
}
const getAllManager = () => {
    return api.get(`${resource}/users?is_chief=true `)
}
const deleteUser = (id) => {
    return api.delete(`${resource}/users/delete/` + `${id}`)
}
const currentUser = (id) => {
    return api.get(`${resource}/users/` + `${id}`)
}
const changeUserData = (id, data) => {
    return api.put(`${resource}/users/update/` + `${id}`, data)
}
const getStaffGroup = () => {
    return api.get(`${resource}/groups`)
}

const createStuff = (form) => {
    return api.post(`${resource}/users/create/`, form, {
        headers: {
            //'Content-Type': 'application/json;charset=utf-8',
            'Content-Type': 'multipart/form-data',
        },
    })
}

export default {
    staffGlobal,
    getAllStaff,
    deleteUser,
    currentUser,
    changeUserData,
    getStaffGroup,
    getAllManager,
    createStuff
}