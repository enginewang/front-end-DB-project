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
          <a-col  style="textAlign:center; margin-bottom:24px;margin-top:-36px">
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
      <a-col  style="textAlign:left; margin-bottom:18px">
            <div class="heading" >{{"报修单进度"}}</div>
          </a-col>
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="this.details.state" progressDot>
        <a-step title="用户提交">
        </a-step>
        <a-step title="巡检员提交">
        </a-step>
        <a-step title="调度完成">
        </a-step>
      </a-steps>
    </a-card>

      <a-card :bordered='false' title=" ">
        <a-col  style="textAlign:center ; margin-bottom:0px">
            <div class="heading" >{{"调度"}}</div>
          </a-col>
        <a-form-item  label="维修员">
          <a-select
            style="max-width: 200px; width: 100%;"
            placeholder="选择维修员"
          >
            <a-select-option value="00022">张三</a-select-option>
            <a-select-option value="00011">李四</a-select-option>
          </a-select>
        </a-form-item>

        <a-row title="添加配件" grid last>
            <a-row>
            <a-col :span='6'>
              <a-form-item label="配件类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select
                  style="width: 100%;"
                  placeholder="选择配件类型"
                >
                  <a-select-option value="GPU">显卡</a-select-option>
                  <a-select-option value="CPU">CPU</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-form-item  label="配件型号" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select
                  style="width: 80%;"
                  placeholder="配件型号"
                >
                  <a-select-option value="00022">张三</a-select-option>
                  <a-select-option value="00011">李四</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-form-item label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                <a-input
                  placeholder="输入数量"
                  maxLength="15"
                  style="width: 80%"
                />
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-button type='primary'>添加</a-button>
            </a-col>
            </a-row>
        </a-row>
        <a-row title="添加器材" grid last>
            <a-row>
            <a-col :span='6'>
              <a-form-item label="器材类型" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select
                  style="width: 100%;"
                  placeholder="选择器材类型"
                >
                  <a-select-option value="GPU">显卡</a-select-option>
                  <a-select-option value="CPU">CPU</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-form-item  label="器材型号" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
                <a-select
                  style="width: 80%;"
                  placeholder="选择器材型号"
                >
                  <a-select-option value="00022">张三</a-select-option>
                  <a-select-option value="00011">李四</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-form-item label="数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                <a-input
                  placeholder="输入数量"
                  maxLength="15"
                  style="width: 80%"
                />
              </a-form-item>
            </a-col>
            <a-col :span='6'>
              <a-button type='primary'>添加</a-button>
            </a-col>
            </a-row>
        </a-row>
        <!-- table -->
        <a-table :columns="columns"   bordered>
          <template
            v-for="col in ['type','model', 'number']"
            :slot="col"
            slot-scope="text"
          >
            <div :key="col">
              {{ text }}
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

      </a-card>

    </page-view>

</template>

<script>
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
import {getRepairSheetById} from '@/api/sheets'
import ACol from "ant-design-vue/es/grid/Col";

const DetailListItem = DetailList.Item
console.log("DetailListItem",DetailListItem)

const columns = [{
  title: '类型',
  dataIndex: 'type',
  width: '25%',
  scopedSlots: { customRender: 'type' },
  sorter: (a, b) => a.type > b.type,
}, {
  title: '型号',
  dataIndex: 'model',
  width: '25%',
  scopedSlots: { customRender: 'model' },
  sorter: (a, b) => a.model > b.model,
}, {
  title: '数量',
  dataIndex: 'number',
  width: '25%',
  scopedSlots: { customRender: 'number' },
  sorter: (a, b) => a.number > b.number,
},{
  titile: '操作',
  dataIndex: 'operation',
  width: '25%',
  scopedSlots: { customRender: 'operation' }
}]

export default {
    mounted(){
      getRepairSheetById(this.details.id).then((response)=>{
        
        this.getInfo = response.info
        if(this.getInfo === 'ok'){
          console.log('grs', response.data.rpData)
          this.rpData = response.data.rpData
          this.detailInfo = this.rpData[0].details
          this.eqInfo = this.rpData[0].stuffNeeded
          this.telInfo = this.rpData[0].telNumber
        }
        else{
          this.$notification.open({
          message: '获取失败',
          description: '获取本报修单详情页失败',
          icon: <a-icon type="warning" style="color: #108ee9" />,
        });
        }

      })
        console.log("details",this.details)
    },
    name: 'repairSheetDetail',
    props:{
        details:{
            type: Object,
        }
    },
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
      getInfo:'',
      detailInfo:'',
      eqInfo:'',
      telInfo:'',
      visible2:true,
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
  methods:{
    handleOK(){
      //
    },
    onClickDelete(){
      //
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