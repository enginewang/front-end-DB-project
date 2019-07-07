<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  provide(){
      return{
          reload: this.reload
      }
  },
  data () {
    return {
      locale: zhCN,
      isRouterAlive: true
    }
  },
  methods:{
    reload (){
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
    },
  },
  mounted () {

  }
}
</script>
<style>
  #app {
    height: 100%;
  }
</style>
