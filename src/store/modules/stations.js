import api from '@/api/wagonPark'
import {getItem, setItem} from "@/helpers/persistanseStorage"


const resource = api.resource

const state = {
    stations: [],
    isLoading: false,
    errors: null
}

export const mutationTypes = {
    getStationsStart: `[${resource}] getStationsStart`,
    getStationsSuccess: `[${resource}] getStationsSuccess`,
    getStationsFailure: `[${resource}] getStationsFailure`,
    clear: `[${resource}] clear`,
}
 
export const actionTypes = {

    getStations: `${resource} getStations`,
}

const mutations = {

    [mutationTypes.getStationsStart](state, data) {
        state.isLoading = true
        state.stations = data

      },
      [mutationTypes.getStationsSuccess](state, data){
        state.stations = [state.stations, data]
        state.isLoading = false

      },
      [mutationTypes.getStationsFailure](state, errors){
            state.isLoading = false
            state.errors = errors
      },
      [mutationTypes.clear](state){
        state.stations = []
        setItem('station', [])

  },

}

const actions = {
    async [actionTypes.getStations](context, {url , clear}){
        return new Promise((resolve,reject) => {
            if (clear){ context.commit(mutationTypes.clear) }
            context.commit(mutationTypes.getStationsStart)
            api.getAllStation(url)
            .then(response => {

                context.commit(mutationTypes.getStationsSuccess, response.data.data)
                if (response.data.links.next != null) {
                    setItem('station', [...getItem('station'), ...response.data.data])
                    context.dispatch(actionTypes.getStations, { url: response.data.links.next, clear: false })
                } else {
                    resolve(setItem('station', [...getItem('station'), ...response.data.data]))
                }
            }).catch(error => {
                context.commit(mutationTypes.getStationsFailure, error)
                setItem('station', 'Ошибка')
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