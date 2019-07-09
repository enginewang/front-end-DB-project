import Mock from 'mockjs2'

const workSheet = () => {
  return [
    {
      'key': 1,
      'id': 20000001,
      'equipID': 10000001,
      'repairerID': 15000001,
      'repairArea': '上海市黄浦区',
      'statue': '0',
      'dispatcherID': 15000002,
      'work_picture': '/avatar.jpg'
    },
    {
      'key': 2,
      'id': 20000002,
      'equipID': 10000002,
      'repairerID': 15000002,
      'repairArea': '上海市浦东区',
      'statue': '1',
      'dispatcherID': 15000003,
      'work_picture': '/avatar2.jpg'
    }
  ]
}

const checkSheet = () => {
  var prefix1 = 'CST'
  var prefix2 = 'CSF'
  var prefix3 = 'EQ'
  return [
    {
      'key': 1,
      'id': prefix1 + String(22000001),
      'potrolID': prefix2 + String(15000001),
      'eqID': prefix3 + String(10000001),
      'checkArea': '上海市嘉定区',
      'checkTime': '2019.7.7'
    },
    {
      'key': 2,
      'id': prefix1 + String(22000002),
      'potrolID': prefix2 + String(15000003),
      'eqID': prefix3 + String(10000004),
      'checkArea': '上海市杨浦区',
      'checkTime': '2019.7.8'
    }
  ]
}

Mock.mock(/\/sheets\/workSheet/, 'get', workSheet)
Mock.mock(/\/sheets\/checkSheet/, 'get', checkSheet)
