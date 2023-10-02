import api from '@/api/wagonPark'

const resource = api.resource


const state = {
    cargo_code: [],
    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getCargoCodeStart: `[${resource}] getCargoCodeStart`,
    getCargoCodeSuccess: `[${resource}] getCargoCodeSuccess`,
    getCargoCodeFailure: `[${resource}] getCargoCodeFailure`,
    clear: `[${resource}] clear`,

}

export const actionTypes = {

    getCargoCode: `${resource} getCargoCode`,


}

const mutations = {
    [mutationTypes.getCargoCodeStart](state) {
        state.isLoading = true
    },
    [mutationTypes.getCargoCodeSuccess](state, data) {
        state.cargo_code = [...state.cargo_code, ...data]
        state.isLoading = false
    },
    [mutationTypes.getCargoCodeFailure](state, errors) {
        state.isLoading = false
        state.errors = errors
    },
    [mutationTypes.clear](state) {
        state.cargo_code = []
    },



}

const actions = {
    async [actionTypes.getCargoCode](context, { url, clear }) {
        // console.log(url, clear)
        return new Promise((resolve, reject) => {
            if (clear) { context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getCargoCodeStart)
            api.getCargoCode(url)
            .then(response => {
                  let arr = []
                for(let i of response.data.data){
                   arr.push({
                    code: i.code,
                    code6: i.code6,
                    name: i.name
                   })
                }
       
                context.commit(mutationTypes.getCargoCodeSuccess, arr)
                if (response.data.links.next != null) {
                    resolve(context.dispatch(actionTypes.getCargoCode, { url: response.data.links.next.slice(21), clear: false }))
                } else {
                    resolve(response.data)
                }

            }).catch(error => {
                context.commit(mutationTypes.getCargoCodeFailure, error)
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