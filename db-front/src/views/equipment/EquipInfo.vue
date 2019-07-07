<template>
  <page-view title="器材编号：SSE-20508" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card style="margin-top: 0px" :bordered="true">
          <div class="page-header-index-wide page-header-wrapper-grid-content-main">
            <div class="account-center-avatarHolder">
              <div class="avatar">
                <img :src="equipIMG">
              </div>
              <div class="username">拉力器</div>
              <div class="bio">每天锻炼，身体棒棒</div>
            </div>
            <a-divider/>
            <div class="account-center-detail">
              <p>
                <i class="title"></i>社区健身器械
              </p>
              <p>
                <i class="group"></i>增强人体的心肺功能，活动全身主要关节，发展上下肢和腰背部力量，还能通过运动按摩内脏增强消化系统功能。
              </p>
              <p>
                <i class="address"></i>
                <span>上海市-</span>
                <span>嘉定区</span>
              </p>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :md="24" :lg="17">
        <a-card style="margin-top: 0px" :bordered="true" title="器材信息">
          <detail-list>
            <detail-list-item term="出厂时间">{{factory_time}}</detail-list-item>
            <detail-list-item term="安装时间">{{install_time}}</detail-list-item>
            <detail-list-item term="使用时长">{{using_time}}</detail-list-item>
            <detail-list-item term="使用单位">{{unit}}</detail-list-item>
            <detail-list-item term="联系地址">{{address}}</detail-list-item>
          </detail-list>
          <a-divider/>
          <detail-list title="详情栏" align="left">
            <detail-list-item term="损坏情况">{{if_damage}}</detail-list-item>
            <detail-list-item term="报修单">{{order}}</detail-list-item>
            <detail-list-item></detail-list-item>
            <detail-list-item term="">(扫描右侧二维码查看详情)</detail-list-item>
          </detail-list>

            <a-row type="flex" justify="end">
              <a-col>
                <img :src="QRcode"
                  alt="请扫描二维码" width="200" height="200">
              </a-col>
            </a-row>

          <!--
           <a-card type="inner" title="多层信息组">
            <detail-list title="组名称" size="small">
              <detail-list-item term="负责人">林东东</detail-list-item>
              <detail-list-item term="角色码">1234567</detail-list-item>
              <detail-list-item term="所属部门">XX公司-YY部</detail-list-item>
              <detail-list-item term="过期时间">2018-08-08</detail-list-item>
              <detail-list-item term="描述">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</detail-list-item>
            </detail-list>
            <a-divider style="margin: 16px 0" />
            <detail-list title="组名称" size="small" :col="1">
              <detail-list-item term="学名">	Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</detail-list-item>
            </detail-list>
            <a-divider style="margin: 16px 0" />
            <detail-list title="组名称" size="small" :col="2">
              <detail-list-item term="负责人">付小小</detail-list-item>
              <detail-list-item term="角色码">1234567</detail-list-item>
            </detail-list>
          </a-card>
          -->

        </a-card>
      </a-col>
    </a-row>


    <a-card style="margin-top: 24px" :bordered="false" title="器材近半年来使用记录">
      <div class="no-data">
        <a-icon type="frown-o"/>
        暂无数据
      </div>
    </a-card>

    <!-- 操作 -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <a-table
        v-if="activeTabKey === '1'"
        :columns="operationColumns"
        :dataSource="operation1"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="activeTabKey === '2'"
        :columns="operationColumns"
        :dataSource="operation2"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
      <a-table
        v-if="activeTabKey === '3'"
        :columns="operationColumns"
        :dataSource="operation3"
        :pagination="false"
      >
        <template
          slot="status"
          slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
        </template>
      </a-table>
    </a-card>

  </page-view>
</template>

<script>
  import {mixinDevice} from '@/utils/mixin'
  import {PageView} from '@/layouts'
  import DetailList from '@/components/tools/DetailList'
  import ACol from "ant-design-vue/es/grid/Col"
  import {getEquipmentInfo} from "@/api/equipment";

  const DetailListItem = DetailList.Item

  export default {
    name: 'EquipInfo',
    components: {
      ACol,
      PageView,
      DetailList,
      DetailListItem
    },
    mixins: [mixinDevice],
    data() {
      return {
        equipIMG:require("@/assets/equip.jpg"),
        QRcode:require("@/assets/QRcode.png"),

        factory_time: '',
        install_time: '',
        using_time: '',
        unit: '',
        address: '',
        if_damage: '',
        order: '',
        infoData: [],

        tabList: [
          {
            key: '1',
            tab: '操作日志①'
          },
          {
            key: '2',
            tab: '操作日志②'
          },
          {
            key: '3',
            tab: '操作日志③'
          }
        ],
        activeTabKey: '1',

        operationColumns: [
          {
            title: '操作类型',
            dataIndex: 'type',
            key: 'type'
          },
          {
            title: '操作人',
            dataIndex: 'name',
            key: 'name'
          },
          {
            title: '执行结果',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: {customRender: 'status'}
          },
          {
            title: '操作时间',
            dataIndex: 'updatedAt',
            key: 'updatedAt'
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark'
          }
        ],
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
        ]
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          'agree': '成功',
          'reject': '驳回'
        }
        return statusMap[status]
      },
      statusTypeFilter(type) {
        const statusTypeMap = {
          'agree': 'success',
          'reject': 'error'
        }
        return statusTypeMap[type]
      }
    },
    mounted() {
      getEquipmentInfo().then((response) => {
        this.infoData = [...response];
        this.factory_time = this.infoData[0].factory_time;
        this.install_time = this.infoData[0].install_time;
        this.using_time = this.infoData[0].using_time;
        this.unit = this.infoData[0].unit;
        this.address = this.infoData[0].address;
        this.if_damage = this.infoData[0].if_damage;
        this.order = this.infoData[0].order;

      })
    },
  }
</script>

<style lang="less" scoped>

  .page-header-wrapper-grid-content-main {
    width: 100%;
    height: 100%;
    min-height: 100%;
    transition: 0.3s;

    .account-center-avatarHolder {
      text-align: center;
      margin-bottom: 24px;

      .avatar {
        margin: 0 auto;
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .username {
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        margin-bottom: 4px;
      }
    }

    .account-center-detail {
      p {
        margin-bottom: 8px;
        padding-left: 26px;
        position: relative;
      }

      i {
        position: absolute;
        height: 14px;
        width: 14px;
        left: 0;
        top: 4px;
        background: url(https://gw.alipayobjects.com/zos/rmsportal/pBjWzVAHnOOtAUvZmZfy.svg);
      }

      .title {
        background-position: 0 0;
      }

      .group {
        background-position: 0 -22px;
      }

      .address {
        background-position: 0 -44px;
      }
    }

    .account-center-tags {
      .ant-tag {
        margin-bottom: 8px;
      }
    }

    .account-center-team {
      .members {
        a {
          display: block;
          margin: 12px 0;
          line-height: 24px;
          height: 24px;

          .member {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 24px;
            max-width: 100px;
            vertical-align: top;
            margin-left: 12px;
            transition: all 0.3s;
            display: inline-block;
          }

          &:hover {
            span {
              color: #1890ff;
            }
          }
        }
      }
    }

    .tagsTitle,
    .teamTitle {
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 12px;
    }
  }

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
