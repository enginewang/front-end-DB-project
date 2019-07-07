import { axios } from '@/utils/request'

const api = {
  equipment: '/equipment'
}

export function getEquipmentList (parameter) {
  return axios({
    url: api.equipment,
    method: 'get',
    params: parameter
  })
}
