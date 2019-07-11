import api from './index'
import { axios } from '@/utils/request'

export function login(data) {
  return axios({
    url: '/auth/login',
    method: 'post',
    data: data
  })
}

export function getInfo(data) {
  return axios({
    url: '/user/info',
    method: 'get',
  })
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}