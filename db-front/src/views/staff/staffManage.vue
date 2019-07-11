<template>
  <page-view title="员工管理">
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="根据编号查找员工">
                <a-input placeholder="请输入员工编号" v-model="input"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="根据姓名查找员工">
                <a-input placeholder="请输入员工姓名" v-model="input2"/>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="根据账号查找员工">
                <a-input placeholder="请输入员工账号" v-model="input3"/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="48">
            <a-col style=" textAlign: 'left' margin-bottom: 24px">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickRefresh"
              >刷新表单
              </a-button>
              <br>
            </a-col>
            <a-col style=" textAlign: 'right' margin-bottom: 24px">
              <div class="addButton">
                <a-button type="primary" color="#108ee9" size="large" icon="plus" @click="handleAdd">新建</a-button>
              </div>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <a-table
        size="default"
        :columns="columns"
        :dataSource="sfDataShow"
        rowKey='id'
        style=" margin-top: 24px"
      >

        <div
          slot="expandedRowRender"
          slot-scope="record"
          style="margin: 0">
          <a-row
            :gutter="24"
            :style="{ marginBottom: '12px' }">
            <a-col :span="12" v-for="(role, index) in record.detail" :key="index" :style="{ marginBottom: '12px' }">

              <a-col :lg="8" :md="24" :span="20">
                <a-tag color='cyan'>{{ role.roleName }}：</a-tag>
              </a-col>
              <a-col :lg="14">{{role.var}}</a-col>
            </a-col>
          </a-row>
        </div>
        <template slot='status' slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter"/>
        </template>
        <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">修改</a>
        <a-divider type="vertical"/>
        <a @click="onClickDelete(record.id)">删除</a>
        <a-modal
          title="确认删除"
          v-model="visible3"
          @ok="onClickDeleteRow"
        >
                <div class="modal">
                    是否删除本条记录
                </div></a-modal>
      </span>
      </a-table>

      <a-modal
        title="修改员工信息"
        style="top: 20px;"
        :width="800"
        v-model="visible"
        @ok="handleOk"
      >

        <a-form :from="(form)=>{this.form = form} " rowKey='id' bordered>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工编号"
            hasFeedback
            validateStatus="success"
          >
            <a-input placeholder="员工编号" v-model="newmdl.id" id="no" disabled="disabled"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工姓名"
            hasFeedback
            :validateStatus="successName"
          >
            <a-input placeholder="新名字" v-model="newmdl.name" id="role_name"/>
          </a-form-item>


          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工身份"
            hasFeedback
            validateStatus="success"
          >
            <a-select disabled v-model="mdl.status">
              <a-select-option value="0">巡检员</a-select-option>
              <a-select-option value="1">维修员</a-select-option>
              <a-select-option value="2">调度员</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="登录账号"
            hasFeedback
            validateStatus="success"
          >
            <a-input disabled="disabled" v-model="newmdl.accountID" id="role_name"/>
          </a-form-item>

          <a-row :gutter="24" style="margin-left: 2rem">
            <a-col :md="24" :lg="18">
              <a-form-item
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                label="密码"
                hasFeedback
                :validateStatus="successPassword"
              >
                <a-input placeholder="新密码(最少8位)" v-model="newmdl.password" id="role_password"/>
              </a-form-item>
            </a-col>
            <a-col :md="24" :lg="2">
              <a-button>
                编辑
              </a-button>
            </a-col>
          </a-row>



          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="电话"
            hasFeedback
            :validateStatus="successTel"
          >
            <a-input placeholder="新电话(11位)" v-model="newmdl.telNumber" id="role_telnumber"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="身份证号码"
            hasFeedback
            :validateStatus="successIdcard"
          >
            <a-input placeholder="重新填写身份证号码(18位)" v-model="newmdl.idCardNumber" id="role_idCard"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="每周工作开始时间"
            hasFeedback
            validateStatus="success"
            visible='false'
          >
            <a-select :disabled="ifRepair" v-model="newmdl.startTime">
              <a-select-option value="周一">周一</a-select-option>
              <a-select-option value="周二">周二</a-select-option>
              <a-select-option value="周三">周三</a-select-option>
              <a-select-option value="周四">周四</a-select-option>
              <a-select-option value="周五">周五</a-select-option>
              <a-select-option value="周六">周六</a-select-option>
              <a-select-option value="周日">周日</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="每周工作结束时间"
            hasFeedback
            validateStatus="success"
          >
            <a-select :disabled="ifRepair" v-model="newmdl.endTime">
              <a-select-option value="周一">周一</a-select-option>
              <a-select-option value="周二">周二</a-select-option>
              <a-select-option value="周三">周三</a-select-option>
              <a-select-option value="周四">周四</a-select-option>
              <a-select-option value="周五">周五</a-select-option>
              <a-select-option value="周六">周六</a-select-option>
              <a-select-option value="周日">周日</a-select-option>
            </a-select>
          </a-form-item>

          <a-divider/>


        </a-form>
        <a-modal
          title="确认修改"
          v-model="visible2"
          @ok="handlenewOk"
        >
          <div class="modal">
            是否确认修改
          </div>
        </a-modal>
      </a-modal>


      <a-modal
        title="添加新员工"
        style="top: 20px;"
        :width="800"
        v-model="visible4"
        @ok="handlenewnewOk"
      >
        <a-form :from="(form)=>{this.form = form} " rowKey='id' bordered>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工姓名"
            :validateStatus="successAddName"
            hasFeedback
          >
            <a-input placeholder="请输入新用户姓名" v-model="addmdl.name" id="role_name"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="员工身份"
            hasFeedback
            validateStatus="success"
          >
            <a-select v-model="addmdl.status">
              <a-select-option value="0">巡检员</a-select-option>
              <a-select-option value="1">维修员</a-select-option>
              <a-select-option value="2">调度员</a-select-option>
            </a-select>
          </a-form-item>


          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="密码"
            hasFeedback
            :validateStatus="successAddPassword"
          >
            <a-input placeholder="请输入新用户密码(最少8位)" v-model="addmdl.password" id="role_password"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="电话"
            hasFeedback
            :validateStatus="successAddTel"
          >
            <a-input placeholder="请填写新用户电话(11位)" v-model="addmdl.telNumber" id="role_telnumber"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="身份证号码"
            hasFeedback
            :validateStatus="successAddIdNumber"
          >
            <a-input placeholder="请填写新用户身份证号码(18位)" v-model="addmdl.idCardNumber" id="role_idCard"/>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="每周工作开始时间"
            validateStatus="success"
            hasFeedback
          >
            <a-select :disabled="ifAddRepair" v-model="addmdl.startTime">
              <a-select-option value="周一">周一</a-select-option>
              <a-select-option value="周二">周二</a-select-option>
              <a-select-option value="周三">周三</a-select-option>
              <a-select-option value="周四">周四</a-select-option>
              <a-select-option value="周五">周五</a-select-option>
              <a-select-option value="周六">周六</a-select-option>
              <a-select-option value="周日">周日</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            label="每周工作结束时间"
            validateStatus="success"
            hasFeedback
          >
            <a-select :disabled="ifAddRepair" v-model="addmdl.endTime">
              <a-select-option value="周一">周一</a-select-option>
              <a-select-option value="周二">周二</a-select-option>
              <a-select-option value="周三">周三</a-select-option>
              <a-select-option value="周四">周四</a-select-option>
              <a-select-option value="周五">周五</a-select-option>
              <a-select-option value="周六">周六</a-select-option>
              <a-select-option value="周日">周日</a-select-option>
            </a-select>
          </a-form-item>


        </a-form>
        <a-modal
          title="确认添加"
          v-model="visible5"
          @ok="onClickNewRow"
        >
          <div class="modal">
            是否确认添加
          </div>
        </a-modal>
      </a-modal>


    </a-card>
  </page-view>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import { getStaffSheet, deleteStaffSheetRow, modifyStaffSheetRow, addStaffSheetRow } from '@/api/staff'
