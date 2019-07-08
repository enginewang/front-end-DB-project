import Mock from 'mockjs2'

const equipmentUsing = () => {
  return [
    {
      id: "eq10001",
      type: '哑铃',
      status: '1',
      damage: '0.9',
      model: 'GTX1080',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "eq10002",
      type: '跑步机',
      status: '2',
      damage: '0.8',
      model: '32GB',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "eq10003",
      type: '篮球',
      status: '0',
      damage: '0.5',
      model: 'i9-9900k',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "eq10004",
      type: '足球',
      status: '3',
      damage: '0.9',
      model: 'i7-8700k',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "eq10005",
      type: '羽毛球',
      status: '1',
      damage: '0.4',
      model: 'i7-6820hq',
      address: 'Tongji University, Shanghai'
    },
  ]
}

const equipmentAll = () => {
  return [
    {
      id: "eq10001",
      name: '哑铃',
      icon: 'XX',
      modelID: '1001',
      price: '100',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: "eq10002",
      name: '篮球',
      icon: 'XX',
      modelID: '1002',
      price: '110',
      count: '100',
      warehouseID: 'wh3'
    },
    {
      id: "eq10003",
      name: '足球',
      icon: 'XX',
      modelID: '1003',
      price: '70',
      count: '200',
      warehouseID: 'wh2'
    },
    {
      id: "eq10004",
      name: '羽毛球',
      icon: 'XX',
      modelID: '1004',
      price: '90',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: "eq10005",
      name: '跑步机',
      icon: 'XX',
      modelID: '1005',
      price: '200',
      count: '200',
      warehouseID: 'wh2'
    },
  ]
}

Mock.mock(/\/equipment\/using/, 'get', equipmentUsing)
Mock.mock(/\/equipment\/all/, 'get', equipmentAll)
