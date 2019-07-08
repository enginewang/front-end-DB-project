<template>
<div>
    <div>
      <a-form class="ant-advanced-search-form" :form="form" layout="inline">
        <a-row :gutter="24">
          <a-col :md="4" :sm="30" v-for="( item,index ) in attribute" :key="index">
            <a-form-item :label="item.cnType">
              <a-input :placeholder="item.guide" v-model="equipmentData[item.type]"/>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :md="5" :sm="25">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="onClickSubmit" :disabled="emptyInput" >查询</a-button>
              <a-button style="margin-left: 8px" type="danger" @click="onClickClearSelect" :disabled="emptyInput" ghost>重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <br>
    <a-table :columns="columns" :dataSource="wData" bordered>
      <template
        v-for="col in ['id','name', 'address','area']"
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
    </a-table>
</div>
</template>

<script>
import { deflate } from "zlib";

const columns = [{
  title: '员工ID',
  dataIndex: 'id',
  width: '15%',
  scopedSlots: { customRender: 'id' }
}, {
  title: '姓名',
  dataIndex: 'name',
  width: '10%',
  scopedSlots: { customRender: 'name' }
}, {
    title: '电话',
    dataIndex: 'phone',
    width: '15%',
    scopedSlots: { customRender: 'phone' }
}, {
    title: '身份证号',
    dataIndex: 'citizen_id',
    width: '20%',
    scopedSlots: { customRender: 'citizen_id' }
}, {
    title: '身份',
    dataIndex: 'identity',
    width: '10%',
    scopedSlots: { customRender: 'identity' }
}, {
    title: '创建时间',
    dataIndex: 'create_time',
    width: '10%',
    scopedSlots: { customRender: 'create_time' }
},
{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

export default {
    name: 'Staff',
    
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