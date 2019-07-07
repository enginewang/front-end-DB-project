<template>
  <div>
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="巡检单单号">
              <a-input placeholder="请输入巡检单单号" v-model="input"/>
            </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
            <a-form-item label="巡检员编号">
              <a-input placeholder="请输入巡检员编号" v-model="input2"/>
            </a-form-item>
            </a-col>

        </a-row>
        <a-row>
            <a-col :span="4" style=" textAlign: 'left';margin-bottom: 24px">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickRefresh"
              >刷新表单</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- table -->
    <a-table :columns="columns" :dataSource="DataShow" bordered>
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
              <a-modal
                title="确认删除"
                v-model = "visible2"
                @ok = "handleOK"
                >
                <div class = "modal">
                    是否删除本条记录
                </div></a-modal>
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
import Fuse from 'fuse.js'

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
const DataShow = []
function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}
export default {
  inject: ['reload'],
  data() {
    this.cacheData = Data.map(item => ({ ...item }))
    return {
      Data,
      DataShow,
      input: '',
      input2: '',
      fuseOption:{
        key: ['id'],
      },
      columns,
      visible2: false,
      isRouterAlive: true,
      form: this.$form.createForm(this)
    }
  },
  watch:{
      input(pattern){
          if(pattern == ''){
              this.DataShow = this.Data
          }
          else{
              const option = {
                  keys: ['id'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.Data,option)
              this.DataShow = fuse.search(pattern)
          }
      },
      input2(pattern){
          if(pattern == ''){
              this.DataShow = this.Data
          }
          else{
              const option = {
                  keys: ['potrolID'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.Data,option)
              this.DataShow = fuse.search(pattern)
          }
      }
  },
  computed:{
      
  },
  methods: {
    //select
    onChange,
    
    onClickRefresh(){
      this.reload()
    },
    //delete
    onClickDelete () {
      this.visible2 = true;
    },
    handleOK(e){
        this.visible2 = false;
        //to be completed
    }
  },
  mounted () {
    getCheckSheet().then((response) => {
      console.log(...response)
      this.Data = [...response]
      this.DataShow = this.Data
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