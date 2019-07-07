<template>
  <a-card :bordered="false">
    <br>
    <a-table :columns="columns" :dataSource="eData" bordered>
      <template
              v-for="col in ['id', 'type', 'status', 'damage', 'address']"
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

  import {getEquipmentUsingList} from '@/api/equipment'

  const statusMap = {
    0: {
      status: 'store',
      show: '存储中'
    },
    1: {
      status: 'using',
      show: '使用中'
    },
    2: {
      status: 'broken',
      show: '已损坏'
    },
    3: {
      status: 'repairing',
      show: '维修中'
    }
  }

  const columns = [{
    title: '器材id',
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
    title: '使用状态',
    dataIndex: 'status',
    width: '10%',
    filters: [{
      text: '正常',
      value: '正常'
    },
      {
        text: '损坏',
        value: '损坏'
      },
      {
        text: '维修中',
        value: '维修中'
      }],
    onFilter: (value, record) => record.status.indexOf(value) === 0
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
  }]
  let eData = []
  let preData = []

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
        preData,
        eData,
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
    mounted() {
      getEquipmentUsingList().then((response) => {
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

  .ant-form-item-control-wrapper {
    width: 100px;
  }

  .table-page-search-wrapper .ant-form-inline .ant-form-item .ant-form-item-control-wrapper {
    width: 100%;
  }
</style>
