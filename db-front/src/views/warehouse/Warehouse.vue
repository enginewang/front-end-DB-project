<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col v-for="( item,index ) in attribute" :key="index" :span="8">
            <a-form-item :label="item.cnType">
              <a-input :placeholder="item.guide" v-model="warehouseData[item.type]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
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
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
    <!-- table end -->
  </div>
</template>

<script>
// columns type name
const columns = [{
  title: 'id',
  dataIndex: 'id',
  width: '10%',
  scopedSlots: { customRender: 'id' }
}, {
  title: 'name',
  dataIndex: 'name',
  width: '15%',
  scopedSlots: { customRender: 'name' }
}, {
  title: 'address',
  dataIndex: 'address',
  width: '40%',
  scopedSlots: { customRender: 'address' }
}, {
  title: 'area',
  dataIndex: 'area',
  width: '20%',
  scopedSlots: { customRender: 'area' }
},
{
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
      attribute: [
        { type: 'id', cnType: 'ID', guide: '请输入ID' },
        { type: 'name', cnType: '名称', guide: '请输入名称' },
        { type: 'address', cnType: '地址', guide: '请输入地址' },
        { type: 'area', cnType: '面积', guide: '请输入面积' }
      ],
      warehouseData: {
        id: '',
        name: '',
        address: '',
        area: ''
      },
      wData,
      columns,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    emptyInput () {
      if (this.warehouseData.id !== '' || this.warehouseData.name !== '' || this.warehouseData.address !== '' || this.warehouseData.area !== '') {
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
      this.warehouseData.name = ''
      this.warehouseData.address = ''
      this.warehouseData.area = ''
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
    this.axios.get('/warehouse').then((response) => {
      console.log(response)
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
