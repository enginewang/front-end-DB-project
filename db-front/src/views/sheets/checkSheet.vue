<template>
  <div>
     
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col v-for="( item,index ) in attribute" :key="index" :span="4">
            <a-form-item :label="item.cnType">
              <a-input :placeholder="item.guide" v-model="addData[item.type]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
            <a-col :span="4" :style="{ textAlign: 'left' }">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickRefresh"
              >刷新表单</a-button>
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
    <!-- table -->
    <a-table :columns="columns" :dataSource="Data" bordered>
        <template
        v-for="col in ['id','potrolID', 'eqID','checkTime','checkArea']"
        :slot="col"
        slot-scope="text"
        >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <template slot="operation" >
          <div class="button">
              <a-button
                size="small"
                style="background:red"
                type ="primary"
                @click="onClickDelete"
              >删除</a-button>
            </div>
        </template>
    </a-table>
    <!-- table end -->
    <!-- add bar -->
    <!-- add bar end -->
  </div>
</template>
<script>
import { getCheckSheet } from '@/api/sheets'

const columns = [{
  title: '巡检单单号',
  dataIndex: 'id',
  sorter: (a, b) => a.id > b.id,
}, {
  title: '巡检员编号',
  dataIndex: 'potrolID',
  sorter: (a, b) => a.potrolID > b.potrolID,
},{
  title: '巡检器材编号',
  dataIndex: 'eqID',
  sorter: (a, b) => a.eqID > b.eqID,
}, {
  title: '巡检时间',
  dataIndex: 'checkTime',
  sorter: (a, b) => a.checkTime > b.checkTime
},{
  title: '巡检地区',
  dataIndex: 'checkArea',
},{
  titile: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}];
const Data = []

function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}
export default {
  inject: ['reload'],
  data() {
    this.cacheData = Data.map(item => ({ ...item }))
    return {
      attribute:[
        {type: 'id', cnType: '巡检单单号', guide: '请输入巡检单单号'},
        {type: 'potrolID', cnType: '巡检员编号', guide: '请输入巡检员编号'},
      ],
      Data,
      columns,
      // information of add
      addData: {
        id: '',
        potrolID: ''
      },
      columns,
      Data,
      isRouterAlive: true,
      form: this.$form.createForm(this)
    }
  },
  computed:{
      emptyInput () {
      if (this.addData.id !== '' || this.addData.potrolID !== '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    //select
    onChange,
    // clear all input
    onClickClearSelect () {
      this.addData.type = ''
      this.addData.price = ''
      this.addData.model = ''
      this.addData.warehouseID = ''
      this.addData.num = ''
    },
    // submit
    onClickSubmit () {
      console.log(this.addData)
      this.onClickClearSelect()
    },
    onClickRefresh(){
      this.reload()
    },
    //delete
    onClickDelete () {
      console.log('delete')
      // to be complete
    },
  },
  mounted () {
    getCheckSheet().then((response) => {
      console.log(...response)
      this.Data = [...response]
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