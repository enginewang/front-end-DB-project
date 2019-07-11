<template>
  <page-view title="仓储器材">
    <div id="layout">
      <a-layout>
        <a-layout-header>增加配件</a-layout-header>
        <!-- input bar -->
        <div>
          <a-form
            class="ant-advanced-search-form"
            :form="form"
          >
            <a-col :md="8" :sm="24">
              <a-form-item :label="attributeModelID.cnType">
                <!-- 选择型号 -->
                <a-select
                  showSearch
                  :allowClear="true"
                  placeholder="请填写型号"
                  optionFilterProp="children"
                  v-model="addData['accessoryID']">
                  <a-select-option v-for="item in this.models" :key="item.accessory" :value="item.accessory">
                    {{item.model}}
                  </a-select-option>
                </a-select>
                <!-- 选择型号 -->
              </a-form-item>
            </a-col>
            <a-col :md="3" :sm="24" offset="1">
              <a-form-item :label="attributeNum.cnType">
                <!-- 选择数量 -->
                <a-input-number
                  v-model="addData[attributeNum.type]"
                  :defaultValue="1"
                  :min="1"
                  :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                  :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item :label="attributeWarehouse.cnType">
                <a-select
                  label="attributeWarehouse.cnType"
                  placeholder="请选择仓库"
                  showSearch
                  :allowClear="true"
                  optionFilterProp="children"
                  v-model="addData['warehouse']">
                  <a-select-option v-for="item in warehouses" :key="item" :value="item">{{item}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="4" :style="{ textAlign: 'right' }">
              <a-form-item span="4">
                <div class="button-group">
                  <a-button
                    size="default"
                    class="button"
                    type="primary"
                    @click="showModal"
                    :disabled="emptyInput"
                  >添加
                  </a-button>
                  <a-modal
                    title="确认信息"
                    :visible="visible"
                    @ok="handleOk"
                    :confirmLoading="confirmLoading"
                    @cancel="handleCancel"
                  >
                    <p>{{`是否将 ${addData.num} 个ID为 ${addData.accessoryID} 的配件添加到 ${addData.warehouse}？`}}</p>
                  </a-modal>
                  <a-button
                    size="default"
                    class="button"
                    type="danger"
                    @click="onClickClearSelect"
                    :disabled="emptyInput"
                  >清空
                  </a-button>
                </div>
              </a-form-item>
            </a-col>
          </a-form>
        </div>
        <!-- input bar end -->
        <!-- refresh button -->
        <div>
          <a-col :md="8" :sm="24">
            <a-form-item label="编号">
              <a-input placeholder="请输入查询编号" v-model="input"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <div class="button-group2">
              <a-button
                size="default"
                class="button"
                type="primary"
                @click="onClickReload"
              >刷新表单
              </a-button>
            </div>
          </a-col>

        </div>
        <!-- table -->
        <a-card>
          <a-table :columns="columns" :dataSource="DataShow"/>
        </a-card>
        <!-- table end -->
      </a-layout>
      </div>
      <!-- input bar end -->
      <!-- refresh button -->
      <div>
        <a-col :md="8" :sm="24">
          <a-form-item label="编号">
            <a-input placeholder="请输入查询编号" v-model="input"/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :sm="24">
          <div class="button-group2">
            <a-button
              size="default"
              class="button"
              type="primary"
              @click="onClickReload"
            >刷新表单</a-button>
          </div>
        </a-col>
      </div>
      <!-- table -->
      <a-card>
        <a-table :columns="columns" :dataSource="DataShow" :loading="loading"/>
      </a-card>
      <!-- table end -->


  </page-view>
</template>

<script>
  import {
    getAccessoryKind,
    getAccessoryInWarehouse,
    getAllType,
    addAccessoryInWarehouse,
    getWarehouseName
  } from '@/api/accessory'
  import Fuse from 'fuse.js'
  import { PageView } from '@/layouts'


  export default {
    component:{
      PageView
    },
    data() {
      return {
        //form

        loading:'true',
        input:'',

        visible: false,
        confirmLoading: false,
        ModalText: '',
        attributeModelID: {
          type: 'modelID',
          cnType: '型号编号',
          guide: '请输入型号编号'
        },
        attributeNum: {
          type: 'num',
          cnType: '数量',
          guide: '请输入配件数量'
        },
        attributeWarehouse: {
          type: 'warehouse',
          cnType: '仓库名称',
          guide: '请输入仓库名称'
        },
        //table columns
        columns: [
          {
            title: '型号编号',
            dataIndex: 'model',
            align: 'center',
          }, {
            title: '配件类型',
            dataIndex: 'type',
            filters: [],
            align: 'center',
            onFilter: (value, record) => record.type.indexOf(value) === 0
          }, {
            title: '价格',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price
          }, {
            title: '库存数量',
            dataIndex: 'num',
            align: 'center',
            sorter: (a, b) => a.num - b.num
          }, {
            title: '所在仓库',
            dataIndex: 'warehouse',
            filters: [],
            align: 'center',
            onFilter: (value, record) => record.warehouse.indexOf(value) === 0
          }],
        //table selection

        //form selection

        //data
        addData: {
          accessoryID: '',
          num: '',
          warehouse: ''
        },
        Data: [],
        DataShow: [],
        warehouses: [],
        types: [],
        models: [],

        form: this.$form.createForm(this),


      }
    },
    watch: {
      input(pattern){
        if( !pattern){
          console.log("pattern",pattern)

          this.DataShow = this.Data
        } else {
          const option = {
            keys: ['model'],
            threshold: 0.1
          }
          var fuse = new Fuse(this.Data, option)
          this.DataShow = fuse.search(pattern)
        }
      }
    },
    computed: {
      emptyInput() {
        if (this.addData.accessoryID == '' || this.addData.num == '' || this.addData.warehouse == '')
          return true
        else return false
      }
    },
    methods: {
      //show modal
      showModal() {
        this.visible = true
      },
      handleOk(e) {
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
          this.onClickSubmit();
          console.log("addData", this.addData)
          //   this.onClickClearSelect()
        }, 1000)
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false
      },
      //  refresh Table

      onClickReload () {
        this.loading=true

        getAccessoryInWarehouse().then((response) => {
          this.Data = [...response.data]
          this.DataShow = this.Data
          this.input = ''
          this.loading=false
        })
      },
      onClickClearSelect() {
        this.addData.accessoryID = ''
        this.addData.num = ''
        this.addData.warehouse = ''
      },
      onClickSubmit() {
        addAccessoryInWarehouse(this.addData).then(() => {
          this.onClickReload();
          console.log(this.addData)
        })

      }
    },
    created() {
      //get table
      getAccessoryKind().then((response) => {
        console.log('model', response)
        this.models = [...response.data]
      })
      getAccessoryInWarehouse().then((response) => {
        this.Data = [...response.data]
        this.DataShow = this.Data
        this.loading = false
        console.log(response)
      })
      //get all warehouseName
      getWarehouseName().then((response) => {
        this.warehouseSelection = [...response.data]
        for (let val of this.warehouseSelection) {
          let temp = {
            text: val,
            value: val
          }
          this.columns[4].filters.push(temp)
          this.warehouses.push(val)
        }
        console.log(response)
      })
      //get all type
      getAllType().then((response) => {
        this.types = [...response.data]
        for (let val of this.types) {
          let temp = {
            text: val.value,
            value: val.value
          }
          this.columns[1].filters.push(temp)
        }
        console.log(response)
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
    margin-bottom: 1rem;

    .button {
      margin-right: 0.5rem;
      margin-left: 0.5rem;
      margin-top: 2.7rem;
    }
  }

  .button-group2 {
    margin-top: 3em;
    margin-bottom: 1rem;
    margin-left: 39rem
  }
</style>