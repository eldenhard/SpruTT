import api from '@/api/wagonPark'

const resource = api.resource


const state = {
    cargo_owner: [],
    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getCargoOwnerStart: `[${resource}] getCargoOwnerStart`,
    getCargoOwnerSuccess: `[${resource}] getCargoOwnerSuccess`,
    getCargoOwnerFailure: `[${resource}] getCargoOwnerFailure`,
    clear: `[${resource}] clear`,

}

export const actionTypes = {

    getCargoOwner: `${resource} getCargoOwner`,


}

const mutations = {
    [mutationTypes.getCargoOwnerStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCargoOwnerSuccess](state, data) {
        state.cargo_owner = [...state.cargo_owner, ...data]
        state.isLoading = false
    },
    [mutationTypes.getCargoOwnerFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
    [mutationTypes.clear](state) {
        state.cargo_owner = []
    },



}

const actions = {
    async [actionTypes.getCargoOwner](context, { url, clear }) {
        // console.log(url, clear)
        return new Promise((resolve, reject) => {
            if (clear) { context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getCargoOwnerStart)
            api.getAllDataTelegram(url)
            .then(response => {

                context.commit(mutationTypes.getCargoOwnerSuccess, response.data.data)
                if (response.data.links.next != null) {
                    resolve(context.dispatch(actionTypes.getCargoOwner, { url: response.data.links.next, clear: false }))
                } else {
                    resolve(response.data)
                }

            }).catch(error => {
                context.commit(mutationTypes.getCargoOwnerFailure, error)
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