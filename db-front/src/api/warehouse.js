import { axios } from '@/utils/request'

const api = {
  warehousePreview: '/warehouse/previewData',
  warehouseDetail: '/warehouse/detailData',
  warehouseAll: '/warehouse/all'
}

export default api

export function getWarehousePreview () {
  return axios({
    url: api.warehousePreview,
    method: 'get'
  })
}

export function getWarehouseDetail (parameter) {
  return axios({
    url: api.warehouseDetail,
    method: 'get',
    param: parameter
  })
}

export function getAllWarehouse () {
  return axios({
    url: api.warehouseAll,
    method: 'get'
  })
}

export function deleteWarehouse (id) {
  return axios({
    url: `${api.warehouseDetail}/${id}`,
    method: 'delete'
  })
}

export function updateWarehouse (id, parameter) {
  return axios({
    url: `${api.warehouseDetail}/${id}`,
    method: 'put',
    data: parameter
  })
}
