import Mock from 'mockjs2'

const workSheet = () => {
  return [
    {
      'id': 'WKS20000001',
      'equipID': 'EQ10000001',
      'repairerID': 'RSF15000001',
      'repairerName': '高比离',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'dispatcherName':'撒尔达',
      'work_picture': '/avatar.jpg'
    },
    {
      'id': 'WKS20000002',
      'equipID': 'EQ10000002',
      'repairerID': 'RSF15000008',
      'repairerName': '林克',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000003',
      'dispatcherName':'甄科帕',
      'work_picture': '/avatar2.jpg'
    },
    {
      'id': 'WKS20000003',
      'equipID': 'EQ10000003',
      'repairerID': 'RSF15000005',
      'repairerName': '肖撒',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000008',
      'dispatcherName':'甄建康',
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
      'repairerName': '高比离',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'dispatcherName':'撒尔达',
      'work_picture': '/avatar.jpg',
    },
    {
      'id': 'WK20000002',
      'equipID': 'EQ10000002',
      'repairerID': 'RSF15000008',
      'repairerName': '林克',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000003',
      'dispatcherName':'甄科帕',
      'work_picture': '/avatar2.jpg'
    }],
    'WKS20000002':[
      {
      'id': 'WKS20000001',
      'equipID': 'EQ10000001',
      'repairerName': '高比离',
      'repairerID': 'RSF15000001',
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 'DSF15000002',
      'dispatcherName':'撒尔达',
      'work_picture': '/avatar.jpg',
    },
    {
      'id': 'WKS20000003',
      'equipID': 'EQ10000003',
      'repairerID': 'RSF15000005',
      'repairerName': '肖撒',
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 'DSF15000008',
      'dispatcherName':'甄建康',
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
      'potrolName': '伊沪健',
      'eqID': prefix3 + String(10000001),
      'checkArea': '上海市嘉定区',
      'checkTime': '2019.07.07',
      'checkPic': '/avatar.jpg'
    },
    {
      'id': prefix1 + String(22000002),
      'potrolID': prefix2 + String(15000003),
      'potrolName': '季共奇',
      'eqID': prefix3 + String(10000004),
      'checkArea': '上海市杨浦区',
      'checkTime': '2019.07.08',
      'checkPic': '/avatar2.jpg'
    },
    {
      'id': prefix1 + String(22000006),
      'potrolID': prefix2 + String(15000067),
      'potrolName': '古童思',
      'eqID': prefix3 + String(10000027),
      'checkArea': '上海市浦东区',
      'checkTime': '2019.07.09',
      'checkPic': '/avatar2.jpg'
    }
  ]
}

const checkSheetRow = (data) => {
  var prefix1 = 'CST'
  var prefix2 = 'CSF'
  var prefix3 = 'EQ'
  let Data ={
    'CST22000006':[
      {
        'id': prefix1 + String(22000001),
        'potrolID': prefix2 + String(15000001),
        'potrolName': '伊沪健',
        'eqID': prefix3 + String(10000001),
        'checkArea': '上海市嘉定区',
        'checkTime': '2019.07.07',
        'checkPic': '/avatar.jpg'
    },
    {
      'id': prefix1 + String(22000002),
      'potrolID': prefix2 + String(15000003),
      'potrolName': '季共奇',
      'eqID': prefix3 + String(10000004),
      'checkArea': '上海市杨浦区',
      'checkTime': '2019.07.08',
      'checkPic': '/avatar2.jpg'
    }],
    'CST22000002':[
      {
        'id': prefix1 + String(22000001),
        'potrolID': prefix2 + String(15000001),
        'potrolName': '伊沪健',
        'eqID': prefix3 + String(10000001),
        'checkArea': '上海市嘉定区',
        'checkTime': '2019.07.07',
        'checkPic': '/avatar.jpg'
    },
    {
      'id': prefix1 + String(22000006),
      'potrolID': prefix2 + String(15000067),
      'potrolName': '古童思',
      'eqID': prefix3 + String(10000027),
      'checkArea': '上海市浦东区',
      'checkTime': '2019.07.09',
      'checkPic': '/avatar2.jpg'
    }],
    'CST22000001':[
      {
        'id': prefix1 + String(22000002),
        'potrolID': prefix2 + String(15000003),
        'potrolName': '季共奇',
        'eqID': prefix3 + String(10000004),
        'checkArea': '上海市杨浦区',
        'checkTime': '2019.07.08',
        'checkPic': '/avatar2.jpg'
    },
    {
      'id': prefix1 + String(22000006),
      'potrolID': prefix2 + String(15000067),
      'potrolName': '古童思',
      'eqID': prefix3 + String(10000027),
      'checkArea': '上海市浦东区',
      'checkTime': '2019.07.09',
      'checkPic': '/avatar2.jpg'
    }]
  }
  
  let deleteInfo = 'ok'
  return {
    'data': {
      Data: Data[data.body],
      deleteInfo: deleteInfo
    }
  }
}


Mock.mock(/\/sheets\/workSheet/, 'get', workSheet)
Mock.mock(/\/sheets\/checkSheet/, 'get', checkSheet)
Mock.mock(/\/sheets\/workSheetRow/, 'delete', workSheetRow)
Mock.mock(/\/sheets\/checkSheetRow/, 'delete', checkSheetRow)
