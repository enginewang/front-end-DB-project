<template>
  <div>
    <!-- input bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeID.cnType">
              <a-input :placeholder="attributeID.guide" v-model="workSheetsData[attributeID.type]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeRepairer.cnType">
              <a-input :placeholder="attributeRepairer.guide" v-model="workSheetsData[attributeRepairer.type]"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item :label="attributeStatue.cnType">
              <a-select v-model="workSheetsData[attributeStatue.type]">
                <a-select-option value="0">进行</a-select-option>
                <a-select-option value="1">完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <div class="button-group">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickSubmit"
                :disabled="emptyInput"
              >查询</a-button>
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
    <a-table :columns="columns" :dataSource="wData" @change="onChange" bordered>
      <template
        v-for="col in ['id','equipID', 'repairerID','dispatcherID','statue']"
        :slot="col"
        slot-scope="text"
      >
        <div :key="col">
          {{ text }}
        </div>
      </template>
      <template slot = 'statue' slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </template>
      <template slot="work_picture" slot-scope="text">
        <div>
          <a-avatar slot="avatar" size="large" shape="square" :src="text"/>
        </div>
      </template>
    </a-table>
    <!-- table end -->
  </div>
</template>

<script>
import { getWorkSheet } from '@/api/sheets'


const statusMap = {
  0: {
    status: 'processing',
    text: '进行'
  },
  1: {
    status: 'success',
    text: '完成'
  }
}

// columns type name

const columns = [{
  title: '工单单号',
  dataIndex: 'id',
  width: '20%',
  scopedSlots: { customRender: 'id' }
}, {
  title: '被维修器件编号',
  dataIndex: 'equipID',
  width: '17%',
  scopedSlots: { customRender: 'equipID' }
}, {
  title: '指定维修员编号',
  dataIndex: 'repairerID',
  width: '17%',
  scopedSlots: { customRender: 'repairerID' }
},{
  title: '调度员编号',
  dataIndex: 'dispatcherID',
  width: '13%',
  scopedSlots: { customRender: 'dispatcherID' }
}, {
  title: '工单状态',
  dataIndex: 'statue',
  key: 'statue',
  width: '12%',
  scopedSlots: { customRender: 'statue' }
},{
  title: '维修结果图片',
  dataIndex: 'work_picture',
  scopedSlots: { customRender: 'work_picture' }
}]


function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}

// sheets data
const wData = []
export default {
  name: 'workSheet',
  
  data () {
    this.cacheData = wData.map(item => ({ ...item }))
    return {
      attributeID: {
        type: 'id',
        cnType: '工单单号',
        guide: '请输入单号'
      },
      attributeStatue: {
        type: 'statue',
        cnType: '显示指定状态工单',
        //guide: '请输入地址'
      },
      attributeRepairer: {
        type: 'repairerID',
        cnType: '查询特定维修员的工单',
        guide: '请输入维修员编号'
      },
      workSheetsData: {
        id: '',
        repairerID: '',
        statue: '请选择状态'
      },
      wData,
      columns,
      form: this.$form.createForm(this)
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  computed: {
    emptyInput () {
      if (this.workSheetsData.id !== '' || this.workSheetsData.statue !== '请选择状态') {
        return false
      } else {
        return true
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    onChange,
    // clear all input
    onClickClearSelect () {
      this.workSheetsData.id = ''
      this.workSheetsData.statue = '请选择状态'
    },
    // submit
    onClickSubmit () {
      console.log(this.workSheetsData)
      this.onClickClearSelect()
      // to be complete
    },
    // functions in table
    goto (key) {
      const newData = [...this.wData]
      const target = newData.filter(item => key === item.key)[0]
      console.log(target.id)
    }
  },
  mounted () {
    getWorkSheet().then((response) => {
      console.log(...response)
      this.wData = [...response]
    })
  }

}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/themes/default.less';
.button-group {
  margin-bottom: 1rem;
  .button {
    margin-left: 0.5rem;
    margin-left: 0.5rem;
  }
}
</style>
