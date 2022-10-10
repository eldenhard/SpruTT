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
}

export const actionTypes = {
    login: `${resource} login`
}

const mutations = {
    [mutationTypes.loginSuccess](state, user) {
        state.user = user
        state.uid = user.user.id
        state.isLoggedIn = true
        setItem('accessToken', user.token)
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
    }
}

export default 
{
    state,
    mutations,
    actions
}