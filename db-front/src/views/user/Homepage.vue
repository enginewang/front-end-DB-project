<template>
  <page-view :avatar="avatar"
             :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.name }}！</div>
      <div>{{userInfo.role.name}} | Eport - 健身器材管理平台</div>
    </div>
    <!--顶层右侧栏
        <div slot="extra">
      <a-row style="text-align: left">
        <a-col>
          <h3>健康小贴士：</h3>
        </a-col>
      </a-row>
      <a-row style="text-align: left">
        <a-col>
          <span class="welcome-text">{{ welcome() }}</span>
        </a-col>
      </a-row>
    </div>

    -->
    <div>
      <a-row :gutter="24">
        <a-col :xl="16"
               :lg="24"
               :md="24"
               :sm="24"
               :xs="24">
          <!--调度管理-->
          <a-card style="margin-bottom: 24px; margin-top: 0px"
                  :bordered="false"
                  title="调度管理"
                  :body-style="{ padding: 0 }">
            <!--调度卡片-->
            <a-card>
              <a-row :gutter="24">
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="仓库预览"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562590986/warehouse.png"
                         slot="cover" />
                    <router-link :to="{name: 'Preview'}"
                                 active-class="active">
                      <a-card-meta title="仓库预览"
                                   description="点击预览仓库信息">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="配件管理"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562677458/pj.png"
                         slot="cover" />
                    <router-link :to="{name: 'AccessoryInWarehouse'}"
                                 active-class="active">
                      <a-card-meta title="配件管理"
                                   description="点击管理器材配件">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="仓储器材"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593108/equipment.png"
                         slot="cover" />
                    <router-link :to="{name: 'EquipPreview'}"
                                 active-class="active">
                      <a-card-meta title="仓储器材"
                                   description="点击预览仓储器材">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="在用器材"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593722/equipmentUsing.png"
                         slot="cover" />
                    <router-link :to="{name: 'EquipUsing'}"
                                 active-class="active">
                      <a-card-meta title="在用器材"
                                   description="点击查询在用器材">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
              </a-row>
              <br />
              <a-row :gutter="24">
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="仓库地图"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593159/map.png"
                         slot="cover" />
                    <router-link :to="{name: 'Map'}"
                                 active-class="active">
                      <a-card-meta title="仓库地图"
                                   description="点击查看仓库地图">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="工单预览"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593143/gongdan.png"
                         slot="cover" />
                    <router-link :to="{name: 'workSheet'}"
                                 active-class="active">
                      <a-card-meta title="工单预览"
                                   description="点击预览工单信息">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="报修单预览"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593110/baoxiudan.png"
                         slot="cover" />
                    <router-link :to="{name: 'repairSheet'}"
                                 active-class="active">
                      <a-card-meta title="报修单预览"
                                   description="点击预览报修单信息">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
                <a-col :md="24"
                       :lg="6">
                  <a-card hoverable>
                    <img alt="巡检单预览"
                         src="https://res.cloudinary.com/dbmkzs2ez/image/upload/v1562593181/xunjiandan.png"
                         slot="cover" />
                    <router-link :to="{name: 'checkSheet'}"
                                 active-class="active">
                      <a-card-meta title="巡检单预览"
                                   description="点击预览巡检单信息">
                      </a-card-meta>
                    </router-link>
                  </a-card>
                </a-col>
              </a-row>
            </a-card>
          </a-card>

          <!--动态
                    <a-card :loading="loading" title="动态" :bordered="false">
            <a-list>
              <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                  <a-avatar slot="avatar" :src="item.user.avatar"/>
                  <div slot="title">
                    <span>{{ item.user.nickname }}</span>&nbsp;
                    在&nbsp;<a href="#">{{ item.project.name }}</a>&nbsp;
                    <span>{{ item.project.action }}</span>&nbsp;
                    <a href="#">{{ item.project.event }}</a>
                  </div>
                  <div slot="description">{{ item.time }}</div>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-card>

          -->
        </a-col>

        <!--个人信息-->
        <a-col style="padding: 0 12px"
               :xl="8"
               :lg="24"
               :md="24"
               :sm="24"
               :xs="24">
          <!--个人信息-->
          <a-card style="margin-bottom: 24px; margin-top: 0px"
                  :bordered="false"
                  title="个人信息"
                  :body-style="{ padding: 0 }">
            <a-card>
              <a-row style="margin-bottom: 12px">
                <a-icon type="idcard"
                        theme="twoTone"
                        twoToneColor="#3A5FCD" />
                <strong> 账号：</strong>
                {{ userInfo.id }}
              </a-row>
              <a-row style="margin-bottom: 12px">
                <a-icon type="tag"
                        theme="twoTone"
                        twoToneColor="#3A5FCD" />
                <strong> 姓名：</strong>
                {{ userInfo.name }}
              </a-row>
              <a-row style="margin-bottom: 12px">
                <a-icon type="phone"
                        theme="twoTone"
                        twoToneColor="#3A5FCD" />
                <strong> 联系电话：</strong>
                {{ userInfo.telephone }}
              </a-row>
              <a-row style="margin-bottom: 12px">
                <a-icon type="up-circle"
                        theme="twoTone"
                        twoToneColor="#3A5FCD" />
                <strong> 工作开始时间：</strong>
                {{ userInfo.role.start }}
              </a-row>
              <a-row style="margin-bottom: 12px">
                <a-icon type="down-circle"
                        theme="twoTone"
                        twoToneColor="#3A5FCD" />
                <strong> 工作结束时间：</strong>
                {{ userInfo.role.end }}
              </a-row>
            </a-card>
          </a-card>
          <!--密码修改-->
          <div>
            <a-row style="text-align: center">
              <a-button @click="modifyPassButton"
                        type="primary"
                        icon="lock"> 修改密码</a-button>
              <a-modal v-model="showPasswordForm"
                       footer="">
                <a-form title="修改密码"
                        @submit="handleSubmit"
                        :form="form">
                  <a-form-item :wrapperCol="{ span: 24 }"
                               style="text-align: center">
                    <h3>修改密码</h3>
                  </a-form-item>
                  <a-form-item label="旧密码"
                               :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                               :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                    <a-input type="password"
                             v-decorator="[
            'old_password',
            {rules: [{ required: true, message: '请输入旧的密码' }]}
          ]"
                             name="old_password"
                             placeholder="请输入旧的密码" />
                  </a-form-item>
                  <a-form-item label="新密码"
                               :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                               :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
                    <a-input type="password"
                             v-decorator="[
            'new_password',
            {rules: [{ required: true, message: '请输入新的密码' }]}
          ]"
                             name="new_password"
                             placeholder="请输入新的密码" />
                  </a-form-item>
                  <a-form-item :wrapperCol="{ span: 24 }"
                               style="text-align: center">
                    <a-button htmlType="submit"
                              type="primary">提交</a-button>
                    <a-button style="margin-left: 8px"
                              @click="cancelModifyPassword">取消</a-button>
                  </a-form-item>

                </a-form>
              </a-modal>
            </a-row>
          </div>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapGetters } from 'vuex'
