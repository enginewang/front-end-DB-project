import Mock from 'mockjs2'

const equipmentUsing = () => {
  return [
    {
      id: "EQ10001",
      type: '哑铃',
      status: '1',
      damage: '0.9',
      model: 'GTX1080',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "EQ10002",
      type: '跑步机',
      status: '2',
      damage: '0.8',
      model: '32GB',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "EQ10003",
      type: '篮球',
      status: '0',
      damage: '0.5',
      model: 'i9-9900k',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "EQ10004",
      type: '足球',
      status: '3',
      damage: '0.9',
      model: 'i7-8700k',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "EQ10005",
      type: '羽毛球',
      status: '1',
      damage: '0.4',
      model: 'i7-6820hq',
      address: 'Tongji University, Shanghai'
    },
  ]
}

const equipmentDetail = ( data ) => {
  let equipdetail = {
    'EQ10001':
    {
      name: '哑铃',
      factory_time: '2019.07.01',
      install_time: '2019.07.07',
      using_time: '6 days',
      unit: '同济大学',
      address: '上海市嘉定区曹安公路4800号',
      if_damage: '已损坏',
      order: '20190707',
    },
    'EQ10002':
    {
      name: '跑步机',
      factory_time: '2019.07.01',
      install_time: '2019.07.07',
      using_time: '6 days',
      unit: '清华大学',
      address: '上海市嘉定区曹安公路4800号',
      if_damage: '已损坏',
      order: '20190707',
    },
    'EQ10003':
    {
      name: '篮球',
      factory_time: '2019.07.01',
      install_time: '2019.07.07',
      using_time: '6 days',
      unit: '复旦大学',
      address: '上海市嘉定区曹安公路4800号',
      if_damage: '已损坏',
      order: '20190707',
    },
    'EQ10004':
    {
      name: '足球',
      factory_time: '2019.07.01',
      install_time: '2019.07.07',
      using_time: '6 days',
      unit: '脚痛大学',
      address: '上海市嘉定区曹安公路4800号',
      if_damage: '已损坏',
      order: '20190707',
    },
    'EQ10005':
    {
      name: '羽毛球',
      factory_time: '2019.07.01',
      install_time: '2019.07.07',
      using_time: '6 days',
      unit: '上海大学',
      address: '上海市嘉定区曹安公路4800号',
      if_damage: '已损坏',
      order: '20190707',
    },
  }
  return {
    'data': equipdetail[data.body]
  }
}


const equipmentAll = () => {
  return [
    {
      id: "EQ10001",
      name: '哑铃',
      icon: 'XX',
      modelID: '1001',
      price: '100',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: "EQ10002",
      name: '篮球',
      icon: 'XX',
      modelID: '1002',
      price: '110',
      count: '100',
      warehouseID: 'wh3'
    },
    {
      id: "EQ10003",
      name: '足球',
      icon: 'XX',
      modelID: '1003',
      price: '70',
      count: '200',
      warehouseID: 'wh2'
    },
    {
      id: "EQ10004",
      name: '羽毛球',
      icon: 'XX',
      modelID: '1004',
      price: '90',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: "EQ10005",
      name: '跑步机',
      icon: 'XX',
      modelID: '1005',
      price: '200',
      count: '200',
      warehouseID: 'wh2'
    },
  ]
}

Mock.mock( /\/equipment\/using/, 'get', equipmentUsing )
Mock.mock( /\/equipment\/detail/, 'post', equipmentDetail )
Mock.mock( /\/equipment\/all/, 'get', equipmentAll )
