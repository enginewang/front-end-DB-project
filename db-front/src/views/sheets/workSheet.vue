<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="工单单号">
              <a-input placeholder="请输入工单单号" v-model="input"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="维修员编号">
              <a-input placeholder="请输入维修员编号" v-model="input2"/>
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
              >刷新表单</a-button><br>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <!-- input bar end -->
    <!-- table -->
    <a-table :columns="columns" :dataSource="wDataShow"  bordered>
      <template
        v-for="col in ['id','equipID', 'repairerID','repairArea','dispatcherID','statue']"
        :slot="col"
        slot-scope="text"
      >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      
      <template slot = 'statue' slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </template>
      <template slot="work_picture" slot-scope="text">
        <!--<div>
          <a-avatar slot="avatar" size="large" shape="square" :src="text"/>
        </div>-->
        <div id="app">
          <div class="">
          <div
            class="pic"
            @click="() => showImg(text)"
          >
          <a-avatar :src="text"/>
          </div>
        </div>
        <vue-easy-lightbox
          :visible="visible"
          :imgs="src"
          @hide="handleHide"
        ></vue-easy-lightbox>
        </div>
      </template>
      <template slot="operation" >
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
        </template>
    </a-table>
    <!-- table end -->
  </div>
</template>

<script src="path/to/vue.js"></script>
<script src="path/to/vue-easy-lightbox.umd.min.js"></script>
<script>
import Fuse from 'fuse.js'
import Vue from 'vue'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)
import { getWorkSheet } from '@/api/sheets'


const statusMap = {
  0: {
    status: 'processing',
    text: '进行'
  },
  1: {
    status: 'success',
    text: '完成'
  }
}

// columns type name

const columns = [{
  title: '工单单号',
  dataIndex: 'id',
  width: '10%',
  scopedSlots: { customRender: 'id' },
  sorter: (a, b) => a.id > b.id,
}, {
  title: '被维修器件编号',
  dataIndex: 'equipID',
  width: '17%',
  scopedSlots: { customRender: 'equipID' },
  sorter: (a, b) => a.equipID > b.equipID,
}, {
  title: '指定维修员编号',
  dataIndex: 'repairerID',
  width: '17%',
  scopedSlots: { customRender: 'repairerID' },
  sorter: (a, b) => a.repairerID > b.repairerID,
},{
  title: '维修区域',
  dataIndex: 'repairArea',
  width: '12%',
  scopedSlots: { customRender: 'repairArea' }
},{
  title: '调度员编号',
  dataIndex: 'dispatcherID',
  width: '13%',
  scopedSlots: { customRender: 'dispatcherID' },
  sorter: (a, b) => a.dispatcherID > b.dispatcherID,
}, {
  title: '工单状态',
  dataIndex: 'statue',
  width: '12%',
  
  filters: [{
    text: '进行',
    value: '0'
  },{
    text: '完成',
    value: '1'
  }],
  onFilter: (value, record) => record.statue.indexOf(value) === 0,
  scopedSlots: { customRender: 'statue' },
},{
  title: '维修结果图片',
  dataIndex: 'work_picture',
  scopedSlots: { customRender: 'work_picture' }
},{
  titile: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]


// sheets data
const wData = []
const wDataShow = []
export default {
  name: 'workSheet',
  inject: ['reload'],
   
  data() {
    this.cacheData = wData.map(item => ({ ...item }))
    return {
      attributeID: {
        type: 'id',
        cnType: '工单单号',
        guide: '请输入单号'
      },
      attributeRepairer: {
        type: 'repairerID',
        cnType: '查询特定维修员的工单',
        guide: '请输入维修员编号'
      },
      input: '',
      input2: '',
      wData,
      wDataShow,
      columns,
      // information of add
      workSheetsData: {
        id: '',
        repairerID: ''
      },
      isRouterAlive: true,
      visible: false,
      visible2: false,
      src: "",
      form: this.$form.createForm(this)
    }
  },
  watch:{
    input(pattern){
          if(pattern == ''){
              this.wDataShow = this.wData
          }
          else{
              const option = {
                  keys: ['id'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.wData,option)
              this.wDataShow = fuse.search(pattern)
          }
      },
      input2(pattern){
          if(pattern == ''){
              this.wDataShow = this.wData
          }
          else{
              const option = {
                  keys: ['repairerID'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.wData,option)
              this.wDataShow = fuse.search(pattern)
          }
      }
  },
  
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  
  methods: {
    showImg (text) {
        this.visible = true
        this.src = text
      },
    handleHide () {
      this.visible = false
    },
    // clear all input
    onClickClearSelect () {
      this.workSheetsData.id = ''
      this.workSheetsData.statue = '请选择状态'
    },
    // submit
    onClickSubmit () {
      console.log(this.workSheetsData)
      this.onClickClearSelect()
      // to be complete
    },
    //delete
    onClickDelete () {
      console.log('delete')
      // to be complete
    },
    onClickRefresh(){
      this.reload()
    },
    onClickDelete () {
      this.visible2 = true;
    },
    handleOK(e){
        this.visible2 = false;
        //to be completed
    }
  },
  mounted () {
    console.log(columns[5])
    getWorkSheet().then((response) => {
      console.log(...response)
      this.wData = [...response]
      this.wDataShow = this.wData
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

