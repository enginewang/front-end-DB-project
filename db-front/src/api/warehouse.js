import { axios } from '@/utils/request'

const api = {
  warehousePreview: '/warehouse/previewData',
  warehouseDetail: '/warehouse/detailData',
  warehouseAll: '/warehouse/all',
  goods: '/warehouse/good'
}

export default api

export function getWarehousePreview () {
  return axios({
    url: api.warehousePreview,
    method: 'get'
  })
}

export function postWarehouseDetail (data) {
  return axios({
    url: api.warehouseDetail,
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
    url: api.warehouseAll,
    method: 'get'
  })
}
