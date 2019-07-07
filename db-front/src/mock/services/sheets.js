import Mock from 'mockjs2'

const workSheet = () => {
  return [
    {
      'key': 1,
      'id': 20000001,
      'equipID': 10000001,
      'repairerID': 15000001,
      'statue': 0,
      'dispatcherID': 15000002,
      'work_picture': '/avatar.jpg'
    },
    {
      'key': 2,
      'id': 20000002,
      'equipID': 10000002,
      'repairerID': 15000002,
      'statue': 1,
      'dispatcherID': 15000003,
      'work_picture': '/avatar2.jpg'
    }
  ]
}

Mock.mock(/\/sheets\/workSheet/, 'get', workSheet)
