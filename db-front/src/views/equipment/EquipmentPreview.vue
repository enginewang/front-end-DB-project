<template>
  <a-card :bordered="false">
    <div>
      <!--
      <a-form class="ant-advanced-search-form" :form="form" layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="30" v-for="( item,index ) in attribute" :key="index">
            <a-form-item :label="item.cnType">
              <a-input :placeholder="item.guide" v-model="equipmentData[item.type]"/>
            </a-form-item>
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
      -->
    </div>
    <br>
    <a-table :columns="columns" :dataSource="eData" rowKey="id" bordered>
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
  import {getEquipmentAllList} from '@/api/equipment'

  const columns = [{
    title: '器材id',
    dataIndex: 'id',
    width: '15%',
    scopedSlots: {customRender: 'id'},
    sorter: (a, b) => a.id - b.id
  }, {
    title: '名称',
    dataIndex: 'name',
    width: '10%',
    scopedSlots: {customRender: 'name'}
  }, {
    title: '图标',
    dataIndex: 'icon',
    width: '10%',
    scopedSlots: {customRender: 'icon'}
  }, {
    title: '型号编号',
    dataIndex: 'modelID',
    width: '15%',
    scopedSlots: {customRender: 'modelID'}
  }, {
    title: '价格',
    dataIndex: 'price',
    width: '10%',
    scopedSlots: {customRender: 'price'},
    sorter: (a, b) => a.price - b.price
  }, {
    title: '数量',
    dataIndex: 'count',
    width: '10%',
    scopedSlots: {customRender: 'count'},
    sorter: (a, b) => a.count - b.count
  }, {
    title: '所在仓库',
    dataIndex: 'warehouseID',
    width: '10%',
    scopedSlots: {customRender: 'storehouse'},
    filters: [{
      text: '仓库1',
      value: 'wh1'
    },
      {
        text: '仓库2',
        value: 'wh2'
      },
      {
        text: '仓库3',
        value: 'wh3'
      }],
    onFilter: (value, record) => record.warehouseID.indexOf(value) === 0
  },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: {customRender: 'operation'}
    }]
  const eData = []
  export default {
    name: 'EquipPreview',
    data() {
      this.cacheData = eData.map(item => ({...item}))
      return {
        attribute: [
          {type: 'id', cnType: '器材ID', guide: '请输入器材ID'},
          {type: 'model', cnType: '型号', guide: '请输入器材型号'},
          {type: 'name', cnType: '地址', guide: '请输入地址'},
          {type: 'warehouse', cnType: '所在仓库', guide: '请输入所在仓库'},
          {type: 'equipment', cnType: '价格', guide: '请输入价格'}
        ],
        equipmentData: {
          id: '',
          name: '',
          address: '',
          area: ''
        },
        eData,
        columns,
        advanced: false,
        form: this.$form.createForm(this)
      }
    },
    computed: {
      emptyInput() {
        if (this.equipmentData.id !== '' || this.equipmentData.name !== '' || this.equipmentData.address !== '' || this.equipmentData.area !== '') {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onClickClearSelect() {
        this.equipmentData.id = ''
        this.equipmentData.name = ''
        this.equipmentData.address = ''
        this.equipmentData.area = ''
      },
      onClickSubmit() {
        console.log(this.equipmentData)
        this.onClickClearSelect()
      },
      handleChange(value, key, column) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.eData = newData
        }
      },
      edit(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.eData = newData
        }
      },
      save(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.eData = newData
          this.cacheData = newData.map(item => ({...item}))
        }
      },
      cancel(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
          delete target.editable
          this.eData = newData
        }
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      }
    },
    mounted() {
      getEquipmentAllList().then((response) => {
        console.log(...response)
        this.eData = [...response]
      })
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
</style>
