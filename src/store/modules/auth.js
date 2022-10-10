import api from "@/api/auth"
import {setItem} from "@/helpers/persistanseStorage"

const resource = api.resource

const state = {
    user: {},
    uid: null,
    isLoggedIn: false
}

export const mutationTypes = {
    loginStart: `[${resource}] loginStart`,
    loginSuccess: `[${resource}] loginSuccess`,
    loginFailure: `[${resource}] loginFailure`,
    // у нас форма авторизации показываетс когда isLoggedIn = false. Когда авторизация успешна - там тру. Нам нужен отдельный обработчик чтобы сделать логаут
    logout: `[${resource}] logout`
}

export const actionTypes = {
    login: `${resource} login`,
    logout: `${resource} logout`,
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
      }
}

const actions = {
    async [actionTypes.login](context, data){
        return new Promise(resolve => {
            api.login(data).then(response => {
                context.commit(mutationTypes.loginSuccess, response.data)
                resolve(response.data)
            }).catch(error => {
                setItem('accessToken', '')
                resolve(error)
            })
            
        })
    },
    async [actionTypes.logout](context){
        return new Promise(resolve => {
            context.commit(mutationTypes.logout)
        }) 
    }
}

export default 
{
    state,
    mutations,
    actions
}