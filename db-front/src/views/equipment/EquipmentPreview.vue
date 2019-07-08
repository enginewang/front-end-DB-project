<template>
  <a-card :bordered="false">
    <a-table :columns="columns" :dataSource="eDataShow" rowKey="id" bordered>
      <template
              v-for="col in ['id','name', 'modelID', 'price', 'count', 'warehouseID']"
              :slot="col"
              slot-scope="text, record"
      >
        <div :key="col">
          <a-input
                  v-if="record.editable"
                  style="margin: -5px 0"
                  :value="text"
                  @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">确认</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>&nbsp;&nbsp;&nbsp;&nbsp;取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.key)">Edit</a>
          </span>
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
                label="数量"
                :labelCol="{lg: {span: 7}, sm: {span: 7}}"
                :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
                :required="true"
        >
          <a-input-number :min="0" :max="10000" v-decorator="['count']"/>
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
</template>

<script>
  import {getEquipmentAllList} from '@/api/equipment'
  import Fuse from 'fuse.js'
  const columns = [{
    title: '器材编号',
    dataIndex: 'id',
    width: '15%',
    scopedSlots: {customRender: 'id'},
    sorter: (a, b) => a.id - b.id
  }, {
    title: '名称',
    dataIndex: 'name',
    width: '10%',
    scopedSlots: {customRender: 'name'}
  }, {
    title: '图标',
    dataIndex: 'icon',
    width: '10%',
    scopedSlots: {customRender: 'icon'}
  }, {
    title: '型号编号',
    dataIndex: 'modelID',
    width: '15%',
    scopedSlots: {customRender: 'modelID'}
  }, {
    title: '价格',
    dataIndex: 'price',
    width: '10%',
    scopedSlots: {customRender: 'price'},
    sorter: (a, b) => a.price - b.price
  }, {
    title: '数量',
    dataIndex: 'count',
    width: '10%',
    scopedSlots: {customRender: 'count'},
    sorter: (a, b) => a.count - b.count
  }, {
    title: '所在仓库',
    dataIndex: 'warehouseID',
    width: '10%',
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
  }, {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: {customRender: 'operation'}
    }]
  // data
  let inputID = ''
  const eData = []
  const eDataShow = []

  export default {
    name: 'EquipPreview',
    data() {
      this.cacheData = eData.map(item => ({...item}))
      return {
        equipmentData: {
          id: '',
          name: '',
          modelID: '',
          price: '',
          count: '',
          warehouseID: ''
        },
        eData,
        columns,
        eDataShow,
        inputID: '',
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
      }
    },
    mounted() {
      getEquipmentAllList().then((response) => {
        console.log(...response)
        this.eData = [...response]
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
