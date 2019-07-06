<template>
  <div id="layout">
    <!-- warehouse message -->
    <a-layout>
      <a-layout-header>
        您现在位于 {{ warehouseAddress }} 的 {{ warehouseName }}
      </a-layout-header>
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
          slot-scope="text"
        >
          <div :key="col">
            <div>{{ text }}</div>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <a-button @click="() => schedule(record.key)">调度</a-button>
            <!-- modal -->
            <a-modal
              title="Basic Modal"
              v-model="visible"
              @ok="handleOk"
            >
              <div class="modal">
                调出到
                <a-select
                  style="width: 200px"
                >
                  <a-select-option v-for="(item, index) in allWarehouse" :key="index">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                仓库
              </div>
              <div class="modal">
                数量:
                <a-input-number
                  :max="max"
                  :min="min"
                  class="input"
                />
              </div>
            </a-modal>
            <!-- modal end -->
          </div>
        </template>
      </a-table>
    <!-- table end -->
    </a-layout>
  </div>
</template>

<script>
import { getWarehouseDetail, getAllWarehouse } from '@/api/warehouse'

// columns type name
const columns = [{
  title: '编号',
  dataIndex: 'id',
  width: '20%',
  scopedSlots: { customRender: 'id' }
}, {
  title: '型号',
  dataIndex: 'model',
  width: '20%',
  scopedSlots: { customRender: 'model' }
}, {
  title: '类别',
  dataIndex: 'type',
  width: '20%',
  scopedSlots: { customRender: 'type' }
}, {
  title: '数量',
  dataIndex: 'number',
  width: '20%',
  scopedSlots: { customRender: 'number' }
}, {
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

// warehouse data
const detailData = []
export default {
  name: 'Detail',
  data () {
    return {
      detailData,
      columns,
      form: this.$form.createForm(this),
      warehouseID: this.$route.params.id,
      warehouseName: this.$route.params.name,
      warehouseAddress: this.$route.params.address,
      visible: false,
      max: 0,
      min: 0,
      allWarehouse: []
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
    // functions in table
    schedule (key) {
      const newData = [...this.detailData]
      const target = newData.filter(item => key === item.key)[0]
      console.log(target)
      this.max = target.number
      this.visible = true
      getAllWarehouse().then((response) => {
        console.log(response)
        this.allWarehouse = [...response]
      })
    },
    handleOk (e) {
      // to be completed
      this.visible = false
    }
  },
  mounted () {
    getWarehouseDetail({ id: this.warehouseID }).then((response) => {
      this.detailData = [...response]
    })
  }

}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
#layout .ant-layout-header {
  background: #fff;
  color: #666;
}
.button-group {
  margin-top: 1rem;
  margin-bottom: 1rem;
  .button {
    margin-right: 5rem;
    margin-left: .5rem;
  }
}

.modal {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
