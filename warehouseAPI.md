## API for Warehouse

```
{
    name: getWarehousePreview
    url: api/warehouse/previewData
    method: get
    params: none
}
说明: 该API请求后端发送基本的仓库信息,包括仓库的ID, name, address, icon
```

```
{
    name: getWarehouseDetail
    url:  api/warehouse/detailData
    method: get
    params: {
        id: xxxxxx
    }
}
说明: 该API请求后端发送ID为xxxxxx仓库的配件或者器材信息,包括器材/配件的编号,型号,类别,数量
发送的参数格式如上params
```

```
{
    name: getAllWarehouse
    url: api/warehouse/all
    method: get
    params: none
}
说明: 该API请求后端发送所有的仓库的信息,包括仓库的ID,name
```
