import {api} from '@/helpers/axios'

export const resource = 'reports'
export const wagon_park = 'wagon-park'

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
    return api.get(`${resource}/uo/45/?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
 }
 const getUO46 = (data1, data2, wag_type) => {
   return api.get(`${resource}/uo/46/?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
}
const getUO47 = (data1, data2, wag_type) => {
   return api.get(`${resource}/uo/47/?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
}
const getUO48 = (data1, data2) => {
   return api.get(`${resource}/uo/48?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO49 = (data1, data2) => {
   return api.get(`${resource}/uo/49?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO10 = (data1,data2) => {
   return api.get(`${resource}/uo/410?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO11 = (data1,data2) => {
   return api.get(`${resource}/uo/411?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO12 = (data1,data2) => {
   return api.get(`${resource}/uo/412?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO13 = (data1,data2) => {
   return api.get(`${resource}/uo/413?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO14 = (data1,data2) => {
   return api.get(`${resource}/uo/414?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO15 = (data1,data2) => {
   return api.get(`${resource}/uo/415?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO16 = (data1,data2) => {
   return api.get(`${resource}/uo/416?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO17 = (data1,data2) => {
   return api.get(`${resource}/uo/417?date_begin=${data1}&date_end=${data2}`, {timeout: 600000})
}
const getUO422 = (data1, data2, wag_type, wagon_belong) => {
   return api.get(`${resource}/uo/422/repair-expenses?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}&wagon_belong=${wagon_belong}`, {timeout: 600000})
}
const getUO424 = (data1, data2, wag_type) => {
   return api.get(`${resource}/uo/424/repair-downtime?date_begin=${data1}&date_end=${data2}&wagon_type=${wag_type}`, {timeout: 600000})
}
const getUO28 = ( on_date, shipment_source) => {
   return api.get(`${wagon_park}/shipments/?on_date=${ on_date}&shipment_source=${shipment_source}`, {timeout: 600000})
}

export default{
    getUO41,
    getUO42,
    getUO43,
    getUO44,
    getUO45,
    getUO46,
    getUO47,
    getUO48,
    getUO49,
    getUO10,
    getUO11,
    getUO12,
    getUO13,
    getUO14,
    getUO15,
    getUO16,
    getUO17,
    getUO422,
    getUO424,
    getUO28,
}