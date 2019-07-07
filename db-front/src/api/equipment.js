import { axios } from '@/utils/request'

const api = {
  equipment: '/equipment'
}

export default api

export function getEquipmentPreview () {
  return axios({
    url: api.equipment + '/preview',
    method: 'get'
  })
}
