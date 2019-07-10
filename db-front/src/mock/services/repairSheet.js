import Mock from 'mockjs2'

// url:'repairSheet/allRepairSheet'
//method: 'get'
//得到所有报修单的指定信息
const allRepairSheet = () => {
  return {
    data: [{
        title: 'ID:1223345',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        type: '修理类型:1',
        state: '状态:3',
        

    },
    {
        title: 'ID:678900',
        cover: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
        type: '修理类型:2',
        state: '状态:4',
    }

    ]
  }
}

Mock.mock(/\/repairSheet\/allRepairSheet/, 'get', allRepairSheet)