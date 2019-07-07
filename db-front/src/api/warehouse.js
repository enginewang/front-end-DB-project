import { axios } from '@/utils/request'

const api = {
  preview: '/warehouse/preview',
  detail: '/warehouse/detail',
  all: '/warehouse/all',
  address: '/warehouse/address',
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
    url: api.all,
    method: 'get'
  })
}

export function getAddress () {
  return axios({
    url: api.address,
    method: 'get'
  })
}
