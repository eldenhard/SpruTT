
import apiCounter from '@/api/counterparties'
import {resource} from '@/api/counterparties'
const state = {
    users: [],

    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getUsersStart: `[${resource}] getUsersStart`,
    getUsersSuccess: `[${resource}] getUsersSuccess`,
    getUsersFailure: `[${resource}] getUsersFailure`,
    clear: `[${resource}] clear`,

}

export const actionTypes = {

    getUsers: `${resource} getUsers`,


}

const mutations = {
    [mutationTypes.getUsersStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getUsersSuccess](state, data) {
        state.users = [...state.users, ...data]
        state.isLoading = false
    },
    [mutationTypes.getUsersFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
    [mutationTypes.clear](state) {
        state.users = []
    },



}

const actions = {
    async [actionTypes.getUsers](context, { url, clear }) {
        // console.log(url, clear)
        return new Promise((resolve, reject) => {
            if (clear) { context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getUsersStart)
            apiCounter.getUsers(url)
            .then(response => {

                context.commit(mutationTypes.getUsersSuccess, response.data.data)
                if (response.data.links.next != null) {
                    resolve(context.dispatch(actionTypes.getUsers, { url: response.data.links.next, clear: false }))
                } else {
                    resolve(response.data)
                }

            }).catch(error => {
                context.commit(mutationTypes.getUsersFailure, error)
                reject(error)
            })

        })
    },


}

export default
    {
        state,
        mutations,
        actions
    }