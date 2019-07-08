import Mock from 'mockjs2'

const workSheet = () => {
  return [
    {
      'id': 'WKS20000001',
      'equipID': 'EQ10000001',
      'repairerID': 'RSF15000001',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'work_picture': '/avatar.jpg'
    },
    {
      'id': 'WKS20000002',
      'equipID': 'EQ10000002',
      'repairerID': 'RSF15000008',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000003',
      'work_picture': '/avatar2.jpg'
    },
    {
      'id': 'WKS20000003',
      'equipID': 'EQ10000003',
      'repairerID': 'RSF15000005',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000008',
      'work_picture': '/avatar.jpg'
    }
  ]
}

const workSheetRow = (data) => {
  let wData ={
    'WKS20000003':[
      {
      'id': 'WKS20000001',
      'equipID': 'EQ10000001',
      'repairerID': 'RSF15000001',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'work_picture': '/avatar.jpg',
    },
    {
      'id': 'WK20000002',
      'equipID': 'EQ10000002',
      'repairerID': 'RSF15000008',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000003',
      'work_picture': '/avatar2.jpg'
    }],
    'WKS20000002':[
      {
      'id': 'WKS20000001',
      'equipID': 'EQ10000001',
      'repairerID': 'RSF15000001',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'work_picture': '/avatar.jpg',
    },
    {
      'id': 'WKS20000003',
      'equipID': 'EQ10000003',
      'repairerID': 'RSF15000005',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000008',
      'work_picture': '/avatar.jpg'
    }]
  }
  
  let deleteInfo = 'ok'
  return {
    'data': {
      wData: wData[data.body],
      deleteInfo: deleteInfo
    }
  }
}

const checkSheet = () => {
  var prefix1 = 'CST'
  var prefix2 = 'CSF'
  var prefix3 = 'EQ'
  return [
    {
      'id': prefix1 + String(22000001),
      'potrolID': prefix2 + String(15000001),
      'eqID': prefix3 + String(10000001),
      'checkArea': '上海市嘉定区',
      'checkTime': '2019.07.07',
      'checkPic': '/avatar.jpg'
    },
    {
      'id': prefix1 + String(22000002),
      'potrolID': prefix2 + String(15000003),
      'eqID': prefix3 + String(10000004),
      'checkArea': '上海市杨浦区',
      'checkTime': '2019.07.08',
      'checkPic': '/avatar2.jpg'
    }
  ]
}


Mock.mock(/\/sheets\/workSheet/, 'get', workSheet)
Mock.mock(/\/sheets\/checkSheet/, 'get', checkSheet)
Mock.mock(/\/sheets\/workSheetRow/, 'delete', workSheetRow)
