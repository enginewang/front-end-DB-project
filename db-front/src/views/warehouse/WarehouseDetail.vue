<template>
  <div id="layout">
    <!-- warehouse message -->
    <a-layout>
      <a-layout-header>
        您现在位于 {{ warehouseDetail.address }} {{ warehouseDetail.detailAddress }}的 {{ warehouseDetail.name }}
      </a-layout-header>
      <!-- warehouse message end -->
      <!-- refresh button -->
      <div class="button-group">
        <a-button
          size="large"
          class="button"
          type="primary"
          @click="reload()"
          >刷新</a-button>
      </div>
      <!-- refresh end -->
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
      <a-table :columns="ecol" :dataSource="equipmentShow" rowKey="id" bordered>
        <template
          v-for="col in ['id','model', 'type']"
          :slot="col"
          slot-scope="text"
        >
          <div :key="col">
            <div>{{ text }}</div>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <a-button @click="() => scheduleEquipment(record.id)">调度</a-button>
            <!-- modal -->
            <a-modal
              title="调度"
              v-model="visibleE"
              @ok="handleOKE"
            >
              <div class="modal">
                调出到
                <a-select
                  style="width: 200px"
                  v-model="to"
                >
                  <a-select-option v-for="(item, index) in allWarehouse" :key="index">
                    {{ item.name }}
                  </a-select-option>
                </a-select>
                仓库
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
      <a-table :columns="acol" :dataSource="accessoryShow" rowKey="model" bordered>
        <template
          v-for="col in ['model', 'type', 'number']"
          :slot="col"
          slot-scope="text"
        >
          <div :key="col">
            <div>{{ text }}</div>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <a-button @click="() => scheduleAccessory(record.model)">调度</a-button>
            <!-- modal -->
            <a-modal
              title="调度"
              v-model="visibleA"
              @ok="handleOKA"
            >
              <div class="modal">
                调出到
                <a-select
                  style="width: 200px"
                  v-model="to"
                >
                  <a-select-option 
                   v-for="(item, index) in allWarehouse" 
                   :key="index">
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
                  v-model="scheduleA.num"
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
import { postWarehouseDetail, getAllWarehouse , postGoods, postSchedule } from '@/api/warehouse'
import Fuse from 'fuse.js'

export default {
  inject: ['reload'],
  name: 'Detail',
  data () {
    return {
      // form and columns names
      form: this.$form.createForm(this),
      acol : [{
        title: '型号',
        dataIndex: 'model',
        sorter: (a, b) => a.model > b.model,
        scopedSlots: { customRender: 'model' }
      }, {
        title: '数量',
        dataIndex: 'number',
        width: '20%',
        sorter: (a, b) => a.number - b.number,
        scopedSlots: { customRender: 'number' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        scopedSlots: { customRender: 'operation' }
      }],
      ecol : [{
        title: '编号',
        dataIndex: 'id',
        width: '30%',
        sorter: (a, b) => a.id > b.id,
        scopedSlots: { customRender: 'id' }
      }, {
        title: '型号',
        dataIndex: 'model',
        sorter: (a, b) => a.model > b.model,
        scopedSlots: { customRender: 'model' }
      }, {
        title: '操作',
        dataIndex: 'operation',
        width: '20%',
        scopedSlots: { customRender: 'operation' }
      }],

      // data
      // origin data
      accessory: [],
      equipment: [],
      // show data
      accessoryShow: [],
      equipmentShow: [],
      // input data, search by key
      accessoryInput: '',
      equipmentInput: '',
      // the ID of this warehouse
      warehouseID: this.$route.params.id,
      // detail data of this warehouse
      warehouseDetail: {
        name: '',
        address: '',
        detailAddress: ''
      },
      // show modal
      visibleA: false,
      visibleE: false,
      // max and min of number to be scheduled
      max: 0,
      min: 1,
      // the data of all warehouse
      allWarehouse: [],
      // the index of "to" warehouse
      to: 0,
      // 2 schedules
      scheduleA: {
        type: 'Accessory',
        model: '',
        from: '',
        // the name of "to" warehouse
        to: '',
        num: 1
      },
      scheduleE: {
        type: 'Equipment',
        id: '',
        from: '',
        // the name of "to" warehouse
        to: ''
      }
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
    // schedule for equipment
    scheduleEquipment (id) {
      const newData = [...this.equipment]
      const target = newData.filter(item => id === item.id)[0]
      this.max = target.number
      this.visibleE = true

      getAllWarehouse().then((response) => {
        this.allWarehouse = [...response.data]
      })

      this.scheduleE.id = target.id
      this.scheduleE.from = this.warehouseDetail.name
    },
    // schedule for accessory
    scheduleAccessory (model) {
      const newData = [...this.accessory]
      const target = newData.filter(item => model === item.model)[0]
      this.max = target.number
      this.visibleA = true
      getAllWarehouse().then((response) => {
        this.allWarehouse = [...response.data]
      })

      this.scheduleA.model = target.model
      this.scheduleA.from = this.warehouseDetail.name
    },
    // event after click ok
    handleOKE (e) {
      // the "to" in json schedule need to be changed from index to string
      this.scheduleE.to = this.allWarehouse[this.to].name
      postSchedule([this.scheduleE]).then((response) => {
       // this.equipment = [...response.data]
       // this.equipmentShow = this.equipment
      })
      this.visibleE = false
    },
    handleOKA (e) {
      // the "to" in json schedule need to be changed from index to string
      this.scheduleA.to = this.allWarehouse[this.to].name
      postSchedule([this.scheduleA]).then((response) => {
       // this.accessory = [...response.data]
       // this.accessoryShow = this.accessory
      })
      this.visibleA = false
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
