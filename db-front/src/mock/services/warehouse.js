import Mock from 'mockjs2'

const allAddress = () => {
  return {
    'data': [
      {
        'name': '杨浦区',
      },
      {
        'name': '嘉定区'
      }
    ]
  }
}

const allWarehouse = () => {
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

const detail = (data) => {
  let detail = {
    'a0001':
      {
        'name': '嘉定仓库',
        'address': '嘉定区',
        'detailAddress': '曹安公路'
      },
    'b0002':
      {
        'name': '四平仓库',
        'address': '杨浦区',
        'detailAddress': '四平路1239号'
      },
    'c0003':
      {
        'name': '五角场仓库',
        'address': '杨浦区',
        'detailAddress': '五角场'
      }
  }
  return {
    'data': detail[data.body]
  }
}

const goods = (data) => {
  let accessory = {
    'a0001': [
      {
        'model': 'Ryzen3700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'Ryzen3900',
        'type': 'Accessory',
        'number': 2000
      },
    ],
    'b0002': [
      {
        'model': 'Ryzen4900',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'Ryzen2700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'Vega64',
        'type': 'Accessory',
        'number': 1000
      }
    ],
    'c0003': [
      {
        'model': 'Vega56',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'Vega40',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'AMD370',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'AMD560',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'model': 'AMD580',
        'type': 'Accessory',
        'number': 1000
      }
    ]
  }

  let equipment = {
    'a0001': [
      {
        'id': '10001',
        'model': 'GTX1080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10002',
        'model': 'GTX2080',
        'type': 'Equipment',
        'number': 2000
      },
    ],
    'b0002': [
      {
        'id': '10003',
        'model': 'GTX3080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10004',
        'model': 'GTX1080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10005',
        'model': 'GTX980',
        'type': 'Equipment',
        'number': 1000
      }
    ],
    'c0003': [
      {
        'id': '10006',
        'model': 'GTX3080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10007',
        'model': 'GTX2080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10008',
        'model': 'GTX1080',
        'type': 'Equipment',
        'number': 1000
      },
      {
        'id': '10009',
        'model': 'i7-8700k',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': '10010',
        'model': 'i7-8700k',
        'type': 'Accessory',
        'number': 1000
      }
    ]
  }
  return {
    'data': {
      accessory: accessory[data.body],
      equipment: equipment[data.body]
    }
  }
}

const preview = () => {
  return {
    'data': [
      {
        'id': 'a0001',
        'name': '嘉定仓库',
        'address': '嘉定区'
      },
      {
        'id': 'b0002',
        'name': '四平仓库',
        'address': '杨浦区'
      },
      {
        'id': 'c0003',
        'name': '五角场仓库',
        'address': '杨浦区'
      }
    ]
  }
}

const schedule = (data) => {
  console.log(data.body)
  return {

  }
}



Mock.mock(/\/warehouse\/allAddress/, 'get', allAddress)
Mock.mock(/\/warehouse\/allWarehouse/, 'get', allWarehouse)
Mock.mock(/\/warehouse\/detail/, 'post', detail)
Mock.mock(/\/warehouse\/goods/, 'post', goods)
Mock.mock(/\/warehouse\/preview/, 'get', preview)
Mock.mock(/\warehouse\/schedule/, 'post', schedule)
