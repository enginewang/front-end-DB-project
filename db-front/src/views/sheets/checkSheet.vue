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
        </a-row>
        <a-row :gutter = '24'>
            <a-col :md="8" :sm="24" :lg = '10'>
            <a-form-item label="根据编号查找巡检员">
              <a-input placeholder="请输入巡检员编号" v-model="input2"/>
            </a-form-item>
            </a-col>

             <a-col :md="8" :sm="24" :lg = '10'>
            <a-form-item label="根据姓名查找巡检员">
              <a-input placeholder="请输入巡检员姓名" v-model="input3"/>
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
    <a-card>
    <a-table :columns="columns" :dataSource="DataShow" rowKey = 'id' bordered>
        <template
        v-for="col in ['id','potrolID', '','eqID','checkTime','checkArea']"
        :slot="col"
        slot-scope="text"
        >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <template slot="checkPic" slot-scope="text">
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
      <template slot="operation" slot-scope="text, record">
          <div class="button">
              <a-button
                size="small"
                style="background:red"
                type ="primary"
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
            </div>
        </template>
    </a-table>
    </a-card>
    <!-- table end -->
    <!-- add bar -->
    <!-- add bar end -->
  </div>
</template>
<script>
import { getCheckSheet, deleteCheckSheetRow } from '@/api/sheets'
import Vue from 'vue'
import Fuse from 'fuse.js'
import Lightbox from 'vue-easy-lightbox'

Vue.use(Lightbox)

const columns = [{
  title: '巡检单单号',
  dataIndex: 'id',
  align: 'center',
  sorter: (a, b) => a.id > b.id,
}, {
  title: '巡检员编号',
  dataIndex: 'potrolID',
  align: 'center',
  sorter: (a, b) => a.potrolID > b.potrolID,
}, {
  title: '巡检员姓名',
  dataIndex: 'potrolName',
  align: 'center',
  sorter: (a, b) => a.potrolID > b.potrolID,
},{
  title: '巡检器材编号',
  dataIndex: 'eqID',
  align: 'center',
  sorter: (a, b) => a.eqID > b.eqID,
}, {
  title: '巡检时间',
  dataIndex: 'checkTime',
  align: 'center',
  sorter: (a, b) => a.checkTime > b.checkTime
},{
  title: '巡检地区',
  align: 'center',
  dataIndex: 'checkArea',
},{
  title: '巡检结果图片',
  align: 'center',
  dataIndex: 'checkPic',
  scopedSlots: { customRender: 'checkPic' }
},{
  titile: '操作',
  align: 'center',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}];

const Data = []
const DataShow = []

export default {
  inject: ['reload'],
  data() {
    this.cacheData = Data.map(item => ({ ...item }))
    return {
      Data,
      DataShow,
      input: '',
      input2: '',
      input3: '',
      columns,
      visible: false,
      visible2: false,
      src: "",
      isRouterAlive: true,
      todelete:'',
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
      },
      input3(pattern){
          if(pattern == ''){
              this.DataShow = this.Data
          }
          else{
              const option = {
                  keys: ['potrolName'],
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
    showImg (text) {
        this.visible = true
        this.src = text
      },
    //select
    handleHide () {
      this.visible = false
    },
    
    onClickRefresh(){
      this.reload()
    },
    //delete
    onClickDelete (id) {
      this.todelete = id
      this.visible2 = true;
    },
    handleOK(e){
        this.visible2 = false;
        //to be completed
    },
    onClickDeleteRow () {
      this.visible2 = false;
      const newData = [...this.DataShow]
      console.log(newData)
      const target = newData.filter(item => this.todelete === item.id)[0]
      console.log(target)
      deleteCheckSheetRow(target.id).then((response) => {
        this.deleteInfo = response.data.deleteInfo
        if(this.deleteInfo !== 'fail'){
          this.Data = [...response.data.Data]
          this.DataShow = this.Data
        }
        if(this.deleteInfo === 'ok'){
          this.$notification.open({
          message: '删除成功',
          description: '本条巡检单记录删除成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
        }
        else{
          this.$notification.open({
          message: '删除失败',
          description: '本条巡检单记录删除失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
      })
      // to be complete
    },
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