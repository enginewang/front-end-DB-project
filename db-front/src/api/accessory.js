import  { axios } from '@/utils/request'

const api = {
  allAccessory: '/accessory/allAccessory',//请求配件表格信息
  addAccessory: '/accessory/addAccessory',//请求添加配件
  allWarehouse: '/accessory/allWarehouse',//请求所有仓库名称
  allType:'/accessory/allType',//请求所有配件类型
  allKind:'/accessory/allKind'//请求所有不同配件的id与model
}

export default api

export function getAccessoryInWarehouse () {
  return axios({
    url: api.allAccessory,
    method: 'get'
  })
}

export function addAccessoryInWarehouse (data) {
    return axios({
        url: api.addAccessory,
        method: 'post',
        data: data
    })
}

export function getWarehouseName () {
  return axios({
    url: api.allWarehouse,
    method: 'get'
  })
}

export function getAllType () {
  return axios({
    url: api.allType,
    method: 'get'
  })
}

export function getAccessoryKind () {
  return axios({
    url: api.allKind,
    method: 'get'
  })
}