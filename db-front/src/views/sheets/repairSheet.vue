<template>
  <div>
    <a-card :bordered="false" class="ant-pro-components-tag-select">
      <a-form :form="form" layout="inline">
        
        <standard-form-row  grid last>
          <a-row>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="根据编号查找：">
                <a-tooltip
                  :trigger="['focus']"
                  placement="topLeft"
                  overlayClassName="numeric-input"
                >
                  <span slot="title" v-if="idFilterValue" class="numeric-input-title">
                    {{idFilterValue !== '-' ? idFilterValue : '-'}}
                  </span>
                  <template slot="title" v-else>
                    请填写保修单账号
                  </template>
                  <a-input
                    :value="idFilterValue"
                    @change="onIdFilterChange"
                    placeholder="请填写报修单号"
                    maxLength="25"
                    style="width: 120px"
                  />
                </a-tooltip>
              </a-form-item>
            </a-col>
            <a-col :lg="8" :md="10" :sm="10" :xs="24">
              <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }" label="根据状态查找：">
                <a-select
                  style="max-width: 200px; width: 100%;"
                  placeholder="不限"
                  v-decorator="['rate']">
                  <a-select-option value="user">待巡检</a-select-option>
                  <a-select-option value="inspector">待调度</a-select-option>
                  <a-select-option value="dispatcher">已调度</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </standard-form-row>
      </a-form>
    </a-card>

    <div class="ant-pro-pages-list-projects-cardList">
      <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }" :pagination="pagination">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card class="ant-pro-pages-list-projects-card" hoverable :loading="loading">
            <img slot="cover" :src="item.cover" :alt="item.title" />
            <a-card-meta :title="item.title">
              <template slot="description">
                <ellipsis :length="50">{{ item.type }}</ellipsis>
                <br>
                <ellipsis :length="50">{{ item.state }}</ellipsis>
              </template>
              <template slot="description">
                
              </template>
            </a-card-meta>
            <div class="cardItemContent">
              <span>{{ item.updatedAt | fromNow }}</span>
              <a-button type='primary' @click="showDynamicModal(item)">查看详情</a-button>
              <!-- <div class="avatarList">
                <avatar-list size="mini">
                  <avatar-list-item
                    v-for="(member, i) in item.members"
                    :key="`${item.id}-avatar-${i}`"
                    :src="member.avatar"
                    :tips="member.name"
                  />
                </avatar-list>
              </div> -->
            </div>
          </a-card>
        </a-list-item>
      </a-list>
      <!-- <div id="pagination" >
        <a-pagination
          :total="totalCards"
          :showTotal="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
          :pageSize="8"
          :defaultCurrent="1"
        />
      </div> -->
      
    </div>

    
  </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import Fuse from 'fuse.js'
import repairSheetDetail from './components/repairSheetDetail'
import { getRepairSheet } from '@/api/repairSheet'

var pageData = null
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.AvatarItem

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true,
      pagination:{
        pageSize: 8,
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        defaultCurrent: 1,
        showQuickJumper: true,
        onChange: this.onChange
      },
      idFilterValue: '',
      fusejsOptions: {
        shouldSort: true,
        tokenize: true,
        threshold: 1.0,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          "title",
          "description"
        ]

      },
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      // this.$http.get('/list/article', { params: { count: 12 } }).then(res => {
      //   console.log('res', res)
      //   this.data = res.result
      //   this.loading = false
      //   pageData = this.data
      // })
    getRepairSheet().then(response => {
      console.log('sssss',response.data)
        this.data = response.data
        this.loading = false
        pageData = this.data
      })

    },
    onChange(){
      console.log("quick jump")
    },
    onIdFilterChange (e) {
      const {value} = e.target
      console.log("ok")
      this.idFilterValue = value
      this.filterOnce()
    },
    filterOnce(){
      var oldData = pageData
      var options = this.fusejsOptions
      var fuse = new Fuse(oldData, options)
      var result = fuse.search(this.idFilterValue)
      console.log(result)
      if(result != null && result.length > 0){
        console.log("updated")
        this.data = result
      }

      else{
        console.log("updated null")
        this.data = pageData
      }
    },

    showDynamicModal (item) {
      console.log("itemInfo",item)
      this.$modal.show(repairSheetDetail,
       {details: item},
    {
        adaptive: true,
        draggable: false,
        scrollable: true,
        height: "auto",
        width: "60%"})
    },
  }
  
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
