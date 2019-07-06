import { axios } from '@/utils/request'

const api = {
  warehouse: '/warehouse'
}

export default api

export function getInitWarehouse () {
  return axios({
    url: api.warehouse,
    method: 'get'
  })
}
