import { axios } from '@/utils/request'

const api = {
  preview: '/warehouse/preview',
  detail: '/warehouse/detail',
  allWarehouse: '/warehouse/allWarehouse',
  allAddress: '/warehouse/allAddress',
  goods: '/warehouse/goods',
  schedule: '/warehouse/schedule',
  all: '/map/getAll'
}

export default api

export function getWarehousePreview() {
  return axios({
    url: api.preview,
    method: 'get'
  })
}

export function getAll() {
  return axios({
    url: api.all,
    method: 'get',
  })
}

export function postWarehouseDetail(data) {
  return axios({
    url: api.detail,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}


export function postGoods(data) {
  return axios({
    url: api.goods,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function postAllWarehouse(data) {
  return axios({
    url: api.allWarehouse,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getAllAddress() {
  return axios({
    url: api.allAddress,
    method: 'get'
  })
}

export function postSchedule(data) {
  return axios({
    url: api.schedule,
    method: 'post',
    data: data[0],
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
