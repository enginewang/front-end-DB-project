<template>
  <div>
    <div>
      筛选:
      <a-button type="danger" @click="onClickClearSelect">清空</a-button>
    </div>
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        鼠标放置以弹出属性菜单
        <a-icon type="down"/>
      </a>
      <a-menu slot="overlay" @click="onClickSelect">
        <a-menu-item key="id">id</a-menu-item>
        <a-menu-item key="name">名称</a-menu-item>
        <a-menu-item key="address">地址</a-menu-item>
        <a-menu-item key="area">面积</a-menu-item>
      </a-menu>
    </a-dropdown>

    <div v-show="show.id">
      <a-input placeholder="ID" v-model="warehouseData.id"/>
    </div>
    <div v-show="show.name">
      <a-input placeholder="名称" v-model="warehouseData.name"/>
    </div>
    <div v-show="show.address">
      <a-input placeholder="地址" v-model="warehouseData.address"/>
    </div>
    <div v-show="show.area">
      <a-input placeholder="面积" v-model="warehouseData.area"/>
    </div>

    <div v-show="submit">
      <a-button type="primary">提交</a-button>
    </div>
  </div>
</template>

<script>
import { Dropdown, Input, Button } from 'ant-design-vue'
export default {
  name: 'Search',
  data () {
    return {
      show: {
        id: false,
        name: false,
        address: false,
        area: false
      },
      warehouseData: {
        id: '',
        name: '',
        address: '',
        area: ''
      }
    }
  },
  component: {
    Dropdown,
    Input,
    Button
  },
  computed: {
    submit () {
      if (this.warehouseData.id !== '' || this.warehouseData.name !== '' || this.warehouseData.address !== '' || this.warehouseData.area !== '') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    onClickSelect ({ key }) {
      this.show[key] = !this.show[key]
    },

    onClickClearSelect () {
      this.show.id = false
      this.show.name = false
      this.show.address = false
      this.show.area = false
      this.warehouseData.id = ''
      this.warehouseData.name = ''
      this.warehouseData.address = ''
      this.warehouseData.area = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
</style>
