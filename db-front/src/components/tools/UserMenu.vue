<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a href="https://github.com/enginewang/front-end-DB-project" target="_blank">
        <span class="action">
          <a-icon type="github"></a-icon>
        </span>
      </a>
      <a @click="showHealthTips" target="_blank">
        <span class="action">
          <a-icon type="coffee" />
        </span>
      </a>
      <notice-icon class="action"/>
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <span>{{ nickname() }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item key="0">
            <router-link :to="{ name: 'homepage' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item>
          <a-menu-divider/>
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
  import NoticeIcon from '@/components/NoticeIcon'
  import { mapActions, mapGetters } from 'vuex'
  export default {
    name: 'UserMenu',
    data() {
      return {
        healthMessageArr: [
          '喝点可乐泡枸杞吧！',
          '泡个脚有益身心健康',
          '一贯知足，二目远眺，三餐有节，四季不懒',
          '发常梳，目常运，齿常叩，漱玉津',
          '苹果入心梨入肺，大枣入脾栗入肾',
        ],
      }
    },
    components: {
      NoticeIcon
    },
    methods: {
      ...mapActions(['Logout']),
      ...mapGetters(['nickname', 'avatar']),
      showHealthTips() {
        this.$notification.config({
          placement: 'bottomRight',
        });
        var index = Math.floor(Math.random() * this.healthMessageArr.length)
        this.$notification.open({
          message: '健康小贴士',
          description: this.healthMessageArr[index],
          icon: <a-icon type="smile" style="color: #108ee9" />,
      });
      },
      handleLogout () {
        const that = this

        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk () {
            return that.Logout({}).then(() => {
              window.location.reload()
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel () {
          }
        })
      }
    }
  }
</script>
