<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeID.cnType">
              <a-input :placeholder="attributeID.guide" v-model="warehouseData[attributeID.type]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeAddress.cnType">
              <a-select v-model="warehouseData[attributeAddress.type]">
                <a-select-option value="0">地址1</a-select-option>
                <a-select-option value="1">地址2</a-select-option>
                <a-select-option value="2">地址3</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <div class="button-group">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickSubmit"
                :disabled="emptyInput"
              >查询</a-button>
              <a-button
                size="large"
                class="button"
                type="danger"
                @click="onClickClearSelect"
                :disabled="emptyInput"
                ghost
              >重置</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- input bar end -->
    <!-- table -->
    <a-table :columns="columns" :dataSource="wData" bordered>
      <template
        v-for="col in ['id','icon', 'address']"
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
            <a @click="() => save(record.key)">Save</a>
            &nbsp;
            &nbsp;
            &nbsp;
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
            &nbsp;
            &nbsp;
            &nbsp;
            <a @click="() => del(record.key)">Delete</a>
          </span>
        </div>
      </template>
    </a-table>
    <!-- table end -->
  </div>
</template>

<script>
import { getInitWarehouse } from '@/api/warehouse'

// columns type name
const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: '20%',
  scopedSlots: { customRender: 'id' }
}, {
  title: 'icon',
  dataIndex: 'icon',
  width: '10%',
  scopedSlots: { customRender: 'icon' }
}, {
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  scopedSlots: { customRender: 'address' }
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

// warehouse data
const wData = []
export default {
  name: 'Search',
  data () {
    this.cacheData = wData.map(item => ({ ...item }))
    return {
      attributeID: {
        type: 'id',
        cnType: 'ID',
        guide: '请输入ID'
      },
      attributeAddress: {
        type: 'address',
        cnType: '地址',
        guide: '请输入地址'
      },
      warehouseData: {
        id: '',
        address: '请选择地址'
      },
      wData,
      columns,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    emptyInput () {
      if (this.warehouseData.id !== '' || this.warehouseData.address !== '请选择地址') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // clear all input
    onClickClearSelect () {
      this.warehouseData.id = ''
      this.warehouseData.address = '请选择地址'
    },
    // submit
    onClickSubmit () {
      console.log(this.warehouseData)
      this.onClickClearSelect()
      // to be complete
    },
    handleChange (value, key, column) {
      const newData = [...this.wData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.wData = newData
      }
    },
    // functions in table
    edit (key) {
      const newData = [...this.wData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.wData = newData
      }
    },
    del (key) {
      // to be completed
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
    }
  },
  mounted () {
    getInitWarehouse().then((response) => {
      console.log(...response)
      this.wData = [...response]
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
</style>
