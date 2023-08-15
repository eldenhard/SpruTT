import api from '@/api/wagonPark'

const state = {
    roadAsCountries: []
}

const mutations = {
    change_road(state, value){
        state.roadAsCountries = value
    }
}

const actions = {
    getRoadAsRoad({commit}){
        api.getAllRoad()
        .then(response => {
            commit('change_road', response.data.data)
      
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