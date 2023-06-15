import api from '@/api/wagonPark'

const state = {
    client: []
}



const mutations = {
    Change_client(state, data){
        state.client = data
    }
}
const getters = {
    getCLIENTOS(state) {
        return state.client;
    }
}

const actions = {
    getClient({commit}){
        api.getClient()
        .then(response => {
            commit('Change_client', response.data)
        }).catch(error => {
            console.log(error)
        })
   }
}



export default
    {
        state,
        mutations,
        actions,
        getters,
    }
