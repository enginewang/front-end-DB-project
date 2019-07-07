import Mock from 'mockjs2'

const address = () => {
  return {
    'data': [
      '杨浦区',
      '嘉定区'
    ]
  }
}

const all = () => {
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

const goods = (data) => {
  let accessory = [
    [
      {
        'key': 1,
        'model': 'Ryzen3700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 2,
        'model': 'Ryzen3900',
        'type': 'Accessory',
        'number': 2000
      },
    ],
    [
      {
        'key': 3,
        'model': 'Ryzen4900',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 4,
        'model': 'Ryzen2700',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 5,
        'model': 'Vega64',
        'type': 'Accessory',
        'number': 1000
      }
    ],
    [
      {
        'key': 6,
        'model': 'Vega56',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 7,
        'model': 'Vega40',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 8,
        'model': 'AMD370',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 9,
        'model': 'AMD560',
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 10,
        'model': 'AMD580',
        'type': 'Accessory',
        'number': 1000
      }
    ]
  ]

  let equipment = [
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
        'type': 'Accessory',
        'number': 1000
      },
      {
        'key': 10,
        'id': 10010,
        'model': 'i7-8700k',
        'type': 'Accessory',
        'number': 1000
      }
    ]
  ]
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
        'key': 1,
        'id': 1,
        'icon': 0,
        'name': '嘉定仓库',
        'address': '嘉定区'
      },
      {
        'key': 2,
        'id': 2,
        'icon': 1,
        'name': '四平仓库',
        'address': '杨浦区'
      },
      {
        'key': 3,
        'id': 3,
        'icon': 2,
        'name': '五角场仓库',
        'address': '杨浦区'
      }
    ]
  }
}




Mock.mock(/\/warehouse\/address/, 'get', address)
Mock.mock(/\/warehouse\/all/, 'get', all)
Mock.mock(/\/warehouse\/detail/, 'post', detail)
Mock.mock(/\/warehouse\/goods/, 'post', goods)
Mock.mock(/\/warehouse\/preview/, 'get', preview)
