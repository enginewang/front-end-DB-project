<template>
  <page-view title="仓库预览">
    <div id="layout">
      <a-layout>
        <a-card>
          <!-- input bar -->
          <div>
            <a-form class="ant-advanced-search-form" :form="form">
              <a-row :gutter="24">
                <a-col :md="8" :sm="24">
                  <a-form-item label="编号">
                    <a-input placeholder="请输入查询编号" v-model="input" />
                  </a-form-item>
                </a-col>
                <a-col :span="24" :style="{ textAlign: 'right' }">
                  <div class="button-group">
                    <a-button size="large" class="button" type="primary" @click="onClickRefresh">刷新</a-button>
                    <a-button
                      size="large"
                      class="button"
                      type="danger"
                      @click="onClickClearSelect"
                      :disabled="emptyInput"
                      ghost
                    >重置</a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <!-- input bar end -->
          <!-- table -->
          <a-table :columns="columns" :dataSource="previewDataShow" rowKey="id" bordered>
            <template v-for="col in ['id', 'name', 'address']" slot="col" slot-scope="text">
              <div :key="col">{{ text }}</div>
            </template>
            <template slot="operation" slot-scope="text, record">
              <div class="editable-row-operations">
                <router-link :to="{ name: 'Detail', params:{ id: getID(record.id)} }">转到仓库详情页</router-link>
              </div>
            </template>
          </a-table>
        </a-card>
        <!-- table end -->
      </a-layout>
    </div>
  </page-view>
</template>

<script>
import { getWarehousePreview, getAllAddress } from '@/api/warehouse'
import { PageView } from '@/layouts'
import Fuse from 'fuse.js'

export default {
  inject: ['reload'],
  name: 'Preview',
  components: {
    PageView
  },
  data() {
    return {
      // form
      form: this.$form.createForm(this),
      columns: [
        {
          title: '编号',
          dataIndex: 'id',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'id' },
          sorter: (a, b) => a.id > b.id
        },
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center',
          width: '15%',
          scopedSlots: { customRender: 'name' },
          sorter: (a, b) => a.id > b.id
        },
        {
          title: '地址',
          dataIndex: 'address',
          align: 'center',
          width: '40%',
          scopedSlots: { customRender: 'address' },
          filters: [],
          onFilter: (value, record) => record.address.indexOf(value) === 0
        },
        {
          title: '操作',
          align: 'center',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],

      // data
      input: '',
      previewData: [],
      previewDataShow: [],
      allAddress: []
    }
  },
  // watch for fuzzy search
  watch: {
    input(pattern) {
      if (pattern == '') {
        this.previewDataShow = this.previewData
      } else {
        const option = {
          keys: ['id'],
          threshold: 0.1
        }
        var fuse = new Fuse(this.previewData, option)
        this.previewDataShow = fuse.search(pattern)
      }
    }
  },
  computed: {
    emptyInput() {
      if (this.input !== '') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    // clear all input
    onClickClearSelect() {
      this.input = ''
    },
    // submit
    onClickRefresh() {
      this.onClickClearSelect()
      this.reload()
    },
    getID(id) {
      const newData = [...this.previewDataShow]
      const target = newData.filter(item => id === item.id)[0]
      return target.id
    }
  },
  created() {
    getWarehousePreview()
      .then(response => {
        this.previewData = [...response.data]
        this.previewDataShow = this.previewData
      })
      .catch(err => {
        this.$notification.open({
          message: '获取仓库预览信息失败',
          description: '请查看控制台信息',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />
        })
        console.log('')
      })
    getAllAddress()
      .then(response => {
        this.allAddress = [...response.data]
        for (let val of this.allAddress) {
          let temp = {
            text: val,
            value: val
          }
          this.columns[2].filters.push(temp)
        }
      })
      .catch(err => {
        this.$notification.open({
          message: '获取地址列表信息失败',
          description: '请查看控制台信息',
          icon: <a-icon type="exclamation-circle" style="color: #108ee9" />
        })
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
#layout .ant-layout-header {
  background: #fff;
  color: #666;
}
.button-group {
  margin-bottom: 1rem;
  .button {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
}
</style>
