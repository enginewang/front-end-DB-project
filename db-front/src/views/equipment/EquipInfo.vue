<template>
  <page-view :title="IDTitle" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <div class="return-button">
      <router-link :to="{name: 'EquipUsing'}">
        <a-button type="primary">
          <a-icon type="left"/>返回
        </a-button>
      </router-link>
    </div>


    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card style="margin-top: 0px" :bordered="true">
          <div class="page-header-index-wide page-header-wrapper-grid-content-main">
            <div class="account-center-avatarHolder">
              <div class="avatar">
                <img :src="equipIMG">
              </div>
              <div class="username">{{equipName}}</div>
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
  </page-view>
</template>

<script>
  import {mixinDevice} from '@/utils/mixin'
  import {PageView} from '@/layouts'
  import DetailList from '@/components/tools/DetailList'
  import ACol from "ant-design-vue/es/grid/Col"
  import {postEquipmentDetail} from "@/api/equipment";

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
        equipName: '',
        factory_time: '',
        install_time: '',
        using_time: '',
        unit: '',
        address: '',
        if_damage: '',
        order: '',
        infoData: [],
        IDTitle: '器材编号：' + this.$route.params.id,

        equipmentID: this.$route.params.id,
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
      postEquipmentDetail(this.equipmentID).then((response) => {
        console.log(response)
        console.log(this.equipmentID)
        this.DetailData = response.data;
        this.equipName = this.DetailData.name;
        this.factory_time = this.DetailData.factory_time;
        this.install_time = this.DetailData.install_time;
        this.using_time = this.DetailData.using_time;
        this.unit = this.DetailData.unit;
        this.address = this.DetailData.address;
        this.if_damage = this.DetailData.if_damage;
        this.order = this.DetailData.order;
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

  .return-button{
    position: absolute;
    z-index: 999;
    right:1em;
    top:8.5em;
  }

</style>
