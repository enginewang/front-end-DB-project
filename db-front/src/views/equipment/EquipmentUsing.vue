<template>
  <page-view title="在用器材">
    <div>
      <a-card :bordered="false">
        <br />
        <a-form class="ant-advanced-search-form" :form="form" inline>
          <a-row :gutter="24">
            <a-col :span="6">
              <a-form-item>
                <label>器材编号：</label>
                <a-input placeholder="请输入器材编号" v-model="inputID" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <label>型号：</label>
                <a-input placeholder="请输入型号" v-model="inputmodel" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <label>地址：</label>
                <a-input placeholder="请输入地址" v-model="inputAddress" />
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item>
                <div style="text-align: right; margin-top: 2rem">
                  <a-button @click="reload()" size="large" type="primary" icon="reload">刷新</a-button>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <br />
        <div>
          <a-table :columns="columns" :dataSource="eDataShow" rowKey="id" bordered>
            <template
              v-for="col in ['id', 'type', 'damage', 'address', 'status']"
              :slot="col"
              slot-scope="text"
            >
              <div :key="col">{{ text }}</div>
            </template>
            <template slot="id" slot-scope="text">{{ text }}</template>
            <template slot="status" slot-scope="text">
              <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
            </template>
            <template slot="toDetail" slot-scope="text, record">
              <div>
                <router-link :to="{ name: 'EquipDetail', params:{ id: getID(record.id)} }">器材详情</router-link>
              </div>
            </template>
          </a-table>
        </div>
      </a-card>
    </div>
  </page-view>
</template>

<script>
import { getEquipmentUsingList } from '@/api/equipment'
import { PageView } from '@/layouts'
import Fuse from 'fuse.js'
const statusMap = {
  0: {
    status: 'success',
    text: '正常'
  },
  1: {
    status: 'error',
    text: '损坏'
  }
}
const columns = [
  {
    title: '器材编号',
    dataIndex: 'id',
    width: '15%',
    align: 'center',
    scopedSlots: { customRender: 'id' },
    sorter: (a, b) => parseInt(a.id.toString().slice(2)) - parseInt(b.id.toString().slice(2))
  },
  {
    title: '类别',
    dataIndex: 'type',
    align: 'center',
    width: '10%',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '使用状态',
    dataIndex: 'status',
    align: 'center',
    width: '10%',
    filters: [
      {
        text: '正常',
        value: '0'
      },
      {
        text: '损坏',
        value: '1'
      }
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '型号',
    dataIndex: 'model',
    align: 'center',
    width: '12%',
    scopedSlots: { customRender: 'model' }
  },
  {
    title: '地址',
    dataIndex: 'address',
    align: 'center',
    width: '30%',
    scopedSlots: { customRender: 'address' }
  },
  {
    title: ' ',
    dataIndex: 'toDetail',
    align: 'center',
    width: '15%',
    scopedSlots: { customRender: 'toDetail' }
  }
]
let inputID = ''
let inputAddress = ''
let inputmodel = ''
const eData = []
const eDataShow = []
export default {
  inject: ['reload'],
  name: 'EquipUsing',
  components: {
    PageView
  },
  data() {
    return {
      attribute: [{ type: 'type', cnType: '类别', guide: '类别筛选' }],
      equipmentData: {
        type: ''
      },
      eData,
      eDataShow,
      inputID: '',
      inputAddress: '',
      inputmodel: '',
      columns,
      advanced: false,
      form: this.$form.createForm(this),
      queryParam: {}
    }
  },
  computed: {
    emptyInput() {
      if (
        this.equipmentData.id !== '' ||
        this.equipmentData.type !== '' ||
        this.equipmentData.status !== '' ||
        this.equipmentData.damage !== ''
      ) {
        return false
      } else {
        return true
      }
    }
  },
  filters: {
    statusFilter(type) {
      return statusMap[type].text
    },
    statusTypeFilter(type) {
      return statusMap[type].status
    }
  },
  methods: {
    clickJump(record) {
      console.log(record)
    },
    onClickClearSelect() {
      this.equipmentData.type = ''
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
        this.cacheData = newData.map(item => ({ ...item }))
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
    },
    resetSearchForm() {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    getID(id) {
      const newData = [...this.eDataShow]
      const target = newData.filter(item => id === item.id)[0]
      console.log(target.id)
      return target.id
    }
  },
  watch: {
    inputID(pattern) {
      if (pattern == '') {
        this.eDataShow = this.eData
      } else {
        const option = {
          keys: ['id'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.eData, option)
        this.eDataShow = fuse.search(pattern)
        console.log(this.eDataShow)
      }
    },
    inputAddress(pattern) {
      if (pattern == '') {
        this.eDataShow = this.eData
      } else {
        const option = {
          keys: ['address'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.eData, option)
        this.eDataShow = fuse.search(pattern)
        console.log(this.eDataShow)
      }
    },
    inputmodel(pattern) {
      if (pattern == '') {
        this.eDataShow = this.eData
      } else {
        const option = {
          keys: ['model'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.eData, option)
        this.eDataShow = fuse.search(pattern)
        console.log(this.eDataShow)
      }
    }
  },
  mounted() {
    getEquipmentUsingList().then(response => {
      console.log(...response.data)
      this.eData = [...response.data]
      this.eDataShow = this.eData
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
.ant-form-item-control-wrapper {
  width: 100px;
}
.table-page-search-wrapper .ant-form-inline .ant-form-item .ant-form-item-control-wrapper {
  width: 100%;
}
</style>
