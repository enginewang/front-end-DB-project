<template>
  <page-view title="仓储器材">
    <div>
      <a-card :bordered="false">
        <a-form class="ant-advanced-search-form" :form="form" inline>
          <a-row :gutter="24">
            <a-col :md="6" :sm="24">
              <a-form-item>
                <label>器材编号：</label>
                <a-input placeholder="请输入器材编号" v-model="inputID"/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="24">
              <a-form-item>
                <label>出厂时间：</label>
                <a-input placeholder="请输入出厂时间" v-model="inputTime"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <br>
        <a-table :columns="columns" :dataSource="eDataShow" rowKey="id" bordered>
          <template
            v-for="col in ['id']"
            :slot="col"
            slot-scope="text, record"
          >
            {{"EQ" + text}}
          </template>
          <template slot="status" slot-scope="text">
            <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
          </template>
          <template slot="price" slot-scope="text">
            {{"￥" + text}}
          </template>
          <template slot="icon" slot-scope="text">
            <!--<div>
              <a-avatar slot="avatar" size="large" shape="square" :src="text"/>
            </div>-->
            <div id="app">
              <div class="">
                <div
                  class="pic"
                  @click="() => showImg(text)"
                >
                  <a-avatar :src="text"/>
                </div>
              </div>
              <vue-easy-lightbox
                :visible="visible"
                :imgs="src"
                @hide="handleHide"
              ></vue-easy-lightbox>
            </div>
          </template>

        </a-table>
        <a-button @click="addEquipment" type="primary" icon="plus">&nbsp;&nbsp;添加器材&nbsp;&nbsp;</a-button>
        <a-modal v-model="showAddForm" footer="">
          <a-form title="添加器件" @submit="handleSubmit" :form = "form">
            <a-form-item
              label="器材编号"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input
                v-decorator="[
            'id',
            {rules: [{ required: true, message: '请输入标题' }]}
          ]"
                name="id"
                placeholder="输入器件id" />
            </a-form-item>
            <a-form-item
              label="名称"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input
                v-decorator="[
            'name',
            {rules: [{ required: true, message: '请输入器材名称' }]}
          ]"
                name="name"
                placeholder="请输入器材名称" />
            </a-form-item>
            <a-form-item
              label="出厂日期"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-date-picker
                name="productTime"
                style="width: 100%"
                format="YYYY-MM-DD HH:mm:ss"
                :showTime="{ defaultValue: moment('00:00:00', 'HH:mm:ss') }"
                v-decorator="[
            'productTime',
            {rules: [{ required: true, message: '请选择出厂日期' }]}
          ]" />
            </a-form-item>
            <a-form-item
              label="型号编号"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input
                v-decorator="[
            'modelID',
            {rules: [{ required: true, message: '请输入型号编号' }]}
          ]"
                name="modelID"
                placeholder="输入型号编号" />
            </a-form-item>
            <a-form-item
              label="价格"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 14}, sm: {span: 20} }"
              :required="true"
            >
              <a-input-number :min="0" :max="10000" v-decorator="['price']"/>
            </a-form-item>
            <a-form-item
              label="所在仓库"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
              <a-input
                v-decorator="[
            'warehouseID',
            {rules: [{ required: false, message: '请输入所在仓库' }]}
          ]"
                name="warehouseID"
                placeholder="输入所在仓库" />
            </a-form-item>
            <a-form-item
              :wrapperCol="{ span: 24 }"
              style="text-align: center"
            >
              <a-button htmlType="submit" type="primary">提交</a-button>
              <a-button style="margin-left: 8px" @click="cancelAddForm">取消</a-button>
            </a-form-item>
          </a-form>
        </a-modal>
      </a-card>
    </div>
  </page-view>
</template>