import Fuse from 'fuse.js'
import md5 from 'md5'
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";

const statusMap = {
  0: {
    status: 'processing',
    text: '巡检员'
  },
  1: {
    status: 'success',
    text: '维修员'
  },
  2: {
    status: 'error',
    text: '调度员'
  }
}

export default {
  name: 'TableList',
  inject: ['reload'],
  components: {
    ACol,
    ARow,
    PageView,
    STable
  },
  data () {
    return {

      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: null,
      mdl: {},
      visible2: false,
      visible3:false,
      visible4:false,
      visible5:false,
      newmdl:{
        'id':'',
        'name':'',
        'accountID':'',
        'password':'',
        'status':'',
        'telNumber':'',
        'idCardNumber':'',
        'startTime':'',
        'endTime':''
      },
      addmdl:{
        'name':'',
        'password':'',
        'status':'0',
        'telNumber':'',
        'idCardNumber':'',
        'startTime':'周一',
        'endTime':'周日'
      },
      input:'',
      input2: '',
      input3:'',
      sfData:[],
      sfDataShow:[],
      statusMap,
      todelete:'',
      deleteInfo:'',
      modifyInfo:'',
      addInfo:'',
      accountInfo:'',

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '员工编号',
          dataIndex: 'id',
          align:'center',
          sorter:(a,b) => a.id > b.id
        },
        {
          title: '员工姓名',
          align:'center',
          dataIndex: 'name'
        },
        {
          title: '登录账号',
          align:'center',
          dataIndex: 'accountID'
        },
         {
          title: '员工身份',
          align:'center',
          dataIndex: 'status',
          filters:[{
            text:'巡检员',
            value:'0'
          },{
            text:'维修员',
            value:'1',
          },{
            text:'调度员',
            value:'2'
          }],
          onFilter:(value,record) => record.status.indexOf(value) === 0,
          scopedSlots: { customRender: 'status' }
        },{
          title: '操作',
          align:'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getStaffSheet().then((response) => {
      console.log(...response.data)
      this.sfData = [...response.data]
      this.sfDataShow = this.sfData
    })
  },
  watch:{
    input(pattern){
          if(pattern == ''){
              this.sfDataShow = this.sfData
          }
          else{
              const option = {
                  keys: ['id'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.sfData,option)
              this.sfDataShow = fuse.search(pattern)
          }
      },
      input2(pattern){
          if(pattern == ''){
              this.sfDataShow = this.sfData
          }
          else{
              const option = {
                  keys: ['name'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.sfData,option)
              this.sfDataShow = fuse.search(pattern)
          }
      },
      input3(pattern){
          if(pattern == ''){
              this.sfDataShow = this.sfData
          }
          else{
              const option = {
                  keys: ['accountID'],
                  threshold: 0.1
              }
              var fuse = new Fuse(this.sfData,option)
              this.sfDataShow = fuse.search(pattern)
          }
      }
  },
  computed:{
      successName: function(){
        if(this.newmdl.name === ''){
          return "error"
        }
        return "success"
      },
      successTel: function(){
        if(this.newmdl.telNumber.length !== 11){
          return "error"
        }
        if(!(/(^[0-9]\d*$)/.test(this.newmdl.telNumber))){
          return "error"
      }else{
        return "success"
      }
      },
      successIdcard: function(){
        if(this.newmdl.idCardNumber.length !== 18){
          return "error"
        }
        return "success"
      },
      successPassword: function(){
        if(this.newmdl.password.length < 8||this.newmdl.password.length > 12){
          return "error"
        }
        return "success"
      },
      ifRepair: function(){
        console.log("visible",this.newmdl.status)
        if(this.newmdl.status === '1'){
          console.log("disabled")
          return "disabled"
        }
      },
      successAddName: function(){
        if(this.addmdl.name === ''){
          return "error"
        }
        return "success"
      },
      successAddPassword: function(){
        if(this.addmdl.password.length < 8 ||this.addmdl.password.length > 12){
          return "error"
        }
        return "success"
      },
      successAddTel: function(){
        if(this.addmdl.telNumber.length !== 11){
          return "error"
        }
        if(!(/(^[0-9]\d*$)/.test(this.addmdl.telNumber))){
          return "error"
        }
        return "success"
      },
      successAddIdNumber: function(){
        if(this.addmdl.idCardNumber.length !== 18){
          return "error"
        }
        return "success"
      },
      ifAddRepair: function(){
        console.log("status",this.addmdl.status)
        if(this.addmdl.status === '1'){
          console.log("disabled")
          return "disabled"
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
    handleEdit (record) {
      this.mdl = Object.assign({}, record)
      this.newmdl.id = this.mdl.id
      this.newmdl.name = this.mdl.name
      this.newmdl.accountID = this.mdl.accountID
      this.newmdl.status = this.mdl.status
      this.newmdl.telNumber = this.mdl.detail[0].var
      this.newmdl.idCardNumber=this.mdl.detail[1].var
      this.newmdl.startTime = this.mdl.detail[4].var
      this.newmdl.endTime = this.mdl.detail[5].var
      console.log('detail',this.mdl.detail[0])

      this.visible = true
    },
    handleOk () {
      if(this.successName === "error"||this.successTel === "error"||
      this.successIdcard === "error"||this.successPassword === "error"){
        this.$notification.open({
          message: '修改失败',
          description: '请按要求填写员工新信息',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      this.visible2 = true
    },
    handlenewOk(){
      this.visible =false
      this.visible2 = false
      this.newmdl.password = md5(this.newmdl.password)
      modifyStaffSheetRow(this.newmdl).then((response) => {
        this.modifyInfo = response.info
        if(this.modifyInfo === 'ok'){
          this.$notification.open({
          message: '修改成功',
          description: '本条员工记录修改成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
        this.sfData = [...response.data.msfData]
          this.sfDataShow = this.sfData
        }
        else{
          this.$notification.open({
          message: '修改失败',
          description: '本条员工记录修改失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
      })
    },
    handlenewnewOk(){
      if(this.successAddName === "error"||this.successAddTel === "error"||
      this.successAddIdNumber === "error"||this.successAddPassword === "error"){
        this.$notification.open({
          message: '添加失败',
          description: '请按要求填写新员工信息',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      this.visible5 = true

    },
    onClickDelete (id) {
      console.log(id)
      this.todelete = id
      this.visible3 = true;
    },
    //delete row
    onClickDeleteRow () {
      this.visible2 = false
      this.visible3 = false
      const newData = [...this.sfDataShow]
      console.log(newData)
      const target = newData.filter(item => this.todelete === item.id)[0]
      console.log(target)
      deleteStaffSheetRow(target.id).then((response) => {
        this.deleteInfo = response.info
        if(this.deleteInfo === 'ok'){
          this.sfData = [...response.data.sfData]
          this.sfDataShow = this.sfData
          this.$notification.open({
          message: '删除成功',
          description: '本条员工记录删除成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
        }
        else{
          this.$notification.open({
          message: '删除失败',
          description: '本条员工记录删除失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
      })

    },
    onClickRefresh(){
      this.reload()
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleAdd () {
      this.visible4 = true
    },
    onClickNewRow(){
      this.visible4 = false
      this.visible5 = false
       this.addmdl.password = md5(this.addmdl.password)
       addStaffSheetRow(this.addmdl).then((response) => {
        this.addInfo = response.info1
        this.accountInfo = response.info2
        if(this.addInfo === 'ok'){
          this.$notification.open({
          message: '添加成功',
          description: '本条员工记录添加成功。新员工的账号为'+this.accountInfo,
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
          this.sfData = [...response.data.asfData]
          this.sfDataShow = this.sfData
        }
        else{
          this.$notification.open({
          message: '添加失败',
          description: '本条员工记录添加失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addButton{
    position: absolute;
    z-index: 999;
    right:1em;
    top:0em;
  }
</style>