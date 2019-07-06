import Mock from 'mockjs2'

const warehousePreview = () => {
  return [
    {
      'key': 1,
      'id': 1,
      'icon': 0,
      'address': 'address1'
    },
    {
      'key': 2,
      'id': 2,
      'icon': 1,
      'address': 'address2'
    },
    {
      'key': 3,
      'id': 3,
      'icon': 2,
      'address': 'address3'
    }
  ]
}

const warehouseDetail = () => {
  return [
    {
      'key': 1,
      'id': 1,
      'model': 'GTX1080',
      'type': 'Equipment',
      'number': 1000
    }
  ]
}
Mock.mock(/\/warehouse\/preview/, 'get', warehousePreview)
Mock.mock(/\/warehouse\/detail/, 'get', warehouseDetail)
