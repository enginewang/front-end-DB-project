<template>
  <page-view :title="IDTitle" logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png">
    <div class="return-button">
      <router-link :to="{name: 'EquipUsing'}">
        <a-button type="primary" >
          <a-icon type="left"/>返回
        </a-button>
      </router-link>
    </div>


    <a-row :gutter="24">
      <a-col :md="24" :lg="7">
        <a-card style="margin-top: 0px; font-size: medium" :bordered="true">
          <div class="page-header-index-wide page-header-wrapper-grid-content-main">
            <div class="account-center-avatarHolder">
              <div class="avatar">
                <img :src="icon">
              </div>
              <div class="username">{{name}}</div>
              <div class="bio">每天锻炼，身体棒棒</div>
            </div>
            <a-divider/>
            <div class="account-center-detail">
              <p>
                <i class="title"></i>健身器械
              </p>
              <p>
                <i class="group"></i>{{ equipMessage }}
              </p>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :md="24" :lg="17">
        <a-card style="margin-top: 0px; font-size: medium" :bordered="true" title="器材信息">
          <detail-list>
            <detail-list-item term="出厂时间">{{factory_time}}</detail-list-item>
            <detail-list-item term="安装时间">{{install_time}}</detail-list-item>
            <detail-list-item term="使用时长">{{using_time}}天</detail-list-item>
            <detail-list-item term="使用单位">{{unit}}</detail-list-item>
            <detail-list-item term="联系地址">{{address}}</detail-list-item>
          </detail-list>
          <a-divider/>
          <detail-list title="详情栏" align="left">
            <detail-list-item term="损坏情况">
              <span :style="cStyle">
                {{if_damage}}
              </span>
            </detail-list-item>
            <detail-list-item term=""><a-icon type="qrcode"/>（扫描右侧二维码查看详情）</detail-list-item>
          </detail-list>

          <a-row type="flex" justify="end">
            <a-col>
              <img :src="QRcode"
                   alt="请扫描二维码" width="200" height="200">
            </a-col>
          </a-row>
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

  function getDays(startDateStr,endDateStr){
    var startDateArr,endDateArr,days;
    startDateArr = startDateStr.split('.');
    endDateArr = endDateStr.split('.');
    var newDateS = new Date(Date.UTC(startDateArr[0],startDateArr[1]-1,startDateArr[2]));
    var newDateE = new Date(Date.UTC(endDateArr[0],endDateArr[1]-1,endDateArr[2]));
    days = parseInt(Math.abs(newDateE - newDateS ) / 1000 / 60 / 60 /24);
    return days;
  }

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
        cStyle: {},
        name: '',
        factory_time: '',
        install_time: '',
        using_time: '',
        unit: '',
        address: '',
        if_damage: '',
        QRcode: '',
        icon: '',
        equipMessage: '',
        infoData: [],
        IDTitle: '器材编号：' + this.$route.params.id,

        equipmentID: this.$route.params.id,
      }
    },
    watch: {
      if_damage (is){
        if(is === "损坏"){
          this.cStyle= {color:'red'}
        } else {
          this.cStyle= {color:'black'}
        }
      }
    },
    mounted() {
      postEquipmentDetail({id: this.equipmentID}).then((response) => {
        console.log(response);
        console.log(this.equipmentID);
        this.DetailData = response.data;
        this.name = this.DetailData.name;
        this.factory_time = this.DetailData.factory_time;
        this.install_time = this.DetailData.install_time;
        this.using_time = this.DetailData.using_time;
        this.unit = this.DetailData.unit;
        this.address = this.DetailData.address;
        if (this.DetailData.if_damage === "1") {
          this.if_damage = '损坏'
        } else {
          this.if_damage = '正常'
        };
        if (this.DetailData.name === '太空漫步机') {
          this.equipMessage = '太空漫步机可以锻炼下肢肌肉力量灵活性，促进心脑血管系统及心肺呼吸系统的健康，而且还增加了热量消耗。'
        } else if (this.DetailData.name === '跑步机') {
          this.equipMessage='跑步机是家庭及健身房常备的健身器材，而且是当今家庭健身器材中最简单的一种，是家庭健身器的最佳选择。'
        }else {
          this.equipMessage='增强人体的心肺功能，活动全身主要关节，发展上下肢和腰背部力量，还能通过运动按摩内脏增强消化系统功能。'
        };
        this.icon = this.DetailData.icon;
        this.QRcode = this.DetailData.QRcode;
        var date = new Date();
        var nowMonth = date.getMonth() + 1;
        var strDate = date.getDate();
        var seperator = ".";
        var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        this.using_time = getDays(this.install_time, nowDate)
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
