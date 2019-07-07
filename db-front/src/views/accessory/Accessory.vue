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
                  <a-select-option value="1">model_1</a-select-option>
                  <a-select-option value="2">model_2</a-select-option>
                  <a-select-option value="3">model_3</a-select-option>
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
                  showSearch
                  allowClear="true"
                  placeholder="请选择仓库"
                  optionFilterProp="children"
                  v-model="addData[attributeWarehouse.type]">
                  <a-select-option value="1">第一仓库</a-select-option>
                  <a-select-option value="2">第二仓库</a-select-option>
                  <a-select-option value="3">第三仓库</a-select-option>
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
                    @click="onClickSubmit"
                    :disabled="emptyInput"
                  >添加</a-button>
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
      <!-- table -->
      <a-table :columns="columns" :dataSource="data" @change="onChange"/>
      <!-- table end -->
    </a-layout>
  </div>
</template>
<script>
//types selection
const types = [{
  text: "履带",
  value: 'type1',
  },{
  text: '螺丝',
  value: 'type0',
  }]
//warehouses selection
const warehouses = [{
  value: "wh_1",
  text: "第一仓库"
},{
  value: "wh_2",
  text: "第二仓库"
}]
//columns 
const columns = [{
  title: '型号编号',
  dataIndex: 'modelID',
  sorter: (a, b) => a.modelID - b.modelID,
}, {
  title: '配件类型',
  dataIndex: 'type',
  filters: types,
  onFilter: (value, record) => record.type.indexOf(value) === 0
},{
  title: '价格',
  dataIndex: 'price',
  sorter: (a, b) => a.price - b.price
}, {
   title: '库存数量',
   dataIndex: 'num',
   sorter: (a, b) => a.num - b.num
},{
  title: '所在仓库',
  dataIndex: 'warehouseID',
  filters: warehouses,
  onFilter: (value, record) => record.warehouseID.indexOf(value) === 0
}];

const data = []
for (let i = 0; i < 100; i++) {
    data.push({
        modelID: i.toString(),
        type: `type${i % 2}`,
        price: `$ ${100 - i}`,
        num: `${i * 10}`,
        warehouseID: `wh_${i % 2 + 1}`
    })
}
function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


export default {
  data() {
    return {
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
        {id: '1', name: '第一仓库'},
        {id: '2', name: '第二仓库'},
        {id: '3', name: '第三仓库'},
        {id: '4', name: '第四仓库'},
        {id: '5', name: '第五仓库'},
        {id: '6', name: '第六仓库'},
        {id: '7', name: '第七仓库'},
        {id: '8', name: '第八仓库'},
        {id: '9', name: '第九仓库'},
        {id: '10', name: '第十仓库'},
      ],
      data,
      columns,
      // information of add
      addData: {
        modelID: '',
        num: '',
        warehouse: ''
      },
      columns,
      data,
      form: this.$form.createForm(this),
     
    }
  },
  // computed: {
  //   emptyInput () {
  //     if (this.addData.type == '' || this.addData.price == )
  //   }
  // },
  methods: {
    //select
    onChange,
    onChange(value) {
        console.log('changed', value);
      },
    // clear all input
    onClickClearSelect () {
      this.addData.modelID=''
      this.addData.num=''
      this.addData.warehouse=''
    },
    // submit
    onClickSubmit () {
      console.log(this.addData)
      this.onClickClearSelect()
    }
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
</style>