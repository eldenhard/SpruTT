import {api} from '@/helpers/axios'

export const resource = 'reports'


const getUO41 = (data1, data2) => {
   return api.get(`${resource}/uo/41/park-formation?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO42 = (data1, data2) => {
    return api.get(`${resource}/uo/42/park-placement?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
 }
 const getUO43 = (data1, data2) => {
   return api.get(`${resource}/uo/43/park-rented?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO44 = (data1, data2, wag_type) => {
   return api.get(`${resource}/uo/44/park-rented-out?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
}
 const getUO45 = (data1, data2, wag_type) => {
    return api.get(`${resource}/uo/45-46/transportations?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
 }
 const getUO46 = (data1, data2, wag_type) => {
   return api.get(`${resource}/uo/46/transportations?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
}
export default{
    getUO41,
    getUO42,
    getUO43,
    getUO44,
    getUO45,
    getUO46,
}