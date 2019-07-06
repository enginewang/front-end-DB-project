<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeID.cnType">
              <a-input :placeholder="attributeID.guide" v-model="inputData[attributeID.type]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeAddress.cnType">
              <a-select v-model="inputData[attributeAddress.type]">
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
    <a-table :columns="columns" :dataSource="previewData" bordered>
      <template
        v-for="col in ['id','icon', 'address']"
        :slot="col"
        slot-scope="text"
      >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <div slot="operation" slot-scope="text, record">
        <div>
          <a @click="() => goto(record.key)">跳转到该仓库详情页</a>
        </div>
      </div>
    </a-table>
    <!-- table end -->
  </div>
</template>

<script>
import { getWarehousePreview } from '@/api/warehouse'

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
const previewData = []
export default {
  name: 'Preview',
  data () {
    this.cacheData = previewData.map(item => ({ ...item }))
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
      inputData: {
        id: '',
        address: '请选择地址'
      },
      previewData,
      columns,
      form: this.$form.createForm(this)
    }
  },
  computed: {
    emptyInput () {
      if (this.inputData.id !== '' || this.inputData.address !== '请选择地址') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // clear all input
    onClickClearSelect () {
      this.inputData.id = ''
      this.inputData.address = '请选择地址'
    },
    // submit
    onClickSubmit () {
      console.log(this.inputData)
      this.onClickClearSelect()
      // to be complete
    },
    // functions in table
    goto (key) {
      const newData = [...this.previewData]
      const target = newData.filter(item => key === item.key)[0]
      console.log(target.id)
    }
  },
  mounted () {
    getWarehousePreview().then((response) => {
      console.log(...response)
      this.previewData = [...response]
    })
  }

}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
.button-group {
  margin-bottom: 1rem;
  .button {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
}
</style>
