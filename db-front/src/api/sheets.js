import { axios } from '@/utils/request'

const api = {
  workSheet: '/sheets/workSheet',
  checkSheet: '/sheets/checkSheet',
  repairSheet: '/sheets/repairSheet',
  workSheetRow: '/sheets/workSheetRow'
}

export default api

export function getWorkSheet () {
  return axios({
    url: api.workSheet,
    method: 'get'
  })
}
export function getCheckSheet () {
  return axios({
    url: api.checkSheet,
    method: 'get'
  })
}

export function deleteWorkSheetRow (data) {
  return axios({
    url: api.workSheetRow,
    method: 'delete',
    data: data
  })
}
