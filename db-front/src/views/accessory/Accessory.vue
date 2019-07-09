<template>
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
              <a-select 
                showSearch
                allowClear="true"
                placeholder="请填写型号"
                optionFilterProp="children"
                v-model="addData[attributeModelID.type]">
                <a-select-option v-for="item in models" :key="item.modelID" :value="item.modelID">
                  {{item.modelID}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="3" :sm="24" offset="1">
            <a-form-item :label="attributeNum.cnType">
              <a-input-number
                v-model="addData[attributeNum.type]"
                :defaultValue="1"
                :min="1"
                :formatter="value => ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
                :parser="value => value.replace(/\$\s?|(,*)/g, '')"
                @change="onChangeNum"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeWarehouse.cnType">
              <a-select 
                label="attributeWarehouse.cnType"
                placeholder="请选择仓库"
                showSearch
                allowClear="true"
                optionFilterProp="children"
                v-model="addData[attributeWarehouse.type]">
                <a-select-option v-for="(item,index) in warehouses" :key="index" :value="item">{{item}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4" :style="{ textAlign: 'right' }">
            <a-form-item span="4">
              <div class="button-group">
                <a-button
                  size="middle"
                  class="button"
                  type="primary"
                  @click="showModal"
                  :disabled="emptyInput"
                >添加</a-button>
                 <a-modal
                   title="确认信息"
                   :visible="visible"
                   @ok="handleOk"
                   :confirmLoading="confirmLoading"
                   @cancel="handleCancel"
                 >
                  <p>{{`是否将 ${addData.num} 个配件(${addData.modelID})添加到 ${addData.warehouse}？`}}</p>
                 </a-modal>
                <a-button
                  size="middle"
                  class="button"
                  type="danger"
                  @click="onClickClearSelect"
                  :disabled="emptyInput"
                >重置</a-button>
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
              size="middle"
              class="button"
              type="primary"
              @click="onClickReload"
            >刷新表单</a-button>
          </div>
        </a-col>
      </div>
      <!-- table -->
      <a-card>
        <a-table :columns="columns" :dataSource="DataShow" @change="onChange"/>
      </a-card>
      <!-- table end -->
    </a-layout>

  </div>
</template>
<script>
import { getAccessoryInWarehouse, addAccessoryInWarehouse } from '@/api/accessory' 
import Fuse from 'fuse.js'
//types selection
const types = [{
  value: '履带',
  text: '履带'
  },{
  value: '螺丝',
  text : '螺丝'
  }]
// warehouses selection
const warehouses = [{
  value: "嘉定仓库",
  text: "嘉定仓库"
},{
  value: "wh_2",
  text: "第二仓库"
}]
//columns 
const columns = [{
  title: '型号编号',
  dataIndex: 'modelID',
  align:'center',
  key:'modelID',
}, {
  title: '配件类型',
  dataIndex: 'type',
  filters: types,
  align:'center',
  onFilter: (value, record) => record.type.indexOf(value) === 0
},{
  title: '价格',
  dataIndex: 'price',
  sorter: (a, b) => a.price - b.price
}, {
   title: '库存数量',
   dataIndex: 'num',
   align:'center',
   sorter: (a, b) => a.num - b.num
},{
  title: '所在仓库',
  dataIndex: 'warehouse',
  filters: warehouses,
  align:'center',
  onFilter: (value, record) => record.warehouse.indexOf(value) === 0
}];
function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


export default {
  data() {
    return {
      searchText: '',
      searchInput: null,
      input:'',
      visible: false,
      confirmLoading: false,
      ModalText:'',
      attributeModelID: {
        type: 'modelID', 
        cnType: '型号编号', 
        guide: '请输入型号编号'
      },
      attributeNum: {
        type: 'num', 
        cnType:'数量', 
        guide:'请输入配件数量'
      },
      attributeWarehouse: {
        type: 'warehouse',
        cnType: '仓库名称',
        guide: '请输入仓库名称'
      },
      warehouses: [
        "第一仓库",
        "第二仓库",
        "第三仓库",
        "第四仓库",
        "第五仓库",
        "第六仓库",
        "第七仓库",
        "第八仓库"
      ],
      models: [{
        modelID: 'model_1'
      },{
        modelID: 'model_2'
      } 
      ],
      // information of add
      addData: {
        modelID: '',
        num: '',
        warehouse: ''
      },
      columns,
      Data: [],
      form: this.$form.createForm(this),
      DataShow: []
    }
  },
  watch: {
    // // watch route
    // "$route": {
    //   handler(route){
    //     const that = this
    //     if(route.name ==='Report')
    //   }
    // }
    input(pattern){
      if( pattern == ''){
       this.DataShow = this.Data
      }
      else{
        const option = {
          keys: ['modelID'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.Data, option)
        this.DataShow = fuse.search(pattern)
      }
    }
  },
  computed: {
    emptyInput () {
      if (this.addData.modelID == '' || this.addData.num == '' || this.addData.warehouse == '')
      return true
      else return false
    }
  },
  methods: {
    //select
    onChange,
    //show modal
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = '您已成功添加！';
      this.confirmLoading = true;
      setTimeout(() => {
        this.visible = false;
        this.confirmLoading = false;
        this.onClickReload();
        this.onClickSubmit();},1000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button');
      this.visible = false
    },
  
    // refreshTable
    onClickReload () {
      getAccessoryInWarehouse().then((response) => {
        this.Data = [...response.data]
        this.DataShow = this.Data
        this.input = ''
      })
    },
    // onChange(value) {
    //     console.log('changed', value);
    //   },
    // clear all input
    onClickClearSelect () {
      this.addData.modelID=''
      this.addData.num=''
      this.addData.warehouse=''
      console.log(this.Data)
    },
    // submit

    onClickSubmit () {
      console.log(this.addData)
      addAccessoryInWarehouse(this.addData).then(() => {
        
      })
      this.onClickClearSelect()
    }
  },
  created () {
    getAccessoryInWarehouse().then((response) => {
      this.Data = [...response.data]
      this.DataShow = this.Data
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