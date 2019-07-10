import Mock from 'mockjs2'

// url:'repairSheet/allRepairSheet'
//method: 'get'
//得到所有报修单的指定信息
const allRepairSheet = () => {
  return {
    data: [{
        
        'title': 'RST 1',
        'cover': '/avatar2.jpg',
        'type': '修理类型：2',
        'state': '0',
        'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
        'eqInStore':[{
          'type':'履带',
          'model':'GTX'
        },
      {
        'type':'履带',
        'model':'GTX'
      },{
        'type':'履带',
        'model':'GTX'
      }],//仓库所有器材的类型和型号的数组
      'repairStaff':[
        {
          'repairId':'RSF15000007',
          'repairName':'王小明'
        },
        {
          'repairId':'RSF15000017',
          'repairName':'李小华'
        }
      ]//所有可调度维修员的id和名字数组，按这种格式，最好按到维修器材的距离排序

        

    },
    {
        
        'title': 'RST2',
        'cover': '/avatar.jpg',
        'type': '修理类型:2',
        'state': '1',
    },
    {
      
      'title': 'RST3',
      'cover': '/avatar.jpg',
      'type': '修理类型:2',
      'state': '2',
  },

  {
    
    'title': 'RST4',
    'cover': '/avatar.jpg',
    'type': '修理类型:2',
    'state': '0',
},

{

  'title': 'RST5',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '1',
},

{

  'title': 'RST6',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '2',
},

{

  'title': 'RST7',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '0',
},

{

  'title': 'RST8',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '1',
},

{

  'title': 'RST9',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '2',
}

    ]
  }
}

Mock.mock(/\/repairSheet\/allRepairSheet/, 'get', allRepairSheet)