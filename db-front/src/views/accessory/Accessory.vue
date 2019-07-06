<template>
  <div>
    <!-- table -->
    <a-table :columns="columns" :dataSource="data" @change="onChange"/>
    <!-- table end -->
    <!-- add bar -->
    <div>
      <a-form class="ant-advanced-search-form" :form="form">
        <a-row :gutter="24">
          <a-col v-for="( item,index ) in attribute" :key="index" :span="4">
            <a-form-item :label="item.cnType">
              <a-input :placeholder="item.guide" v-model="addData[item.type]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <div class="button-group">
              <a-button
                size="large"
                class="button"
                type="primary"
                @click="onClickSubmit"
                :disabled="emptyInput"
              >添加</a-button>
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
    <!-- add bar end -->
  </div>
</template>
<script>
const columns = [{
  title: '配件ID',
  dataIndex: 'id',
  sorter: (a, b) => a.id - b.id,
}, {
  title: '配件类型',
  dataIndex: 'type',
  filters: [{
    text: "履带",
    value: 'type1',
  },{
    text: '螺丝',
    value: 'type0',
  }],
  onFilter: (value, record) => record.type.indexOf(value) === 0
},{
  title: '价格',
  dataIndex: 'price',
  sorter: (a, b) => a.price - b.price,
}, {
  title: '型号编号',
  dataIndex: 'model'
},{
  title: '所在仓库',
  dataIndex: 'warehouseID',
  filters: [{
    text: "wh_1",
    value: "wh_1"
  }],
  onFilter: (value, record) => record.warehouseID.indexOf(value) === 0
}];

const data = []
for (let i = 0; i < 100; i++) {
    data.push({
        id: i.toString(),
        type: `type${i % 2}`,
        price: `${100 - i}`,
        model: `model${i}`,
        warehouseID: `wh_${i % 2 + 1}`
    })
}
function onChange(pagination, filters, sorter) {
  console.log('params', pagination, filters, sorter);
}


export default {
  data() {
    return {
      attribute:[
        {type: 'type', cnType: '配件类型', guide: '请输入配件类型'},
        {type: 'price', cnType: '配件价格', guide: '请输入配件价格'},
        {type: 'model', cnType: '型号编号', guide: '请输入型号编号'},
        {type: 'warehouseID', cnType: '所在仓库ID', guide: '请输入所在仓库ID'},
        {type: 'num', cnType:'数量', guide:'请输入配件数量'}
      ],
      data,
      columns,
      // information of add
      addData: {
        type: '',
        price: '',
        model: '',
        warehouseID: '',
        num: ''
      },
      columns,
      data,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    //select
    onChange,
    // clear all input
    onClickClearSelect () {
      this.addData.type = ''
      this.addData.price = ''
      this.addData.model = ''
      this.addData.warehouseID = ''
      this.addData.num = ''
    },
    // submit
    onClickSubmit () {
      console.log(this.addData)
      this.onClickClearSelect()
    }
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