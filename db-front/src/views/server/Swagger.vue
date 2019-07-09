<template>
  <div style="text-align: center; height:100%; width: 100%">
    <a-spin :spinning="spinning" size="large" style="height:100%; width:100%;">
      <div class="spin-content" style="height:100%; width:100%;">
        <vue-friendly-iframe :src="serverOptions.src" style="height: 100%; width:100%;" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen="allowfullscreen"/>
      </div>
    </a-spin>
  </div>
</template>

<script>

export default {
  name: 'Swagger',
  data() {
    return {
      serverOptions:{
        src: 'https://tjsseibm.club/swagger'
      },
      spinning: true
    }
  },
  mounted(){
    console.log(document.getElementsByClassName("vue-friendly-iframe")[0].children[0].tagName)
    document.getElementsByClassName("vue-friendly-iframe")[0].children[0].onload = () =>{
      console.log("loaded")
      this.spinning = false
    }
  }
}
</script>

<style>
  .vue-friendly-iframe iframe{
    height: 100%;
    width: 100%;
  }
  .ant-spin-container{
    height: 100%;
    width: 100%;
  }
  .ant-spin{
    text-align: center;
    align-content: center;
  }
  .ant-spin-dot{
    text-align: center;
    align-content: center;
  }
</style>


