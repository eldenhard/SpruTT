import api from '@/api/wagonPark'

const state = {
    client: ''
}



const mutations = {
    Change_client(state, data){
        state.client = data
    }
}


const actions = {
   getClient(){
        api.getClient()
        .then(response => {
            context.commit(response.data)
        }).catch(error => {
            console.log(error)
        })
   }
}



export default
    {
        state,
        mutations,
        actions
    }
