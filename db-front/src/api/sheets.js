import { axios } from '@/utils/request'

const api = {
  workSheet: '/sheets/workSheet',
  checkSheet: '/sheets/checkSheet',
  repairSheet: '/sheets/repairSheet'
}

export default api

export function getWorkSheet () {
  return axios({
    url: api.workSheet,
    method: 'get'
  })
}
