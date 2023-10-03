import api from '@/api/counterparties'
import { resource } from '@/api/counterparties'


const state = {
    counterparties: [],

    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getCounterpartiesStart: `[${resource}] getCounterpartiesStart`,
    getCounterpartiesSuccess: `[${resource}] getCounterpartiesSuccess`,
    getCounterpartiesFailure: `[${resource}] getCounterpartiesFailure`,
    clear: `[${resource}] clear`,

}

export const actionTypes = {

    getCounterparties: `${resource} getCounterparties`,


}

const mutations = {
    [mutationTypes.getCounterpartiesStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCounterpartiesSuccess](state, data) {
        state.counterparties = [...state.counterparties, ...data]
        state.isLoading = false
    },
    [mutationTypes.getCounterpartiesFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
    [mutationTypes.clear](state) {
        state.counterparties = []
    },



}

const actions = {
    async [actionTypes.getCounterparties](context, { url, clear }) {
        // console.log(url, clear)
        return new Promise((resolve, reject) => {
            if (clear) { context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getCounterpartiesStart)
            api.getAllcounterparties(url)
            .then(response => {

                let arr = []
                for(let i of response.data.data){
                   arr.push({
                    full_name: i.full_name,
                    group: i.group,
                    id: i.id,
                    short_name: i.short_name,
                    work_name: i.work_name
                   })
                }


                context.commit(mutationTypes.getCounterpartiesSuccess, arr)
                if (response.data.links.next != null) {
                    // console.log(response.data)
                    resolve(context.dispatch(actionTypes.getCounterparties, { url: response.data.links.next.slice(21), clear: false }))
                } else {
                    resolve(response.data)
                }

            }).catch(error => {
                context.commit(mutationTypes.getCounterpartiesFailure, error)
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