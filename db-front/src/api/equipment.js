import { axios } from '@/utils/request'

const api = {
  equipmentUsing: '/equipment/using',
  equipmentDetail: '/equipment/detail',
  equipmentAll: '/equipment/all'
};

export default api

export function getEquipmentAllList () {
  return axios({
    url: api.equipmentAll,
    method: 'get',
  })
}

export function postEquipmentDetail (data) {
  return axios({
    url: api.equipmentDetail,
    method: 'post',
    data: data
  })
}

export function getEquipmentUsingList () {
  return axios({
    url: api.equipmentUsing,
    method: 'get',
  })
}

