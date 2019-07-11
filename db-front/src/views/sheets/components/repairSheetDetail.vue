<template>
    <page-view title="报修单" logo="/repairSheet.png">

    <detail-list slot="headerContent" size="small" :col="1" class="detail-layout">
      <detail-list-item term="详细描述">{{this.details.details}}</detail-list-item>
      <detail-list-item term="所需配件">{{this.details.stuffNeeded}}</detail-list-item>
      <detail-list-item term="报修用户电话">{{this.details.telNumber}}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list" >
      <a-col :xs="12" :sm="12">
        <div class="text">报修单单号</div>
        <div class="heading" span = "4">{{this.details.title}}</div>
      </a-col>
    </a-row>
    

    <a-card :bordered='false' :gutter="24">
        <div class="photo" > 
          <a-row >
          <a-col  style="textAlign:center; margin-bottom:0px;margin-top:0px">
            <div class="heading" >
              <a-avatar  size="large" shape="square" src="/camera.png"/>
              {{"故障器材图片"}}
              </div>
          </a-col>
          </a-row>
          <a-col style="textAlign:center">
        <img :src="details.cover" :alt="details.title" />
          </a-col>
        </div>
      </a-card>

    <a-card :bordered="false" title=" ">
      <a-col  style="textAlign:center; margin-bottom:18px">
            <div class="heading" >{{"报修单进度"}}</div>
          </a-col>
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="this.details.state-'0'" progressDot>
        <a-step title="用户提交">
        </a-step>
        <a-step title="巡检员提交">
        </a-step>
        <a-step title="调度完成">
        </a-step>
      </a-steps>
    </a-card>

      <a-card :bordered='false' title=" " :visible="false" >
        <a-col  style="textAlign:center ; margin-bottom:0px">
            <div class="heading" >{{"调度"}}</div>
          </a-col>
        <a-row  grid last>

          <a-row>
            <a-col :span='9'>
              <a-form-item  :validate-status="successRepair" style="textAlign:left" label="维修员" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }" 
               >
                <a-select :disabled="qualified"
                  style="max-width: 200px; width: 120%;"
                  placeholder="选择维修员"
                  @change="handleStaffChange"
                >
                  <a-select-option v-for="id in this.stfList" :key="id.staffId" >
                    {{id.staffName}}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
            <a-row>
            <a-col :span='8'>
              <a-form-item label="器材选择" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select :disabled="qualified"
                  style="width: 120%;"
                  placeholder="选择器材类型"
                  @change="handleEqChange"
                >
                  <a-select-option v-for="eq in this.eqType" :key="eq.no">
                    {{eq.type+' '+eq.model}}
                    </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
     
            <a-col :span='9'>
             
              <a-form-item :validate-status="compare" label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                <a-input :disabled="qualified"
                  :placeholder="text"
                  
                  v-model="eqNum"
                  style="width: 100%"
                />
              </a-form-item>
            </a-col>
            <a-col :span='6' style="">
              <a-button  :disabled="qualifiedforButton" type='primary' @click="handleAddEq">添加</a-button>
            </a-col>
      
            </a-row>
        </a-row>
        <a-row grid last>
            <a-row>
            <a-col :span='8'>
              <a-form-item label="配件选择" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select :disabled="qualified"
                  style="width: 120%;"
                  placeholder="选择配件类型"
                  @change="handleAcChange"
                >
                  <a-select-option v-for="ac in this.acType" :key="ac.no">
                    {{ac.type+' '+ac.model}}
                  </a-select-option>
                
                </a-select>
              </a-form-item>
            </a-col>
      
            <a-col :span='9'>
              <a-form-item :validate-status="compareAc" label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                <a-input  :disabled="qualified"
                  :placeholder="textAc"
                  maxLength="15"
                  style="width: 100%"
                  v-model="acNum"
                />
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-button  :disabled="qualifiedforButtonAc" type='primary' @click="handleAddAc">添加</a-button>
            </a-col>
            </a-row>
        </a-row>
        <div :span='9' style ="margin-bottom:24px">
        <a-button  :disabled="qualifiedforSubmit" type='primary' @click="onClickSubmit">提交</a-button>
        <a-modal
                title="确认提交"
                v-model ="visible"
                @ok = "handleOK"
                >
                <div class = "modal">
                    是否完成本次调度
                </div></a-modal>
        </div>
        
        <!-- table -->
        <a-table :columns="columns"   :dataSource="this.result.ls"  bordered>
          <template
            v-for="col in ['statue','type','model', 'number']"
            :slot="col"
            slot-scope="text"
          >
            <div :key="col">
              {{ text }}
            </div>
          </template>
         
          
        </a-table>
        <!-- table end -->
       
      </a-card>
      
    
    </page-view>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import {getRepairSheetDetail, submitScheduleDetail} from '@/api/sheets'
