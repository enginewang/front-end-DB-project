<template>
  <div id="layout">
    <!-- warehouse message -->
    <a-layout>
      <a-layout-header>
        您现在位于 {{ warehouseDetail.address }} {{ warehouseDetail.detailAddress }}的 {{ warehouseDetail.name }}
      </a-layout-header>
      <!-- warehouse message end -->
      <br>
      <!-- equipment table -->
      <div>
        <a-form class="ant-advanced-search-form" :form="form">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input placeholder="请输入器材编号" v-model="equipmentInput"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="ecol" :dataSource="equipmentShow" bordered>
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
              title="调度"
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
    <!-- equipment table end -->

      <!-- accessory table -->
      <div>
        <a-form class="ant-advanced-search-form" :form="form">
          <a-row :gutter="24">
            <a-col :md="8" :sm="24">
              <a-form-item>
                <a-input placeholder="请输入配件型号" v-model="accessoryInput"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <a-table :columns="acol" :dataSource="accessoryShow" bordered>
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
              title="调度"
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
    <!-- accessory table end -->
    </a-layout>
  </div>
</template>

<script>
import { postWarehouseDetail, getAllWarehouse , postGoods } from '@/api/warehouse'
import Fuse from 'fuse.js'

export default {
  name: 'Detail',
  data () {
    return {
      // form
      form: this.$form.createForm(this),
      acol : [{
        title: '型号',
        dataIndex: 'model',
        width: '30%',
        sorter: (a, b) => a.model < b.model,
        scopedSlots: { customRender: 'model' }
      }, {
        title: '数量',
        dataIndex: 'number',
        width: '20%',
        sorter: (a, b) => a.number < b.number,
        scopedSlots: { customRender: 'number' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }],
      ecol : [{
        title: '编号',
        dataIndex: 'id',
        width: '20%',
        sorter: (a, b) => a.id < b.id,
        scopedSlots: { customRender: 'id' }
      }, {
        title: '型号',
        dataIndex: 'model',
        width: '20%',
        sorter: (a, b) => a.model < b.model,
        scopedSlots: { customRender: 'model' }
      }, {
        title: '数量',
        dataIndex: 'number',
        width: '20%',
        sorter: (a, b) => a.number < b.number,
        scopedSlots: { customRender: 'number' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
      }],

      // data
      accessory: [],
      accessoryShow: [],
      accessoryInput: '',
      equipment: [],
      equipmentShow: [],
      equipmentInput: '',
      warehouseID: this.$route.params.id,
      warehouseDetail: {
        name: '',
        address: '',
        detailAddress: ''
      },
      visible: false,
      max: 0,
      min: 0,
      allWarehouse: []
    }
  },
  // watch for fuzzy search
  watch:{
    accessoryInput(pattern){
      if ( pattern == '' ){
        this.accessoryShow = this.accessory
      }
      else{
        const option = {
          keys: ['model'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.accessory, option)
        this.accessoryShow = fuse.search(pattern)
      }
    },
    equipmentInput(pattern){
      if ( pattern == '' ){
        this.equipmentShow = this.equipment
      }
      else{
        const option = {
          keys: ['id'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.equipment, option)
        this.equipmentShow = fuse.search(pattern)
      }
    }
  },
  methods: {
    schedule (key) {
      const newData = [...this.equipment]
      const target = newData.filter(item => key === item.key)[0]
      console.log(target)
      this.max = target.number
      this.visible = true
      getAllWarehouse().then((response) => {
        this.allWarehouse = [...response.data]
      })
    },
    handleOk (e) {
      // to be completed
      this.visible = false
    }
  },
  created () {
    // get detail info of warehouse
    postWarehouseDetail(this.warehouseID).then((response) => {
      this.warehouseDetail.name = response.data.name
      this.warehouseDetail.address = response.data.address
      this.warehouseDetail.detailAddress = response.data.detailAddress
    }),
    // get info of goods
    postGoods(this.warehouseID).then((response) => {
      this.equipment = [...response.data.equipment]
      this.equipmentShow = this.equipment
      this.accessory = [...response.data.accessory]
      this.accessoryShow = this.accessory
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
