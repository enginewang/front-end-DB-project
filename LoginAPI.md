```
name: login
url: 'api/auth/login'
method: 'post'
data: {
    password: '21232f297a57a5a743894a0e4a801fc3'， // string, 加密方式是md5
    username: 'admin'
}

// 如果登陆失败,code 401, 返回一条"登陆错误"在message里面
return: {
    result: { // 之所以叫result不是data, 是因为这个API不是我写的, 而是这个管理系统提供的
        avatar: "https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png" // URL, 为头像
        deleted: 0 // 0 应该代表没被删除
        password: "" // 放空
        roleId: "admin" // 表示是否是管理员, 这个值只有两种, 一种是user, 一种admin, 重要
        status: 1 // 返回1应该表示正常
        token: "4291d7da9005377ec9aec4a71ea837f"
        username: "admin" // 用户名, 不等于roleID
    } 
}
```

```
name: logout
url: 'api/auth/logout'
method: 'post'
data: {
    token: "4291d7da9005377ec9aec4a71ea837f"
}

return: {
    // 空, 不需要返回值
    // 也可以返回在message里面, 告诉本地退出成功
}
```

```
name: postInfo
url: '/api/user/info'
method: 'post'
data: token // 请求者的token

return: {
    result: {
        'id': '4291d7da9005377ec9aec4a71ea837f', // 此处和token一样,不知道是否是必要
        'name': '王小明', 
        'username': 'admin',
        'password': '',
        'telephone': '',
        'avatar': '/avatar.jpg',
        'status': 1, // 1代表在用
        'deleted': 0,
        'roleId': 'admin', // 重要
        'role': { // 重要
            'id': 'admin',
            'name': '管理员',
            'describe': '拥有所有权限',
            'status': 1,
            'deleted': 0,
            'permissions': [{
              'roleId': 'admin',
              'permissionId': 'super', // 重要, 如果 roleID是 user, 此处放空
              'permissionName': '超级权限',
            }]
        }
    }
}
```
