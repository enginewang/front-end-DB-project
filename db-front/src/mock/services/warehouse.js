import Mock from 'mockjs2'

const warehousePreview = () => {
  return {
    'data': [
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
}

const goods = (data) => {
  let allGoods = [
    [
      {
            'key': 1,
            'id': 10001,
            'model': 'GTX1080',
            'type': 'Equipment',
            'number': 1000
      },
      {
        'key': 2,
        'id': 10002,
        'model': 'GTX2080',
        'type': 'Equipment',
        'number': 2000
      },
    ],
    [
        {
          'key': 3,
          'id': 10003,
          'model': 'GTX3080',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 4,
          'id': 10004,
          'model': 'GTX1080',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 5,
          'id': 10005,
          'model': 'GTX980',
          'type': 'Equipment',
          'number': 1000
        }
    ],
    [
        {
          'key': 6,
          'id': 10006,
          'model': 'GTX3080',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 7,
          'id': 10007,
          'model': 'GTX2080',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 8,
          'id': 10008,
          'model': 'GTX1080',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 9,
          'id': 10009,
          'model': 'i7-8700k',
          'type': 'Equipment',
          'number': 1000
        },
        {
          'key': 10,
          'id': 10010,
          'model': 'i7-8700k',
          'type': 'Equipment',
          'number': 1000
        }
    ]
  ]
  return {
    'data': allGoods[data.body]
  }
}

const warehouseAll = () => {
  return {
    'data': [
      {
        'name': '嘉定仓库'
      },
      {
        'name': '四平仓库'
      },
      {
        'name': '五角场仓库'
      }
    ]
  }
}

const warehouseDetail = (data) => {
  console.log(data)
  let detail = [
    {
      'name': '嘉定仓库',
      'address': '嘉定区'
    },
    {
      'name': '四平仓库',
      'address': '杨浦区'
    },
    {
      'name': '五角场仓库',
      'address': '杨浦区'
    }
  ]
  return {
    'data': detail[data.body]
  }
  
}
Mock.mock(/\/warehouse\/previewData/, 'get', warehousePreview)
Mock.mock(/\/warehouse\/detailData/, 'post', warehouseDetail)
Mock.mock(/\/warehouse\/all/, 'get', warehouseAll)
Mock.mock(/\/warehouse\/good/, 'post', goods)
