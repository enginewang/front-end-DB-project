<template>
  <div>
    <a-card :bordered="false">
      <br>
      <a-form class="ant-advanced-search-form" :form="form" inline>
        <a-row :gutter="24">
          <a-col :md="6" :sm="24">
            <a-form-item>
              <label>器材编号：</label>
              <a-input placeholder="请输入器材编号" v-model="inputID"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item>
              <label>型号：</label>
              <a-input placeholder="请输入型号" v-model="inputModelID"/>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="24">
            <a-form-item>
              <label>地址：</label>
              <a-input placeholder="请输入地址" v-model="inputAddress"/>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <br>
      <div>
        <a-table :columns="columns" :dataSource="eDataShow" rowKey="id" bordered>
          <template
                  v-for="col in ['id', 'type', 'damage', 'address', 'status']"
                  :slot="col"
                  slot-scope="text"
          >
            <div :key="col">
              {{ text }}
            </div>
          </template>
          <template slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </template>
        </a-table>
      </div>
    </a-card>
  </div>

</template>

<script>

  import {getEquipmentUsingList} from '@/api/equipment'
  import Fuse from 'fuse.js'

  const statusMap = {
    0: {
      status: 'processing',
      text: '储存中'
    },
    1: {
      status: 'success',
      text: '正常'
    },
    2: {
      status: 'error',
      text: '已损坏'
    },
    3: {
      status: 'default',
      text: '维修中'
    }
  }

  const columns = [{
    title: '器材编号',
    dataIndex: 'id',
    width: '15%',
    scopedSlots: {customRender: 'id'},
    sorter: (a, b) => a.id - b.id
  }, {
    title: '类别',
    dataIndex: 'type',
    width: '10%',
    scopedSlots: {customRender: 'type'}
  }, {
    title: '损坏程度',
    dataIndex: 'damage',
    width: '10%',
    scopedSlots: {customRender: 'damage'},
    sorter: (a, b) => a.damage - b.damage
  }, {
    title: '型号',
    dataIndex: 'model',
    width: '15%',
    scopedSlots: {customRender: 'model'}
  }, {
    title: '地址',
    dataIndex: 'address',
    width: '30%',
    scopedSlots: {customRender: 'address'}
  }, {
    title: '使用状态',
    dataIndex: 'status',
    width: '10%',
    filters: [{
      text: '存储中',
      value: '0'
    }, {
      text: '正常',
      value: '1'
    }, {
      text: '已损坏',
      value: '2'
    }, {
      text: '维修中',
      value: '3'
    }],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    scopedSlots: {customRender: 'status'}
  }]
  let inputID = ''
  let inputAddress = ''
  let inputModelID = ''
  const eData = []
  const eDataShow = []

  export default {
    name: 'EquipUsing',
    data() {
      return {
        attribute: [
          {type: 'type', cnType: '类别', guide: '类别筛选'}
        ],
        equipmentData: {
          type: '',
        },
        eData,
        eDataShow,
        inputID: '',
        inputAddress: '',
        inputModelID: '',
        columns,
        advanced: false,
        form: this.$form.createForm(this),
        queryParam: {},
      }
    },
    computed: {
      emptyInput() {
        if (this.equipmentData.id !== '' || this.equipmentData.type !== '' || this.equipmentData.status !== '' || this.equipmentData.damage !== '') {
          return false
        } else {
          return true
        }
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      }
    },
    methods: {
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
      },
      resetSearchForm() {
        this.queryParam = {
          date: moment(new Date())
        }
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
      inputModelID(pattern) {
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
      getEquipmentUsingList().then((response) => {
        console.log(...response)
        this.eData = [...response]
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
