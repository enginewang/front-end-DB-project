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
        

        

    },
    {
        
        'title': 'RST2',
        'cover': '/avatar.jpg',
        'type': '修理类型:2',
        'state': '1',
        'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
        
    },
    {
      
      'title': 'RST3',
      'cover': '/avatar.jpg',
      'type': '修理类型:2',
      'state': '2',
      'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
  },

  {
    
    'title': 'RST4',
    'cover': '/avatar.jpg',
    'type': '修理类型:2',
    'state': '0',
    'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
},

{

  'title': 'RST5',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '1',
  'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
},

{

  'title': 'RST6',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '2',
  'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
},

{

  'title': 'RST7',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '0',
  'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
},

{

  'title': 'RST8',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '1',
  'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
},

{

  'title': 'RST9',
  'cover': '/avatar.jpg',
  'type': '修理类型:2',
  'state': '2',
  'details':'把手损坏，油漆脱落',//报修单详细信息的损坏描述部分
        'stuffNeeded':'齿轮 GPX x3',//报修单详细信息部分的器件需求部分
        'telNumber':'12332532',//报修用户的电话
}

  ],
  
  
    
  }
}

Mock.mock(/\/repairSheet\/allRepairSheet/, 'get', allRepairSheet)