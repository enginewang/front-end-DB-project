import api from './index'
import { axios } from '@/utils/request'

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
    url: '/auth/login',
    method: 'post',
    data: parameter
  })
}

export function postInfo(data) {
  return axios({
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
    url: '/user/info',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function logout() {
  return axios({
    headers: { "Access-Control-Allow-Origin": "*", crossorigin: true },
    url: '/auth/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}