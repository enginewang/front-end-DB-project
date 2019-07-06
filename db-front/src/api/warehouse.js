import { axios } from '@/utils/request'

const api = {
  warehousePreview: '/warehouse/preview',
  warehouseDetail: '/warehouse/detail'
}

export default api

export function getWarehousePreview () {
  return axios({
    url: api.warehousePreview,
    method: 'get'
  })
}
