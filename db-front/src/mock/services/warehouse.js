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
