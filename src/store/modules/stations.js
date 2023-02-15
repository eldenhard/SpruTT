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
    checkLocalStations:  `${resource} checkLocalStations`,
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
       

  },

}

const actions = {
    async [actionTypes.checkLocalStations](context, {url,clear}){
        return new Promise((resolve, reject) => {
            api.getAllStation('wagon-park/stations?page_size=1').then(response => {
                const localStations = getItem('station')
                // console.log(response.data.total_objects,localStations, localStations.length)
                if(getItem('station') == null || response.data.total_objects != getItem('station').length){
                    context.dispatch(actionTypes.getStations, {url: 'wagon-park/stations?page_size=1000', clear: true})
                }
                resolve()
                
            })
        })
    },
    async [actionTypes.getStations](context, {url , clear}){
        return new Promise((resolve,reject) => {
            if (clear){ setItem('station', []) }
          
            api.getAllStation(url)
            .then(response => {
                const stations = response.data.data.map(row => {
                    return {id: row.id, name: row.name, code: row.code, code6: Number(row.code6)}
                })
                setItem('station', [...getItem('station'), ...stations])
                if (response.data.links.next != null) {                    
                    context.dispatch(actionTypes.getStations, { url: response.data.links.next, clear: false })
                }
            }).catch(error => {
                setItem('station', [])
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