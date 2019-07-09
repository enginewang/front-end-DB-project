import Mock from 'mockjs2'
// url: 'accessory/allAccessory'
//method: 'get'
//得到所有配件在仓库中的信息，包括modelID，类型，价格，数量，所在仓库
//
const allAccessory = () => {
  return {
    data: [
      {
        'key': 'tf-100',
        'model': 'model_1',
        'type': '履带',
        'price': 12,
        'num': 10,
        'warehouse':'嘉定仓库',
        'warehouseID':'1234567890'
      },
      {
        'key': 'tf-200',
        'model': 'model_2',
        'type': '螺丝',
        'price': 1,
        'num': 100,
        'warehouse':'五角场仓库',
        'warehouseID':'1234567890'
      },
    ]
  }
}
//url: '/accessory/addAccessory'
//method: 'post'
//上传增加配件信息，包括accessoryID，num,warehouse
const addAccessory = () => {
  return {
    data: 'successful'
  }
}
//url: '/accessory/allWarehouse'
//method: 'get'
//请求所有仓库名字
const allWarehouse = () => {
  return {
    data:["嘉定仓库","五角场仓库"]
  }
}
// url: /accessory/allKind'
//method: 'get'
//请求所有配件ID及对应型号
const allKind = () => {
  return {
    data:[
      {
        accessory: 'tf-100',
        model: 'model_01'
      },
      {
        accessory: 'tf-200',
        model: 'model_02'
      },
      {
        accessory: 'tf-300',
        model: 'model_03'
      }
    ]
  }
}
//url:'/accessory/allType'
//method: 'get'
//请求所有配件类型
const allType = () => {
  return {
    data:[
      {
        value:'履带'
      },{
        value:'螺丝'
      }
    ]
  }
}
Mock.mock(/\/accessory\/allAccessory/, 'get', allAccessory)
Mock.mock(/\/accessory\/addAccessory/, 'post', addAccessory)
Mock.mock(/\/accessory\/allWarehouse/, 'get', allWarehouse)
Mock.mock(/\/accessory\/allType/, 'get', allType)
Mock.mock(/\/accessory\/allKind/, 'get', allKind)