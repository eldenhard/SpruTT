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
    v:  `${resource} checkLocalStations`,
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
    async [actionTypes.getStations](context, {url,clear}){
        return new Promise((resolve, reject) => {
            console.log(getItem('station'))
            if(getItem('station') === null){
                // console.log(getItem('station').length)
                api.getAllStation(url)
                .then(response => {
                    console.log(response)
                    const stations = response.data.data.map(row => {
                        return {id: row.id, name: row.name, code: row.code}
                    })

                  setItem('stations', stations)
                    if (response.data.links.next != null) {                    
                        context.dispatch(actionTypes.getStations, { url: response.data.links.next, clear: false })
                    }
                })
            } else {
            api.getAllStation('wagon-park/station?page_size=1').then(response => {
                if(response.data.total_objects != getItem('station').length){
                    context.dispatch(actionTypes.getStations, {url: 'wagon-park/station?page_size=10', clear: true})
                }
                resolve()
                
            })
            }
        })
    },
    // async [actionTypes.getStations](context, {url , clear}){
    //     return new Promise((resolve,reject) => {
    //         if (clear){ setItem('station', []) }
          
    //         api.getAllStation(url)
    //         .then(response => {
    //             const stations = response.data.data.map(row => {
    //                 return {id: row.id, name: row.name, code: row.code}
    //             })
    //             setItem('station', [...getItem('station'), ...stations])
    //             if (response.data.links.next != null) {                    
    //                 context.dispatch(actionTypes.getStations, { url: response.data.links.next, clear: false })
    //             }
    //         }).catch(error => {
    //             setItem('station', [])
    //             reject(error)
    //         })
            
    //     })
    // },
}

export default 
{
    state,
    mutations,
    actions
}