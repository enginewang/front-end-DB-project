import { axios } from '@/utils/request'

const api = {
  staffSheet: '/staff/staffSheet',
  staffSheetDelete: '/staff/staffSheetDelete',
  staffSheetModify: '/staff/staffSheetModify',
  staffSheetAdd: '/staff/staffSheetAdd'
}

export default api

export function getStaffSheet () {
  return axios({
    url: api.staffSheet,
    method: 'get'
  })
}

export function deleteStaffSheetRow (data) {
  return axios({
    url: api.staffSheetDelete,
    method: 'post',
    data: data
  })
}

export function modifyStaffSheetRow (data) {
  return axios({
    url: api.staffSheetModify,
    method: 'post',
    data: data
  })
}

export function addStaffSheetRow (data) {
  return axios({
    url: api.staffSheetAdd,
    method: 'post',
    data: data
  })
}