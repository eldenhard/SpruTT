import api from "@/api/auth"
import staff_api from '@/api/staff'
import {setItem} from "@/helpers/persistanseStorage"

const resource = api.resource

const state = {
    user: {},
    uid: null,
    isLoggedIn: false,
    groups: null,

    users: null
}

export const mutationTypes = {
    loginStart: `[${resource}] loginStart`,
    loginSuccess: `[${resource}] loginSuccess`,
    loginFailure: `[${resource}] loginFailure`,
    // у нас форма авторизации показываетс когда isLoggedIn = false. Когда авторизация успешна - там тру. Нам нужен отдельный обработчик чтобы сделать логаут
    logout: `[${resource}] logout`,
    getStaffGroups: `[${resource}] getStaffGroups`,
    staffGlobal: `[${resource}] staffGlobal`

}

export const actionTypes = {
    login: `${resource} login`,
    logout: `${resource} logout`,
    getStaffGroups: `${resource} getStaffGroups`,

    staffGlobal: `[${resource}] staffGlobal`

}

const mutations = {
    [mutationTypes.loginSuccess](state, user) {
        state.user = user
        state.uid = user.user.id
        state.isLoggedIn = true
        setItem('accessToken', user.token)
      },
      [mutationTypes.logout](state){
        state.user = {}
        state.uid = null
        state.isLoggedIn = false
        setItem('accessToken', '')
      },
      [mutationTypes.getStaffGroups](state, data){
            state.groups = data
      },
      [mutationTypes.staffGlobal](state, data){
        state.users = data
  }
}

const actions = {
    async [actionTypes.login](context, data){
        return new Promise((resolve,reject) => {
            api.login(data).then(response => {
                context.commit(mutationTypes.loginSuccess, response.data)
                resolve(response.data)
            }).catch(error => {
                setItem('accessToken', '')
                reject(error)
            })
            
        })
    },
    async [actionTypes.logout](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.logout)
        }) 
    },
    async [actionTypes.getStaffGroups](context){
        return new Promise((resolve, reject) => {
            staff_api.getStaffGroup()
            .then((response) => {
                context.commit(mutationTypes.getStaffGroups, response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    },
    async [actionTypes.staffGlobal](context){
        return new Promise((resolve, reject) => {
            staff_api.staffGlobal()
            .then((response) => {
                context.commit(mutationTypes.staffGlobal, response.data.data)
                resolve(response.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default 
{
    state,
    mutations,
    actions
}