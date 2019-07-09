import { axios } from '@/utils/request'

const api = {
  equipmentUsing: '/equipment/using',
  equipmentDetail: '/equipment/detail',
  equipmentStored: '/equipment/stored'
};

export default api

export function getEquipmentStoredList () {
  return axios({
    url: api.equipmentStored,
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

// 增加仓储器材
export function addEquipmentStored (parameter) {
  return axios({
    url: api.equipmentStored,
    method: 'post',
    data: parameter
  })
}

export function getEquipmentUsingList () {
  return axios({
    url: api.equipmentUsing,
    method: 'get',
  })
}

