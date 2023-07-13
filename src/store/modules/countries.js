import api from '@/api/wagonPark'

const state = {
    countrie: []
}

const mutations = {
    change_countrie(state, value){
        state.countrie = value
    }
}

const actions = {
    getCounterpartie({commit}){
        api.getAllCountries()
        .then(response => {
            commit('change_countrie', response.data)
      
        }).catch(error => {
            console.log(error)
        })
    }
}

export default {
    state,
    mutations,
    actions,
}