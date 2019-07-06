import Mock from 'mockjs2'

const warehousePreview = () => {
  return [
    {
      'key': 1,
      'id': 1,
      'icon': 0,
      'name': '第一仓库',
      'address': '四平路'
    },
    {
      'key': 2,
      'id': 2,
      'icon': 1,
      'name': '第二仓库',
      'address': '嘉定校区'
    },
    {
      'key': 3,
      'id': 3,
      'icon': 2,
      'name': '第三仓库',
      'address': '杨浦区'
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
