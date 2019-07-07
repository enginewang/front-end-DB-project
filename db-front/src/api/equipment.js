import { axios } from '@/utils/request'

const api = {
  equipmentUsing: '/equipment/using',
  equipmentAll: '/equipment/all'
}

export default api

export function getEquipmentAllList () {
  return axios({
    url: api.equipmentAll,
    method: 'get'
  })
}

export function getEquipmentUsingList () {
  return axios({
    url: api.equipmentUsing,
    method: 'get',
  })
}

