import { api } from '@/helpers/axios'

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
    return api.delete(`${resource}/users/` + `${id}/`)
}
const currentUser = (id) => {
    return api.get(`${resource}/users/` + `${id}`)
}
const changeUserData = (id, data) => {
    return api.patch(`${resource}/users/` + `${id}/`, data)
}
const getStaffGroup = () => {
    return api.get(`${resource}/groups`)
}

const createStuff = (form) => {
    return api.post(`${resource}/users/`, form, {
        headers: {
            //'Content-Type': 'application/json;charset=utf-8',
            'Content-Type': 'multipart/form-data',
        },
    })
}

const createNews = (data) => {
    return api.post(`${resource}/news/`, data)
}
const getNews = () => {
    return api.get(`${resource}/news/`)
}
const searchUser = (data) => {
    return api.get(`${resource}/users/?search=${data}`)
}

// получение данных по query параметрам
const getUserByQuery = (data) => {
    return api.get(`${resource}/users/`, {params: data})
}
export default {
    staffGlobal,
    getAllStaff,
    deleteUser,
    currentUser,
    changeUserData,
    getStaffGroup,
    getAllManager,
    createStuff,
    searchUser,
    createNews,
    getUserByQuery,
    getNews,
}