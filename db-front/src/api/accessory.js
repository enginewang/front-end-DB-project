import  { axios } from '@/utils/request'

const api = {
  allAccessory: '/accessory/allAccessory',
  addAccessory: '/accessory/addAccessory',
}

export default api

export function getAccessoryInWarehouse () {
  return axios({
    url: api.allAccessory,
    method: 'get'
  })
}

export function addAccessoryInWarehouse (data) {
    return axios({
        url: api.addAccessory,
        method: 'post',
        data: data
    })
}
