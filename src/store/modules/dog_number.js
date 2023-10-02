import api from '@/api/directory'

const resource = api.resource


const state = {
    dog_number: [],

    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getDogNumberStart: `[${resource}] getDogNumberStart`,
    getDogNumberSuccess: `[${resource}] getDogNumberSuccess`,
    getDogNumberFailure: `[${resource}] getDogNumberFailure`,
    clear: `[${resource}] clear`,

}

export const actionTypes = {

    getDogNumber: `${resource} getDogNumber`,


}

const mutations = {
    [mutationTypes.getDogNumberStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getDogNumberSuccess](state, data) {
        state.dog_number = [...state.dog_number, ...data]
        state.isLoading = false
    },
    [mutationTypes.getDogNumberFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
    [mutationTypes.clear](state) {
        state.dog_number = []
    },



}

const actions = {
    async [actionTypes.getDogNumber](context, { url, clear }) {
        // console.log(url, clear)
        return new Promise((resolve, reject) => {
            if (clear) { context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getDogNumberStart)
            api.getNumberDog(url)
            .then(response => {

                context.commit(mutationTypes.getDogNumberSuccess, response.data.data)
                if (response.data.links.next != null) {
                    resolve(context.dispatch(actionTypes.getDogNumber, { url: response.data.links.next.slice(21), clear: false }))
                } else {
                    resolve(response.data)
                }

            }).catch(error => {
                context.commit(mutationTypes.getDogNumberFailure, error)
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