import ACol from "ant-design-vue/es/grid/Col";


const DetailListItem = DetailList.Item
console.log("DetailListItem",DetailListItem)

const columns = [{
  title: '器材/配件',
  dataIndex: 'statue',
  width: '25%',
  filters:[
    {
      text:'器材',
      value:'器材'
    },{
      text:'配件',
      value:'配件',
    }],
  onFilter:(value,record) => record.statue.indexOf(value) === 0,
  scopedSlots: { customRender: 'statue' },
}, {
  title: '类型',
  dataIndex: 'type',
  width: '25%',
  scopedSlots: { customRender: 'type' },
},{
  title: '型号',
  dataIndex: 'model',
  width: '25%',
  scopedSlots: { customRender: 'model' },
}, {
  title: '数量',
  dataIndex: 'number',
  width: '25%',
  scopedSlots: { customRender: 'number' },
  sorter: (a, b) => a.number > b.number,
}]

export default {
    inject: ['reload'],
    created(){
      
      this.details = this.$route.params.details
      this.result.RSTid = this.details.title
      console.log("item",this.details)
      getRepairSheetDetail().then((response)=>{
        
        console.log("response",...response.equipType)
        this.eqType = response.equipType
        this.acType = response.accessory
        this.stfList = response.staff
        console.log("eqType",this.eqType[0])
        console.log("acType",this.acType)
        console.log("acType",this.stfList)
      })
        
    },
    name: 'repairSheetDetail',
    components: {
      ACol,
    PageView,
    
    DetailList,
    DetailListItem
  },
    mixins: [mixinDevice],
  data () {
    return {
      activeTabKey: '1',
      rpData:[],
      columns,
      eqType:[],
      acType:[],
      stfList:[],
      visible2:true,
      result:{
        'RSTid':'',
        'stfId':'',
        'ls':[]
      },
      eqInfo:'',
      tempRow:{
        'type':'',
        'model':'',
        'number':'',
        'statue':'',
        'key':1
      },
      tempKey:1,
      details: this.$route.params.details,
      eqNum:'',
      tempEq:'',
      tempAc:'',
      acNum:'',
      columns,
      visible:false,
      info:''
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
    }
  },
  computed:{
    qualified:function(){
      if(this.details.state == '0'||this.details.state=='2'){
        return "disabled"
      }
    },
    successRepair:function(){
      if(this.result.stfId === ''){
        return "error"
      }
      else{
        return "success"
      }
    },
    maxEqNum:function(){
      if(this.tempEq === ''){
        return 
      }
      var tempEqSelect = parseInt(this.tempEq)-1
      var tempEqNum = parseInt(this.eqType[tempEqSelect].number)
      console.log("maxNum",tempEqNum)
      return tempEqNum
      //let temp = this.eqType[this.tempEq-'0'].number-'0'
      
    },
    maxAcNum:function(){
      if(this.tempAc === ''){
        return 
      }
      var tempAcSelect = parseInt(this.tempAc)-1
      var tempAcNum = parseInt(this.acType[tempAcSelect].number)
      console.log("maxNum",tempAcNum)
      return tempAcNum
      //let temp = this.eqType[this.tempEq-'0'].number-'0'
      
    },
    compare:function(){
      if(this.tempEq === ''){
        return "success"
      }
      if(!(/(^[1-9]\d*$)/.test(this.eqNum))){
        return "error"
      }
      var tempEqSelect = parseInt(this.tempEq)-1
      var tempEqNum = parseInt(this.eqType[tempEqSelect].number)
      console.log("maxNum",tempEqNum)
      if(this.eqNum!==''){
        var inputTemp = parseInt(this.eqNum)
        console.log("input",inputTemp)
        if(inputTemp > tempEqNum){
          return "error"
        }
        else{
          return "success"
        }
      }
      return "error"
      //let temp = this.eqType[this.tempEq-'0'].number-'0'
      
    },
    compareAc:function(){
      if(this.tempAc === ''){
        return "success"
      }
      if (!(/(^[1-9]\d*$)/.test(this.acNum))){
        return "error"
      }
      var tempAcSelect = parseInt(this.tempAc)-1
      var tempAcNum = parseInt(this.acType[tempAcSelect].number)
      console.log("maxNum2",tempAcNum)
      if(this.acNum!==''){
        var inputTemp = parseInt(this.acNum)
        console.log("input2",inputTemp)
        if(inputTemp > tempAcNum){
          return "error"
        }
        else{
          return "success"
        }
      }
      return "error"
      //let temp = this.eqType[this.tempEq-'0'].number-'0'
      
    },
    text:function(){
      if(this.tempEq !== ''){
        return "最大数量:"+this.maxEqNum
      }
      else{
        return "请输入数量"
      }
    },
    textAc:function(){
      if(this.tempAc !== ''){
        return "最大数量:"+this.maxAcNum
      }
      else{
        return "请输入数量"
      }
    },
    qualifiedforButton:function(){
    if(this.details.state == '0'||this.details.state=='2'){
        return "disabled"
      }
    if(this.tempEq === ''||this.eqNum === ''||this.result.stfId === ''){
      return "disabled"
    }
  },
  qualifiedforButtonAc:function(){
    if(this.details.state == '0'||this.details.state=='2'){
        return "disabled"
      }
    if(this.tempAc === ''||this.acNum === ''||this.result.stfId === ''){
      return "disabled"
    }
  },
  qualifiedforSubmit:function(){
    console.log("length",this.result.ls.length)
    if(this.result.ls.length === 0){
        return "disabled"
      }
  },
  },
  
  methods:{
    handleOK(){
      this.visible = false
      submitScheduleDetail(this.result).then((response) =>{
        this.info = response.info
        if(this.info === 'ok'){
          this.details.state = '2'
          this.$notification.open({
          message: '调度成功',
          description: '本条报修单调度成功',
          icon: <a-icon type="check" style="color: #108ee9" />,
        });
        }
      })
    },
    onClickSubmit(){
      this.visible = true
    },
    handleStaffChange(value){
      this.result.stfId = value
      console.log("newId",this.result.stfId)
    },
    handleEqChange(value){
      this.tempEq = value
      console.log("newEq",this.tempEq)
    },
    handleAcChange(value){
      this.tempAc = value
      console.log("newAc",this.tempAc)
    },
    handleAddEq(){
      if(!(/(^[1-9]\d*$)/.test(this.eqNum))){
        this.$notification.open({
          message: '添加失败',
          description: '请输入合法的数字字符',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      var tempEqSelect = parseInt(this.tempEq)-1
      var tempEqNum = parseInt(this.eqType[tempEqSelect].number)
      console.log("容量",tempEqNum)
      var inputTemp = parseInt(this.eqNum)
      console.log("需求",inputTemp)
      if(inputTemp > tempEqNum){
        this.$notification.open({
          message: '添加失败',
          description: '仓储不足，请先补充仓储器材',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      else{
          console.log("rowls",this.result.ls)
          this.tempKey = this.tempKey + 1
          console.log("tempKey",this.tempKey)
          this.result.ls.push({
            'type': this.eqType[tempEqSelect].type,
            'model': this.eqType[tempEqSelect].model,
            'number': inputTemp,
            'statue':'器材',
            'key' : this.tempKey+1
          })
          this.eqNum = ''
          this.eqType[tempEqSelect].number = String(parseInt(this.eqType[tempEqSelect].number)-parseInt(inputTemp))
          console.log("eqNumber",this.eqType.number )
      }
    },
    handleAddAc(){
      if(!(/(^[1-9]\d*$)/.test(this.acNum))){
        this.$notification.open({
          message: '添加失败',
          description: '请输入合法的数字字符',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      var tempAcSelect = parseInt(this.tempAc)-1
      var tempAcNum = parseInt(this.acType[tempAcSelect].number)
      console.log("容量2",tempAcNum)
      var inputTemp = parseInt(this.acNum)
      console.log("需求2",inputTemp)
      if(inputTemp > tempAcNum){
        this.$notification.open({
          message: '添加失败',
          description: '仓储不足，请先补充仓储配件',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />,
        });
        return;
      }
      else{
        console.log("rowls",this.result.ls)
           this.tempRow.key = this.tempKey+1
          this.tempKey = this.tempKey + 1
          console.log("tempKey",this.tempKey)
          this.result.ls.push({
            'type': this.acType[tempAcSelect].type,
            'model': this.eqType[tempAcSelect].model,
            'number':inputTemp,
            'statue':'配件',
            'key' : this.tempKey+1
          })
          this.acNum = ''
          this.acType[tempAcSelect].number = String(parseInt(this.acType[tempAcSelect].number)-parseInt(inputTemp))
      }
    }
}
}

</script>

<style lang="less" scoped>

  .detail-layout {
    margin-left: 44px;
  }
  .text {
    color: rgba(0, 0, 0, .45);
  }

  .heading {
    color: rgba(0, 0, 0, .85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, .25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .photo {
      align: center;
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {

    }
    .status-list {
      text-align: left;
    }
  }
</style>