<script>
  import {getEquipmentStoredList} from '@/api/equipment'
  import {PageView} from '@/layouts'
  import Fuse from 'fuse.js'
  import Vue from 'vue'
  import Lightbox from 'vue-easy-lightbox'
  import moment from 'moment';

  Vue.use(Lightbox)

  const statusMap = {
    0: {
      status: 'success',
      text: '全新'
    },
    1: {
      status: 'error',
      text: '报废'
    }
  }

  const columns = [{
    title: '器材编号',
    dataIndex: 'id',
    align: 'center',
    width: '12%',
    scopedSlots: {customRender: 'id'},
    sorter: (a, b) => a.id - b.id
  }, {
    title: '名称',
    dataIndex: 'name',
    align: 'center',
    width: '10%',
    scopedSlots: {customRender: 'name'}
  }, {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    width: '7%',
    scopedSlots: {customRender: 'icon'}
  }, {
    title: '出厂时间',
    dataIndex: 'productTime',
    align: 'center',
    width: '18%',
    scopedSlots: {customRender: 'productTime'},
    sorter: (a, b) => a.productTime > b.productTime
  },{
    title: '状态',
    dataIndex: 'status',
    align: 'center',
    width: '12%',
    filters: [{
      text: '全新',
      value: '0'
    }, {
      text: '报废',
      value: '1'
    }],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    scopedSlots: {customRender: 'status'}
  },{
    title: '型号编号',
    dataIndex: 'modelID',
    align: 'center',
    width: '12%',
    scopedSlots: {customRender: 'modelID'}
  }, {
    title: '价格',
    dataIndex: 'price',
    align: 'center',
    width: '8%',
    scopedSlots: {customRender: 'price'},
    sorter: (a, b) => a.price - b.price
  },{
    title: '所在仓库',
    dataIndex: 'warehouseID',
    align: 'center',
    width: '14%',
    scopedSlots: {customRender: 'storehouse'},
    filters: [{
      text: '仓库1',
      value: 'wh1'
    },
      {
        text: '仓库2',
        value: 'wh2'
      },
      {
        text: '仓库3',
        value: 'wh3'
      }],
    onFilter: (value, record) => record.warehouseID.indexOf(value) === 0
  }]
  // data
  let inputID = ''
  const eData = []
  const eDataShow = []

  export default {
    name: 'EquipPreview',
    components:{
      PageView,
    },
    data() {
      this.cacheData = eData.map(item => ({...item}))
      return {
        equipmentData: {
          id: '',
          name: '',
          productTime: '',
          status: '',
          modelID: '',
          price: '',
          count: '',
          warehouseID: ''
        },
        visible: false,
        visible2: false,
        src: "",
        eData,
        columns,
        eDataShow,
        inputID: '',
        inputTime: '',
        advanced: false,
        form: this.$form.createForm(this),
        showAddForm: false,
        newFormCount: 0
      }
    },
    computed: {
      emptyInput() {
        if (this.equipmentData.id !== '' || this.equipmentData.name !== '' || this.equipmentData.modelID !== '' || this.equipmentData.price !== '' || this.equipmentData.count !== '' || this.equipmentData.warehouseID !== '') {
          return false
        } else {
          return true
        }
      }
    },
    // watch for fuzzy search

    methods: {
      moment,
      onClickClearSelect() {
        this.equipmentData.id = ''
        this.equipmentData.name = ''
        this.equipmentData.modelID = ''
        this.equipmentData.price = ''
        this.equipmentData.count = ''
        this.equipmentData.warehouseID = ''
      },
      onClickSubmit() {
        console.log(this.equipmentData)
        this.onClickClearSelect()
      },
      handleChange(value, key, column) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.eData = newData
        }
      },
      edit(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target.editable = true
          this.eData = newData
        }
      },
      save(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          delete target.editable
          this.eData = newData
          this.cacheData = newData.map(item => ({...item}))
        }
      },
      cancel(key) {
        const newData = [...this.eData]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0])
          delete target.editable
          this.eData = newData
        }
      },
      toggleAdvanced() {
        this.advanced = !this.advanced
      },
      addEquipment() {
        this.showAddForm = true;
      },
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            // eslint-disable-next-line no-console
            console.log('Received values of form: ', values)
          }
        })
        this.showAddForm = false;
      },
      cancelAddForm() {
        this.showAddForm = false;
      },
      showImg (text) {
        this.visible = true
        this.src = text
      },
      handleHide () {
        this.visible = false
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
    watch: {
      inputID(pattern){
        if ( pattern == '' ){
          this.eDataShow = this.eData
        }
        else{
          const option = {
            keys: ['id'],
            threshold: 0.1
          }
          var fuse = new Fuse(this.eData, option)
          this.eDataShow = fuse.search(pattern)
          console.log(this.eDataShow)
        }
      },
      inputTime(pattern){
        if ( pattern == '' ){
          this.eDataShow = this.eData
        }
        else{
          const option = {
            keys: ['productTime'],
            threshold: 0.1
          }
          var fuse = new Fuse(this.eData, option)
          this.eDataShow = fuse.search(pattern)
          console.log(this.eDataShow)
        }
      }
    },
    mounted() {
      getEquipmentStoredList().then((response) => {
        console.log(...response.data)
        this.eData = [...response.data]
        this.eDataShow = this.eData
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

  .ant-form-inline .ant-form-item {
    display: inline-block;
    margin-right: 0;
  }
</style>
