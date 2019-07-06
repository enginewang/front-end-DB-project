<template>
  <div id="layout">
    <!-- warehouse message -->
    <a-layout>
      <a-layout-header>仓库详情</a-layout-header>
      <!-- warehouse message end -->
      <!-- select display type -->
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="button-group">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickAll"
              >全显示</a-button>
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickAccessory"
              >仅配件</a-button>
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickEquipment"
              >仅器材</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
      <!-- select display type end -->
      <!-- table -->
      <a-table :columns="columns" :dataSource="detailData" bordered>
        <template
          v-for="col in ['id','model', 'type', 'number']"
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
            <div v-else>{{ text }}</div>
          </div>
        </template>
        <div slot="operation" slot-scope="text, record">
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
        </div>
      </a-table>
    <!-- table end -->
    </a-layout>
  </div>
</template>

<script>
import { getWarehouseDetail } from '@/api/warehouse'

// columns type name
const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: '15%',
  scopedSlots: { customRender: 'id' }
}, {
  title: 'model',
  dataIndex: 'model',
  width: '15%',
  scopedSlots: { customRender: 'model' }
}, {
  title: 'type',
  dataIndex: 'type',
  width: '10%',
  scopedSlots: { customRender: 'type' }
}, {
  title: 'number',
  dataIndex: 'number',
  width: '20%',
  scopedSlots: { customRender: 'number' }
}, {
  title: 'operation',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

// warehouse data
const detailData = []
export default {
  name: 'Detail',
  data () {
    this.cacheData = detailData.map(item => ({ ...item }))
    return {
      detailData,
      columns,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    // submit
    onClickAll () {
      console.log('All')
      // to be complete
    },
    onClickAccessory () {
      console.log('Accessory')
    },
    onClickEquipment () {
      console.log('Equipment')
    },
    handleChange (value, key, column) {
      const newData = [...this.detailData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.detailData = newData
      }
    },
    // functions in table
    edit (key) {
      const newData = [...this.detailData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target.editable = true
        this.detailData = newData
      }
    },
    del (key) {
      // to be completed
    },
    save (key) {
      const newData = [...this.detailData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        delete target.editable
        this.detailData = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
    },
    cancel (key) {
      const newData = [...this.detailData]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
        delete target.editable
        this.detailData = newData
      }
    }
  },
  mounted () {
    getWarehouseDetail().then((response) => {
      this.detailData = [...response]
    })
  }

}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
#layout .ant-layout-header {
  color: #fff;
}
.button-group {
  margin-top: 1rem;
  margin-bottom: 1rem;
  .button {
    margin-right: 5rem;
    margin-left: .5rem;
  }
}
</style>
