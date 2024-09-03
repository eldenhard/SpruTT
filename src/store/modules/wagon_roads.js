import api from '@/api/wagonPark'

const state = {
    wagon_roads: [],
}

const mutations = {
    change_roads(state, value){
        state.wagon_roads = value
    }
}

const actions = {
    getWagonRoads({commit}){
        api.getWagonRoads()
        .then(response => {
            // console.log('Дороги:', response.data.data)
            commit('change_roads', response.data.data)
      
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