import {api} from '@/helpers/axios'

export const resource = 'reports'


const getUO41 = (data1, data2) => {
   return api.get(`${resource}/uo/41/park-formation?date_begin=${data1}&date_end=${data2}`)
}
const getUO42 = (data1, data2) => {
    return api.get(`${resource}/uo/42/park-placement?date_begin=${data1}&date_end=${data2}`)
 }

export default{
    getUO41,
    getUO42,
}