import Vue from "vue";
import axios from "axios";
import {getItem, setItem} from "@/helpers/persistanseStorage";

let config = {
    // baseURL: 'http://10.1.5.65/api/'
    baseURL: '/api/'

}

const _axios = axios.create(config)

_axios.interceptors.request.use(
    function(config){
        const token = getItem('accessToken')
        config.headers.Authorization = token ? `Basic ${token}` : ""
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

_axios.interceptors.response.use(
    function(response){
        return response
    },
    function(error){
        if(!error.response){
            console.log("Network error")
        } else {
            const originalRequest = error.config
            if(error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true
                setItem("accessToken", "")
                //.location.href = "/"
            }
            return Promise.reject(error);
        }
    }
)

Plugin.install = function(Vue, options){
    Vue.axios = _axios;
    window.axios = _axios
    Object.defineProperties(Vue.prototype, {
        axios: {
            get(){
                return _axios
            }
        },
        $axios: {
            get(){
                return  _axios;
            }
        }
    })
}


Vue.use(Plugin);

export const api = _axios
export default Plugin