<template>
  <vue-friendly-iframe :src="serverOptions.src" style="height: 100%; width:100%;" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="allowfullscreen"/>
</template>

<script>
export default {
  name: 'KibanaMonitor',
  data() {
    return {
      serverOptions:{
        src: 'http://khakhazeus.cn:5601'
      }
    }
  },
}
</script>

<style>
  .vue-friendly-iframe iframe{
    height: 100%;
    width: 100%;
  }
</style>


