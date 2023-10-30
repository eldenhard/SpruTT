import api from '@/api/wagonPark'

const state = {
    name_client: [],
    current_input: null,
}

const mutations = {
    Change_client(state, data){
        state.name_client = data
    },
    setMycurrent_input(state, data){
        state.current_input = data
    }
}

const actions = {
    getClient({commit}){
        api.getClient()
        .then(response => {
            let data = []
            for(let i in response.data){
                if(response.data[i].client == null ){
                    response.data[i].client = ""
                } else {
                    data = response.data
                    commit('Change_client', data)
                }
            }
      
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
        // getters,
    }
