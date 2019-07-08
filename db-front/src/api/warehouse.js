import { axios } from '@/utils/request'

const api = {
  preview: '/warehouse/preview',
  detail: '/warehouse/detail',
  allWarehouse: '/warehouse/allWarehouse',
  allAddress: '/warehouse/allAddress',
  goods: '/warehouse/goods'
}

export default api

export function getWarehousePreview () {
  return axios({
    url: api.preview,
    method: 'get'
  })
}

export function postWarehouseDetail (data) {
  return axios({
    url: api.detail,
    method: 'post',
    data: data
  })
}


export function postGoods (data) {
  return axios({
    url: api.goods,
    method: 'post',
    data: data
  })
}

export function getAllWarehouse () {
  return axios({
    url: api.allWarehouse,
    method: 'get'
  })
}

export function getAllAddress () {
  return axios({
    url: api.allAddress,
    method: 'get'
  })
}
