import Mock from 'mockjs2'

const allAddress = () => {
  return {
    'data': [
      '杨浦区',
      '嘉定区'
    ]
  }
}

const allWarehouse = () => {
  return {
    'data': [
      '嘉定仓库',
      '四平仓库',
      '五角场仓库'
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
        'id': 'a00001',
        'model': 'Ryzen3700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00002',
        'model': 'Ryzen3900',
        'type': 'Accessory',
        'number': 2000
      },
    ],
    'b0002': [
      {
        'id': 'a00003',
        'model': 'Ryzen4900',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00004',
        'model': 'Ryzen2700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00005',
        'model': 'Vega64',
        'type': 'Accessory',
        'number': 1000
      }
    ],
    'c0003': [
      {
        'id': 'a00006',
        'model': 'Vega56',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00007',
        'model': 'Vega40',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00008',
        'model': 'AMD370',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00009',
        'model': 'AMD560',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'id': 'a00010',
        'model': 'AMD580',
        'type': 'Accessory',
        'number': 1000
      }
    ]
  }

  let equipment = {
    'a0001': [
      {
        'id': 'e10001',
        'model': 'GTX1080',
        'type': 'Equipment',
      },
      {
        'id': 'e10002',
        'model': 'GTX2080',
        'type': 'Equipment'
      },
    ],
    'b0002': [
      {
        'id': 'e10003',
        'model': 'GTX3080',
        'type': 'Equipment'
      },
      {
        'id': 'e10004',
        'model': 'GTX1080',
        'type': 'Equipment'
      },
      {
        'id': 'e10005',
        'model': 'GTX980',
        'type': 'Equipment'
      }
    ],
    'c0003': [
      {
        'id': 'e10006',
        'model': 'GTX3080',
        'type': 'Equipment'
      },
      {
        'id': 'e10007',
        'model': 'GTX2080',
        'type': 'Equipment'
      },
      {
        'id': 'e10008',
        'model': 'GTX1080',
        'type': 'Equipment'
      },
      {
        'id': 'e10009',
        'model': 'i7-8700k',
        'type': 'Equipment'
      },
      {
        'id': 'e10010',
        'model': 'i7-8700k',
        'type': 'Equipment'
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
    // return differs according type
  }
}



Mock.mock(/\/warehouse\/allAddress/, 'get', allAddress)
Mock.mock(/\/warehouse\/allWarehouse/, 'get', allWarehouse)
Mock.mock(/\/warehouse\/detail/, 'post', detail)
Mock.mock(/\/warehouse\/goods/, 'post', goods)
Mock.mock(/\/warehouse\/preview/, 'get', preview)
Mock.mock(/\warehouse\/schedule/, 'post', schedule)
