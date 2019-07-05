import Mock from 'mockjs2'

const warehouseMock = () => {
  return [
    {
      'key': 1,
      'id': 1,
      'name': 'name1',
      'address': 'address1',
      'area': 10
    },
    {
      'key': 2,
      'id': 2,
      'name': 'name2',
      'address': 'address2',
      'area': 20
    },
    {
      'key': 3,
      'id': 3,
      'name': 'name3',
      'address': 'address3',
      'area': 30
    }
  ]
}

Mock.mock(/\/warehouse/, 'get', warehouseMock)
