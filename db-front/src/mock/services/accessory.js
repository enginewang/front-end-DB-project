import Mock from 'mockjs2'
// url: 'accessory/allAccessory'
//method: 'get'
//得到所有配件在仓库中的信息，包括modelID，类型，价格，数量，所在仓库
//
const allAccessory = () => {
  return {
    'data': [
      {
        'modelID': 'model_001',
        'type': '履带',
        'price': 12,
        'num': 10,
        'warehouse':'嘉定仓库',
        'warehouseID':'1234567890'
      },
      {
        'modelID': 'model_002',
        'type': '螺丝',
        'price': 1,
        'num': 100,
        'warehouse':'五角场仓库',
        'warehouseID':'1234567891'
      }
    ]
  }
}

Mock.mock(/\/accessory\/allAccessory/, 'get', allAccessory)