<template>
  <page-view title="报修单管理">
    <div>
      <a-card :bordered="false"
              class="ant-pro-components-tag-select">
        <a-form :form="form"
                layout="inline">

          <standard-form-row grid
                             last>
            <a-row>
              <a-col :lg="8"
                     :md="10"
                     :sm="10"
                     :xs="24">
                <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }"
                             label="根据编号查找：">
                  <a-tooltip :trigger="['focus']"
                             placement="topLeft"
                             overlayClassName="numeric-input">
                    <span slot="title"
                          v-if="idFilterValue"
                          class="numeric-input-title">
                      {{idFilterValue !== '-' ? idFilterValue : '-'}}
                    </span>
                    <template slot="title"
                              v-else>
                      请填写报修单编号
                    </template>
                    <a-input :value="idFilterValue"
                             @change="filterOnce"
                             placeholder="请填写报修单号"
                             maxLength="25"
                             v-model="idFilterValue"
                             style="width: 120px" />
                  </a-tooltip>
                </a-form-item>
              </a-col>
              <a-col :lg="8"
                     :md="10"
                     :sm="10"
                     :xs="24">
                <a-form-item :wrapper-col="{ sm: { span: 16 }, xs: { span: 24 } }"
                             label="根据状态查找：">
                  <a-select allowClear
                            style="max-width: 200px; width: 100%;"
                            placeholder="不限"
                            @change="onChange"
                            v-decorator="['rate']">
                    <a-select-option value="0">用户提交</a-select-option>
                    <a-select-option value="1">巡检员提交</a-select-option>
                    <a-select-option value="2">已调度</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </standard-form-row>
        </a-form>
      </a-card>
      <div class="button">
        <a-button type='primary'
                  @click="refreshTable">刷新表单</a-button>
      </div>
      <div class="ant-pro-pages-list-projects-cardList">
        <a-list :loading="loading"
                :data-source="data"
                :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
                :pagination="pagination">
          <a-list-item slot="renderItem"
                       slot-scope="item">

            <a-card class="ant-pro-pages-list-projects-card"
                    hoverable
                    :loading="loading">
              <img slot="cover"
                   :src="item.cover"
                   :alt="item.title" />
              <a-card-meta :title="'报修单编号：'+item.title">
                <template slot="description">
                  <ellipsis :length="70">{{ item.type }}</ellipsis>
                  <br>
                  <ellipsis :length="70">{{ state[item.state] }}</ellipsis>
                  <br>
                  <ellipsis :length="70">{{`待维修器材编号：${item['EqId']}`}}</ellipsis>
                </template>
                <template slot="description">

                </template>
              </a-card-meta>
              <div class="cardItemContent"
                   style="">
                <!-- <span>{{ item.updatedAt | fromNow }}</span> -->

                <router-link :to="{ name: 'repairDetail', params:{ details: item} }">查看详情</router-link>
                <!--<a-button type='primary' @click="shownewPage(item)">查看详情</a-button>-->

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
  </page-view>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
