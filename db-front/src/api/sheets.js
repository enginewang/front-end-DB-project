import { axios } from '@/utils/request'

const api = {
  workSheet: '/sheets/workSheet',
  checkSheet: '/sheets/checkSheet',
  repairSheetDetail: '/sheets/repairSheetDetail',
  workSheetRow: '/sheets/workSheetRow',
  checkSheetRow: '/sheets/checkSheetRow'
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
    method: 'post',
    data: data
  })
}

export function deleteCheckSheetRow (data) {
  return axios({
    url: api.checkSheetRow,
    method: 'post',
    data: data
  })
}

export function getRepairSheetById (data) {
  return axios({
    url: api.repairSheetDetail,
    method: 'post',
    data: data
  })
}