import { Button } from 'ant-design-vue'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import { Radar } from '@/components'
import { getRoleList, getServiceList, modifyPassword } from '@/api/manage'
import ARow from "ant-design-vue/es/grid/Row";
import ACol from "ant-design-vue/es/grid/Col";
import AFormItem from "ant-design-vue/es/form/FormItem";
import md5 from 'md5'

const DataSet = require('@antv/data-set')

export default {
  name: 'Homepage',
  components: {
    AFormItem,
    ACol,
    ARow,
    PageView,
    HeadInfo,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},
      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],
      old_password: '',
      new_password: '',
      form: this.$form.createForm(this),
      showPasswordForm: false,
      new_identity: {
        id: '',
        newPassword: '',
      },
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar
  },
  mounted () {
    console.log('vuex', this.userInfo)
  },
  methods: {
    ...mapGetters(['nickname', 'welcome']),
    cancelModifyPassword () {
      console.log('Cancel modify passsword')
    },
    modifyPassButton () {
      this.showPasswordForm = true;
    },
    cancelModifyPassword () {
      this.showPasswordForm = false;
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, value) => {
        if (!err) {
          if (md5(value.old_password) === this.userInfo.password) {
            this.new_identity.newPassword = md5(value.new_password)
            this.new_identity.id = this.userInfo.id
            console.log(this.new_identity)
            modifyPassword(this.new_identity).then(() => {
              this.$message.success('密码修改成功！')
            })
            console.log("Pass!")
          } else {
            this.$message.error('旧密码输入错误！')
            console.log("Failed!")
          }
        }
      })
      this.showPasswordForm = false;
    },
  }
}
</script>

<style lang="less" scoped>
.project-list {
  .card-title {
    font-size: 0;

    a {
      color: rgba(0, 0, 0, 0.85);
      margin-left: 12px;
      line-height: 24px;
      height: 24px;
      display: inline-block;
      vertical-align: top;
      font-size: 14px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .card-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }

  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .datetime {
      color: rgba(0, 0, 0, 0.25);
      flex: 0 0 auto;
      float: right;
    }
  }

  .ant-card-meta-description {
    color: rgba(0, 0, 0, 0.45);
    height: 44px;
    line-height: 22px;
    overflow: hidden;
  }
}

.item-group {
  padding: 20px 0 8px 24px;
  font-size: 0;

  a {
    color: rgba(0, 0, 0, 0.65);
    display: inline-block;
    font-size: 14px;
    margin-bottom: 13px;
    width: 25%;
  }
}

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

.mobile {
  .project-list {
    .project-card-grid {
      width: 100%;
    }
  }

  .more-info {
    border: 0;
    padding-top: 16px;
    margin: 16px 0 16px;
  }

  .headerContent .title .welcome-text {
    display: none;
  }
}
</style>
