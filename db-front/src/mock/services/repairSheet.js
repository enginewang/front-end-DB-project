import Mock from 'mockjs2'

// url:'repairSheet/allRepairSheet'
//method: 'get'
//得到所有报修单的指定信息
const allRepairSheet = () => {
  return {
    data: [{
        'id':'1223345',
        'title': 'ID:1223345',
        'cover': '/avatar2.jpg',
        'type': '修理类型:1',
        'state': '状态:3',
        

    },
    {
        'id':'1223345',
        'title': 'ID:678900',
        'cover': '/avatar.jpg',
        'type': '修理类型:2',
        'state': '状态:4',
    }

    ]
  }
}

Mock.mock(/\/repairSheet\/allRepairSheet/, 'get', allRepairSheet)