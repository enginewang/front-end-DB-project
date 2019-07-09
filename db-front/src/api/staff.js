import { axios } from '@/utils/request'

const api = {
  staffSheet: '/staff/staffSheet'
}

export default api

export function getStaffSheet () {
  return axios({
    url: api.staffSheet,
    method: 'get'
  })
}