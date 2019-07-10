import { axios } from '@/utils/request'

const api = {
  allReparSheet: '/repairSheet/allRepairSheet',//请求所有报修单信息
}

export default api

export function getRepairSheet () {
  return axios({
    url: api.allReparSheet,
    method: 'get'
  })
}