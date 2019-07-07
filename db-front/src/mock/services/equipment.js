import Mock from 'mockjs2'

const equipmentUsing = () => {
  return [
    {
      id: 1,
      type: '哑铃',
      status: '正常',
      damage: '0.9',
      model: 'GTX1080',
      address: 'Tongji University, Shanghai'
    },
    {
      id: 2,
      type: '跑步机',
      status: '损坏',
      damage: '0.8',
      model: '32GB',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: 3,
      type: '篮球',
      status: '正常',
      damage: '0.5',
      model: 'i9-9900k',
      address: 'Tongji University, Shanghai'
    },
    {
      id: 4,
      type: '足球',
      status: '维修中',
      damage: '0.9',
      model: 'i7-8700k',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: 5,
      type: '羽毛球',
      status: '正常',
      damage: '0.4',
      model: 'i7-6820hq',
      address: 'Tongji University, Shanghai'
    },
  ]
}

const equipmentAll = () => {
  return [
    {
      id: 1,
      name: '哑铃',
      icon: 'XX',
      modelID: '1001',
      price: '100',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: 2,
      name: '篮球',
      icon: 'XX',
      modelID: '1002',
      price: '110',
      count: '100',
      warehouseID: 'wh3'
    },
    {
      id: 3,
      name: '足球',
      icon: 'XX',
      modelID: '1003',
      price: '70',
      count: '200',
      warehouseID: 'wh2'
    },
    {
      id: 4,
      name: '羽毛球',
      icon: 'XX',
      modelID: '1004',
      price: '90',
      count: '200',
      warehouseID: 'wh1'
    },
    {
      id: 5,
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
