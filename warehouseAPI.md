# 仓库API(warehouseAPI)

```
name: getWarehousePreview
url: api/warehouse/preview
method: 'get'

return: {
  'data': [
    {
      'id': 'a0001', // 代表ID, string
      'icon': 0, // 代表图片路径, URL(string)
      'name': '嘉定仓库', // 代表名称, string
      'address': '嘉定区' // 代表地址, string
    },
    {
      'id': 'b0002',
      'icon': 1,
      'name': '四平仓库',
      'address': '杨浦区'
    },
    {
      'id': 'c0003',
      'icon': 2,
      'name': '五角场仓库',
      'address': '杨浦区'
    }
  ]
}
```

```
name: postWarehouseDetail
url: api/warehouse/detail
method: 'post'
data: ID //  string, 发送详细的仓库ID, 存放在请求的body处, 请求返回仓库的详细信息

return: {
  'data': {
    'name': '四平仓库', // 该仓库的名称
    'address': '杨浦区', // 该仓库的地区
    'detailAddress': '四平路1239号' //该仓库的详细地址
  }
}
```

```
name: getAllAddress
url: api/warehouse/allAddress
method: 'get'

return: { // 请求的返回值为一个数组,存放所有的有仓库的地址
  'data': [
    {
      'name': '杨浦区', // string
    },
    {
      'name': '嘉定区'
    }
  ]
}
```

```
name: getAllWarehouse
url: api/warehouse/allWarehouse
method: 'get'

return: { // 请求的返回值是一个数组,存放所有的仓库名字而不是ID, 用于调度.此处请确保仓库名是key
  'data': {
    {
      'name': '嘉定仓库' // string
    },
    {
      'name': '四平仓库'
    },
    {
      'name': '五角场仓库'
    }
  }
}
```

```
name: postGoods
url: api/warehouse/goods
method: 'post'
data: ID // string, 为仓库的ID, 存放在整个请求的body处, 请求返回ID的仓库的所有器材以及配件信息

return: {// 请求的返回值是两个数组,一个名为 accessory, 一个名为 equipment
  'data': {
    accessory: [
      {
        'model': 'Ryzen3700', // key, string
        'type': 'Accessory', // string
        'number': 1000 // int
      },
      {
        'model': 'Ryzen3900',
        'type': 'Accessory',
        'number': 2000
      },
    ],
    equipment: [
      {
        'id': '10001', // key string
        'model': 'GTX1080', // string
        'type': 'Equipment', // string
        'number': 1000 // int
      },
      {
        'id': '10002',
        'model': 'GTX2080',
        'type': 'Equipment',
        'number': 2000
      }
    ]
  }
}
```
