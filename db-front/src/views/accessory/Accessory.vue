<template>
  <page-view title="配件管理">
    <div id="layout">
      <a-layout>
        <!-- input bar -->
        <a-modal v-model="showAddForm" footer>
          <a-form
            class="ant-advanced-search-form"
            :form="form"
          >
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
            <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
              <div class="button-group">
                <a-button
                  size="default"
                  class="button"
                  type="primary"
                  htmlType="submit"
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
                  <p>{{`是否将 ${addData.num} 个编码为 ${addData.accessoryID} 的配件添加到 ${addData.warehouse}？`}}</p>
                </a-modal>
                <a-button
                  size="default"
                  class="button"
                  type="danger"
                  @click="onClickClearSelect"
                  :disabled="emptyInput"
                >清空
                </a-button>
                <a-button style="margin-left: 8px" @click="cancelAddForm"
                >取消
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </a-modal>


        <!-- input bar end -->
        <!-- refresh button -->
        <a-row :gutter="24">
          <a-col :span="8">
            <a-form-item label="编号查询">
              <a-input placeholder="请输入待查询编号" v-model="input"/>
            </a-form-item>
          </a-col>

          <a-col :span="16" style="text-align: right">
            <div style="margin-top: 2.5rem">
              <a-button
                style="margin-right : 1rem"
                @click="addAccessoryButton()"
                type="primary"
                icon="plus"
              >添加配件
              </a-button>
              <a-button
                size="default"
                type="primary"
                style="text-align: right"
                @click="onClickReload"
                icon="reload"
              >刷新表单
              </a-button>
            </div>
          </a-col>

          <a-col :span="8" style="text-align: right">
            <div >

            </div>
          </a-col>
        </a-row>
      </a-layout>
    </div>
      <!-- input bar end -->
      <!-- refresh button -->
      
  
      <!-- table -->
      <a-card>
        <a-table :columns="columns" :dataSource="DataShow" :loading="loading" />
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
  import ARow from "ant-design-vue/es/grid/Row";


  export default {
    components:{
      ARow,
      PageView
    },
    data() {
      return {
        //form
        loading: true,
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
            sorter: (a, b) => a['price'] - b['price']
          }, {
            title: '库存数量',
            dataIndex: 'num',
            align: 'center',
            sorter: (a, b) => a['num'] - b['num']
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
        showAddForm: false,

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
      //add accessory button
      addAccessoryButton() {
        this.showAddForm = true
      },
      cancelAddForm() {
        this.showAddForm = false
      },
      //show notification
      openNotification () {
        this.$notification.open({
          message: '提示信息',
          description: '添加成功！',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      },
      //show modal
      showModal() {
        this.visible = true
      },
      handleOk(e) {
        this.showAddForm = false
        this.confirmLoading = true;
        setTimeout(() => {
          this.visible = false;
          this.confirmLoading = false;
          this.onClickSubmit();
          this.openNotification();
          console.log("addData", this.addData)
          //   this.onClickClearSelect()
        }, 10)
      },
      handleCancel(e) {
        console.log('Clicked cancel button');
        this.visible = false
      },
      //  refresh Table

      onClickReload () {
        this.loading=true
        getAccessoryInWarehouse().then((response) => {
          var temp = [...response.data]
          var result=[]
          for(let item of temp){
            var t = {
              'key': item['key']+item['warehouseID'],
              'model': item['model'],
              'type' : item.type,
              'price': item['price'],
              'num': item['num'],
              'warehouse': item['warehouse']
            }
            result.push(t)
          }
          this.Data = result
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
          var temp = [...response.data]
          var result=[]
          for(let item of temp){
            var t = {
              'key': item['key']+item['warehouseID'],
              'model': item['model'],
              'type' : item['type'],
              'price': item['price'],
              'num': item['num'],
              'warehouse': item['warehouse']
            }
            result.push(t)
          }
          this.Data = result
          this.DataShow = this.Data
          this.input = ''
          this.loading=false
        })
      //get all warehouseName
      getWarehouseName().then((response) => {
        this.warehouseSelection = [...response.data]
        for (let val of this.warehouseSelection) {
          let temp = {
            'text': val,
            'value': val
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
            text: val,
            value: val
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