<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item label="查找工单">
              <a-input placeholder="请输入工单单号" v-model="input"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter='24'>
          <a-col :md="8" :sm="24" :lg='10'>
            <a-form-item label="根据编号查找维修员">
              <a-input placeholder="请输入维修员编号" v-model="input2"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" :lg='10'>
            <a-form-item label="根据姓名查找维修员">
              <a-input placeholder="请输入维修员姓名" v-model="input3"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter='24'>
          <a-col :md="8" :sm="24" :lg='10'>
            <a-form-item label="根据编号查找调度员">
              <a-input placeholder="请输入调度员编号" v-model="input4"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24" :lg='10'>
            <a-form-item label="根据姓名查找调度员">
              <a-input placeholder="请输入调度员姓名" v-model="input5"/>
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
    <a-card>
    <a-table :columns="columns" :dataSource="wDataShow" rowKey='id' bordered>
      <template
        v-for="col in ['id','equipID', 'repairerID','repairerName','repairArea','dispatcherID','dispatcherName','statue']"
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
      <template slot="operation" slot-scope="text, record" >
          <a-button
                size="small"
                type ="danger"
                :hidden ='text'
                @click="onClickDelete(record.id)"
              >删除</a-button>
              <a-modal
                title="确认删除"
                v-model = "visible2"
                @ok = "onClickDeleteRow"
                >
                <div class = "modal">
                    是否删除本条记录
                </div></a-modal>
        </template>
    </a-table>
    </a-card>
    <!-- table end -->
  </div>
</template>


<script>
import Fuse from 'fuse.js'
import Vue from 'vue'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)
import { getWorkSheet, deleteWorkSheetRow } from '@/api/sheets'


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
  //width: '10%',
  align: 'center',
  scopedSlots: { customRender: 'id' },
  sorter: (a, b) => a.id > b.id,
}, {
  title: '被维修器件编号',
  dataIndex: 'equipID',
 // width: '15%',
  align: 'center',
  scopedSlots: { customRender: 'equipID' },
  sorter: (a, b) => a.equipID > b.equipID,
}, {
  title: '指定维修员编号',
  dataIndex: 'repairerID',
  //width: '15%',
  align: 'center',
  scopedSlots: { customRender: 'repairerID' },
  sorter: (a, b) => a.repairerID > b.repairerID,
},{
  title: '维修员姓名',
  dataIndex: 'repairerName',
  //width: '15%',
  align: 'center',
  scopedSlots: { customRender: 'repairerName' },
},{
  title: '维修区域',
  dataIndex: 'repairArea',
  //width: '12%',
  align: 'center',
  scopedSlots: { customRender: 'repairArea' }
},{
  title: '调度员编号',
  dataIndex: 'dispatcherID',
  //width: '13%',
  align: 'center',
  scopedSlots: { customRender: 'dispatcherID' },
  sorter: (a, b) => a.dispatcherID > b.dispatcherID,
},{
  title: '调度员姓名',
  dataIndex: 'dispatcherName',
  //width: '13%',
  align: 'center',
  scopedSlots: { customRender: 'dispatcherName' },
}, {
  title: '工单状态',
  dataIndex: 'statue',
  align: 'center',
  //width: '12%',
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
  align: 'center',
  dataIndex: 'work_picture',
  scopedSlots: { customRender: 'work_picture' }
},{
  titile: '操作',
  align: 'center',
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
      input3: '',
      input4:'',
      input5:'',
      wData,
      wDataShow,
      deleteInfo: '',
      columns,
      // information of add
      isRouterAlive: true,
      visible: false,
      visible2: false,
      src: "",
      todelete:'',
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
      },
    input3(pattern){
          if(pattern == ''){
              this.wDataShow = this.wData
          }
          else{
              const option = {
                  keys: ['repairerName'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.wData,option)
              this.wDataShow = fuse.search(pattern)
          }
      },
    input4(pattern){
          if(pattern == ''){
              this.wDataShow = this.wData
          }
          else{
              const option = {
                  keys: ['dispatcherID'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.wData,option)
              this.wDataShow = fuse.search(pattern)
          }
      },
    input5(pattern){
          if(pattern == ''){
              this.wDataShow = this.wData
          }
          else{
              const option = {
                  keys: ['dispatcherName'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.wData,option)
              this.wDataShow = fuse.search(pattern)
          }
      },
      
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
    //delete row
    onClickDeleteRow () {
      this.visible2 = false;
      const newData = [...this.wDataShow]
      console.log(newData)
      const target = newData.filter(item => this.todelete === item.id)[0]
      console.log(target)
      if(target.statue === '0'){
          this.$notification.open({
          message: '删除失败',
          description: '未完成的工单不可删除',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        return
      }
      
      deleteWorkSheetRow({ id : target.id}).then((response) => {
        this.deleteInfo = response.info
        if(this.deleteInfo !== 'fail'){
          this.wData = [...response.data]
          this.wDataShow = this.wData
        }
        if(this.deleteInfo === 'ok'){
          this.$notification.open({
          message: '删除成功',
          description: '本条工单记录删除成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
        }
        else{
          this.$notification.open({
          message: '删除失败',
          description: '本条工单记录删除失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
      })
      // to be complete
    },
    onClickRefresh(){
      this.reload()
    },
    //modal dispear
    onClickDelete (id) {
      console.log(id)
      this.todelete = id
      this.visible2 = true;
    },
   
  },
  mounted () {
    console.log(columns[5])
    getWorkSheet().then((response) => {
      console.log(...response.data)
      this.wData = [...response.data]
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

