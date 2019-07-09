import Mock from 'mockjs2'

const equipmentUsing = () => {
  return {
    'data': [
    {
      id: "10001",
      type: '哑铃',
      status: '1',
      model: 'GTX 1080',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "10002",
      type: '跑步机',
      status: '0',
      model: 'GTX 690',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "10003",
      type: '篮球',
      status: '0',
      model: 'i9-9900k',
      address: 'Tongji University, Shanghai'
    },
    {
      id: "10004",
      type: '足球',
      status: '1',
      model: 'i7-8700k',
      address: 'Huangdu Institute Of Technology, Jiangsu'
    },
    {
      id: "10005",
      type: '羽毛球',
      status: '1',
      model: 'i7-6820hq',
      address: 'Tongji University, Shanghai'
    },
  ]
  }
}

const equipmentDetail = ( data ) => {
  let equipdetail = {
    '10001':
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
    '10002':
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
    '10003':
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
    '10004':
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
    '10005':
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

const equipmentStored = () => {
  return {
    data: [
      {
        id: '10001',
        name: '哑铃',
        icon: '/equipment/yl.png',
        productTime: '2019-01-01 00:00:00',
        status: '0',
        model: 'GTX 1080',
        price: '100',
        warehouse: '四平仓库'
      },
      {
        id: '10002',
        name: '杠铃',
        icon: '/equipment/gl.png',
        productTime: '2019-01-02 08:00:00',
        status: '1',
        model: 'GTX 2080',
        price: '110',
        warehouse: '嘉定仓库'
      },
      {
        id: '10003',
        name: '泳镜',
        icon: '/equipment/yj.png',
        productTime: '1926-08-17 00:00:00',
        status: '0',
        model: 'i7 8700k',
        price: '70',
        warehouse: '五角场仓库'
      },
      {
        id: '10004',
        name: '乒乓球',
        icon: '/equipment/ppq.png',
        productTime: '1234-05-06 07:08:09',
        status: '1',
        model: 'i9 9900k',
        price: '90',
        warehouse: '四平仓库'
      },
      {
        id: '10005',
        name: '跑步机',
        icon: '/equipment/pbj.png',
        productTime: '2019-07-09 09:00:00',
        status: '0',
        model: 'GTX 690',
        price: '200',
        warehouse: '嘉定仓库'
      },
    ]
  }
}

const allEquipmentType = () => {
  return {
    'data': [
      '跑步机',
      '杠铃',
      '篮球',
      '羽毛球',
      '乒乓球',
    ]
  }
}

Mock.mock(/\/equipment\/using/, 'get', equipmentUsing);
Mock.mock(/\/equipment\/detail/, 'post', equipmentDetail);
Mock.mock(/\/equipment\/stored/, 'get', equipmentStored);
Mock.mock(/\/equipment\/allType/, 'get', allEquipmentType);