import Fuse from 'fuse.js'
import repairSheetDetail from './components/repairSheetDetail'
import { getRepairSheet } from '@/api/repairSheet'
import { PageView } from '@/layouts'


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
    StandardFormRow,
    PageView
  },
  data () {
    return {
      data: [],
      allData: [],
      form: this.$form.createForm(this),
      loading: true,
      state: { "0": "状态：用户提交", "1": "状态：巡检员提交", "2": "状态：已调度" },
      pagination: {
        pageSize: 8,
        showTotal: (total, range) => {
          console.log("range", range)
          if (range[1] == 0) {
            return `0-0 of 0 items`
          }
          return `${range[0]}-${range[1]} of ${total} items`
        },
        defaultCurrent: 1,
        showQuickJumper: true,
      },
      idFilterValue: '',
      selection: '',
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
  created () {
    this.getList()
  },
  methods: {

    refreshTable () {
      this.loading = true
      getRepairSheet().then(response => {
        console.log('sssss', response.data)
        pageData = response.data
        var dic = new Array()
        // console.log(response.data["0"])
        for (let i = 0; i < pageData.length; i++) {
          console.log("i :" + pageData[i])
          var item = pageData[i]
          dic[item.title] = item;
        }
        console.log('dic', dic)
        var titles = Object.keys(dic).sort().reverse();
        console.log('titles', titles)
        // this.data.push(pageData[titles])
        var result = new Array()
        for (let i = 0; i < titles.length; i++) {
          var title = titles[i]
          console.log("title", titles[i])
          console.log("item", dic[title])
          result.push(dic[title])

        }
        console.log('result', result)


        this.loading = false
        this.data = result
      })

    },

    getList () {
      // this.$http.get('/list/article', { params: { count: 12 } }).then(res => {
      //   console.log('res', res)
      //   this.data = res.result
      //   this.loading = false
      //   pageData = this.data
      // })
      getRepairSheet().then(response => {
        console.log('sssss', response.data)
        pageData = response.data
        var dic = new Array()
        // console.log(response.data["0"])
        for (let i = 0; i < pageData.length; i++) {
          console.log("i :" + pageData[i])
          var item = pageData[i]
          dic[item.title] = item;
        }
        console.log('dic', dic)
        var titles = Object.keys(dic).sort().reverse();
        console.log('titles', titles)
        // this.data.push(pageData[titles])
        var result = new Array()
        for (let i = 0; i < titles.length; i++) {
          var title = titles[i]
          console.log("title", titles[i])
          console.log("item", dic[title])
          result.push(dic[title])

        }
        console.log('result', result)


        this.loading = false
        this.data = result
      })

    },
    onChange (value) {
      console.log("Changed", value)
      this.selection = value
      console.log("se", this.selection)
      this.filterOnce()
    },
    // onIdFilterChange (e) {
    //   const {value} = e.target
    //   this.idFilterValue = value
    //   console.log("filterID",value)
    //   this.filterOnce()
    // },
    filterOnce () {
      if (!this.idFilterValue) {
        var result = pageData
      }
      else {
        var oldData = pageData
        var options = this.fusejsOptions
        var fuse = new Fuse(oldData, options)
        var result = fuse.search(this.idFilterValue)
        console.log(result)

      }

      //单号不为空
      if (result != null && result.length > 0 && (!this.selection || this.selection == '')) {
        this.data = result
        console.log('有ID无状态', this.idFilterValue)
      }
      else if (result != null && result.length > 0 && this.selection && this.selection != '') {
        console.log('有ID有状态', this.idFilterValue)
        var last = []
        for (let item of result) {
          if (item['state'] == this.selection) {
            last.push(item)
          }
        }
        this.data = last
      }
      else if ((result == null || result.length <= 0) && this.selection && this.selection != '') {
        console.log('无ID有状态', this.selection)
        var last = []
        for (let item of this.pageData) {
          if (item['state'] == this.selection) {
            last.push(item)
          }
        }
        this.data = last
      }
      else {
        console.log('无ID无状态')
        this.data = pageData
      }
      // if(result != null && result.length > 0){
      //   console.log("updated")
      //   this.data = result
      //   if(this.selection != ''){
      //     var last = []
      //     for(let item of result){
      //       if(item['state'] == this.selection){
      //         last.push(item)
      //       }
      //     }
      //     this.data = last
      //   }
      //   else{
      //     this.data = result
      //   }
      // }
      // else{
      //   if(this.selection !=''){
      //     var last = []
      //     for(let item of pageData){
      //       if(item['state'] == this.selection){
      //         last.push(item)
      //       }
      //     }
      //     this.data = last
      //   }
      //   else{
      //     this.data = pageData
      //   }

      //   console.log("updated null")
      // }

    },



  }

}
</script>

<style lang="less" scoped>
.button {
  margin-top: 1rem;
}
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
    height: 66px;
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
      color: rgba(0, 0, 0, 0.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>
