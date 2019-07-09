import Mock from 'mockjs2'
import {builder} from '../util'

const info = ( options ) => {
  console.log( 'options', options )
  const userInfo = {
    'id': '4291d7da9005377ec9aec4a71ea837f',
    'name': '王小明',
    'username': 'admin',
    'password': '',
    'avatar': '/avatar.jpg',
    'status': 1,
    'deleted': 0,
    'roleId': 'admin',
    'role': {}
  }
  // role
  const roleObj = {
    'id': 'admin',
    'name': '管理员',
    'describe': '拥有所有权限',
    'status': 1,
    'deleted': 0,
    'permissions': [{
      'roleId': 'admin',
      'permissionId': 'super',
      'permissionName': '超级权限',
    }]
  }


  userInfo.role = roleObj
  return builder( userInfo )
}

Mock.mock( /\/api\/user\/info/, 'get', info )
