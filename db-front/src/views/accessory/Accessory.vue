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
                placeholder="请选择仓库"
                showSearch
                allowClear="true"
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
      <!-- input bar end -->
      <!-- refresh button -->
      <!-- table -->
      <a-card>
        <a-table :columns="columns" :dataSource="Data" @change="onChange">
          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class='custom-filter-dropdown'>      <!-- table end -->
            <a-input
              v-ant-ref="c => searchInput = c"
              placeholder="请输入型号"
              :value="selectedKeys[0]"
              @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="() => handleSearch(selectedKeys, confirm)"
              style="width: 188px; margin-bottom: 8px; display: block;"
            />
            <a-button
              type='primary'
              @click="() => handleSearch(selectedKeys, confirm)"
              icon="search"
              size="small"
              style="width: 90px; margin-right: 8px"
            >搜索</a-button>
            <a-button
              @click="() => handleReset(clearFilters)"
              size="small"
              style="width: 90px"
            >Reset</a-button>
          </div>
           <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : undefined }" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <mark v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</mark>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>
  </a-table>
        </a-table>

      </a-card>
    </a-layout>

  </div>
</template>
<script>
import { getAccessoryInWarehouse } from '@/api/accessory' 
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
  align:'center',
  key:'modelID',
  scopedSlots: {
    filterDropdown: 'filterDropdown',
    filterIcon: 'filterIcon',
    customRender: 'customRender',
  },
  onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => {
        this.searchInput.focus()
      },0)
    }
  }
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
  dataIndex: 'warehouseID',
  filters: warehouses,
  align:'center',
  onFilter: (value, record) => record.warehouseID.indexOf(value) === 0
}];

// const data = []
// for (let i = 0; i < 100; i++) {
//     data.push({
//         modelID: i.toString(),
//         type: `type${i % 2}`,
//         price: `$ ${100 - i}`,
//         num: `${i * 10}`,
//         warehouseID: `wh_${i % 2 + 1}`
//     })
// }
function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


export default {
  data() {
    return {
      searchText: '',
      searchInput: null,

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
      // information of add
      addData: {
        modelID: ``,
        num: '',
        warehouse: ''
      },
      columns,
      Data: [{
        'modelID': 'model_001',
        'type': '履带',
        'price': 12,
        'num': 10,
        'warehouse':'嘉定仓库',
        'warehouseID':'1234567890'
      }],
      form: this.$form.createForm(this),
     
    }
  },
  // computed: {
  //   emptyInput () {
  //     if (this.addData.type == '' || this.addData.price == )
  //   }
  // },
  methods: {
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    //select
    onChange,
    // refreshTable
    refreshTable(){
      getAccessoryInWarehouse().then((response) => {
        this.data = [...response.data]
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
      getAccessoryInWarehouse().then((response) => {
        this.Data = [ 
          ...response.data ]
      })
      console.log(this.Data)
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