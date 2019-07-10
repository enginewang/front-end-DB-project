
<template>
    <page-view :title="details.title" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">

    <detail-list slot="headerContent" size="small" :col="1" class="detail-layout">
      <detail-list-item term="详细描述">坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了坏了</detail-list-item>
      <detail-list-item term="所需配件">齿轮 25mm 3个</detail-list-item>
      <detail-list-item term="报修用户电话">180 1234 5678</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="status-list">
      <a-col :xs="12" :sm="12">
        <div class="text">状态</div>
        <div class="heading">待审批</div>
      </a-col>
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group style="margin-right: 4px;">
        <a-button>操作</a-button>
        <a-button>操作</a-button>
        <a-button><a-icon type="ellipsis"/></a-button>
      </a-button-group>
      <a-button type="primary" >主操作</a-button>
    </template>

    <a-card :bordered='false' title="故障照片">
        <div :class="photo">
        <img :src="details.cover" :alt="details.title" />
        </div>
    </a-card>

    <a-card :bordered="false" title="维修进度">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step title="用户提交">
        </a-step>
        <a-step title="巡检员提交">
        </a-step>
        <a-step title="调度完成">
        </a-step>
      </a-steps>
    </a-card>

    <a-card :bordered='false' title="调度">
        <a-form-item  label="维修员">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  placeholder="选择维修员"
                  >
                  <a-select-option value="00022">张三</a-select-option>
                  <a-select-option value="00011">李四</a-select-option>
                </a-select>
        </a-form-item>

        <standard-form-row title="添加配件" grid last>
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
        </standard-form-row>
        <standard-form-row title="添加器材" grid last>
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
        </standard-form-row>
        <!-- table -->
    <a-table :columns="columns" :dataSource="wDataShow"  bordered>
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

const DetailListItem = DetailList.Item

const columns = [{
  title: '配件类型',
  dataIndex: 'type',
  width: '25%',
  scopedSlots: { customRender: 'type' },
  sorter: (a, b) => a.type > b.type,
}, {
  title: '配件型号',
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
        console.log(this.details)
    },
    name: 'repairSheetDetail',
    props:{
        details:{
            type: Object,
        }
    },
    components: {
    PageView,
    DetailList,
    DetailListItem
  },
    mixins: [mixinDevice],
  data () {
    return {
      activeTabKey: '1',
      operation1: [
        {
          key: 'op1',
          type: '订购关系生效',
          name: '曲丽丽',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        },
        {
          key: 'op5',
          type: '创建订单',
          name: '汗牙牙',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      operation2: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        },
        {
          key: 'op4',
          type: '提交订单',
          name: '林东东',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '很棒'
        }
      ],
      operation3: [
        {
          key: 'op2',
          type: '财务复审',
          name: '付小小',
          status: 'reject',
          updatedAt: '2017-10-03  19:23:12',
          remark: '不通过原因'
        },
        {
          key: 'op3',
          type: '部门初审',
          name: '周毛毛',
          status: 'agree',
          updatedAt: '2017-10-03  19:23:12',
          remark: '-'
        }
      ],
      columns
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