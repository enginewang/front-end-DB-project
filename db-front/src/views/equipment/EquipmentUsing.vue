<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form class="ant-advanced-search-form" :form="form" layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="equipType" placeholder="请选择" default-value="0">
                <a-select-option value="0">类型1</a-select-option>
                <a-select-option value="1">类型2</a-select-option>
                <a-select-option value="2">类型3</a-select-option>
              </a-select>
            </a-form-item>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="5" :sm="25">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="onClickSubmit" :disabled="emptyInput" >查询</a-button>
              <a-button style="margin-left: 8px" type="danger" @click="onClickClearSelect" :disabled="emptyInput" ghost>重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <a-table :columns="columns" :dataSource="wData" bordered>
      <template
              v-for="col in ['id','name', 'address','area']"
              :slot="col"
              slot-scope="text, record"
      >
        <div :key="col">
          <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">确认</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              &nbsp;&nbsp;&nbsp;&nbsp;<a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </a-card>
</template>

<script>
    const columns = [{
        title: '器材id',
        dataIndex: 'id',
        width: '15%',
        scopedSlots: { customRender: 'id' }
    }, {
        title: '类别',
        dataIndex: 'type',
        width: '10%',
        scopedSlots: { customRender: 'type' }
    }, {
        title: '使用状态',
        dataIndex: 'status',
        width: '10%'

    }, {
        title: '损坏',
        dataIndex: 'damage',
        width: '10%',
        scopedSlots: { customRender: 'damage' }
    }, {
        title: '型号',
        dataIndex: 'model',
        width: '15%',
        scopedSlots: { customRender: 'model' }
    }, {
        title: '地址',
        dataIndex: 'address',
        width: '30%',
        scopedSlots: { customRender: 'address' }
    }]
    const wData = []
    for (let i = 0; i < 100; i++) {
        wData.push({
            key: i.toString(),
            id: i.toString(),
            name: `Edrward ${i}`,
            address: `London Park no. ${i}`,
            area: 32
        })
    }
    export default {
        name: 'equipment',
        data () {
            this.cacheData = wData.map(item => ({ ...item }))
            return {
                attribute: [
                    { type: 'type', cnType: '类别', guide: '类别筛选' }
                ],
                equipmentData: {
                    type: '',
                },
                wData,
                columns,
                advanced: false,
                form: this.$form.createForm(this),
                queryParam: {},
                loadData: parameter => {
                    console.log('loadData.parameter', parameter)
                    return getServiceList(Object.assign(parameter, this.queryParam))
                        .then(res => {
                            return res.result
                        })
                },
            }
        },
        computed: {
            emptyInput () {
                if (this.equipmentData.id !== '' || this.equipmentData.name !== '' || this.equipmentData.address !== '' || this.equipmentData.area !== '') {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            onClickClearSelect () {
                this.equipmentData.type = ''
            },
            onClickSubmit () {
                console.log(this.equipmentData)
                this.onClickClearSelect()
            },
            handleChange (value, key, column) {
                const newData = [...this.wData]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target[column] = value
                    this.wData = newData
                }
            },
            edit (key) {
                const newData = [...this.wData]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    target.editable = true
                    this.wData = newData
                }
            },
            save (key) {
                const newData = [...this.wData]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    delete target.editable
                    this.wData = newData
                    this.cacheData = newData.map(item => ({ ...item }))
                }
            },
            cancel (key) {
                const newData = [...this.wData]
                const target = newData.filter(item => key === item.key)[0]
                if (target) {
                    Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
                    delete target.editable
                    this.wData = newData
                }
            },
            toggleAdvanced () {
                this.advanced = !this.advanced
            },
          resetSearchForm () {
            this.queryParam = {
              date: moment(new Date())
            }
          }
        }
    }
</script>

<style lang="less" scoped>
  @import '~ant-design-vue/lib/style/themes/default.less';
  .button-group {
    margin-bottom: 1rem;
    .button {
      margin-left: 0.5rem;
      margin-left: 0.5rem;
    }
  }
  .ant-form-inline .ant-form-item {
    display: inline-block;
    margin-right: 0;
  }
  .ant-form-item-control-wrapper{
    width: 100px;
  }
  .table-page-search-wrapper .ant-form-inline .ant-form-item .ant-form-item-control-wrapper {
    width: 100%;
  }
</style>
