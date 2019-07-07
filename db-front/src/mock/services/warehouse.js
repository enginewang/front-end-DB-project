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
      'id': 10001,
      'warehouse_id': 1,
      'model': 'GTX1080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 2,
      'id': 10002,
      'warehouse_id': 1,
      'model': 'GTX2080',
      'type': 'Equipment',
      'number': 2000
    },
    {
      'key': 3,
      'id': 10003,
      'warehouse_id': 2,
      'model': 'GTX3080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 4,
      'id': 10004,
      'warehouse_id': 2,
      'model': 'GTX1080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 5,
      'id': 10005,
      'warehouse_id': 2,
      'model': 'GTX980',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 6,
      'id': 10006,
      'warehouse_id': 3,
      'model': 'GTX3080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 7,
      'id': 10007,
      'warehouse_id': 3,
      'model': 'GTX2080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 8,
      'id': 10008,
      'warehouse_id': 3,
      'model': 'GTX1080',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 9,
      'id': 10009,
      'warehouse_id': 3,
      'model': 'i7-8700k',
      'type': 'Equipment',
      'number': 1000
    },
    {
      'key': 10,
      'id': 10010,
      'warehouse_id': 3,
      'model': 'i7-8700k',
      'type': 'Equipment',
      'number': 1000
    }
  ]
}

const warehouseAll = () => {
  return [
    {
      'name': '嘉定仓库'
    },
    {
      'name': '四平仓库'
    }
  ]
}
Mock.mock(/\/warehouse\/previewData/, 'get', warehousePreview)
Mock.mock(/\/warehouse\/detailData/, 'get', warehouseDetail)
Mock.mock(/\/warehouse\/all/, 'get', warehouseAll)
