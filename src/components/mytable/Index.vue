<template>
  <div v-loading.fullscreen="fullscreenLoading">
    <div class="table-header-search" v-if="searchParam.length || searchButton.length">
      <el-card class="box-card" shadow="never">
        <el-row>
          <el-col :span="24">
            <template v-for="(item, index) in searchParam">
              <el-input
                :key="index"
                v-if="item.types == 'text'"
                prefix-icon="el-icon-search"
                clearable
                :class="item.class"
                v-model="searchData[item.key]"
                :placeholder="item.placeholder"
              ></el-input>
              <el-select
                :key="index"
                v-if="item.types == 'select'"
                clearable
                filterable
                :class="item.class"
                v-model="searchData[item.key]"
                :placeholder="item.placeholder"
              >
                <el-option v-for="(option, index) in item.selectOptions" :key="index" :value="option.value" :label="option.label"/>
              </el-select>
              <el-date-picker
                v-if="item.types === 'daterange'"
                v-model="searchData[item.key]"
                type="daterange"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                range-separator="至"
                :start-placeholder="item.start_placeholder"
                :end-placeholder="item.end_placeholder"
                :default-time="['00:00:00', '23:59:59']"
              >

              </el-date-picker>
              <el-date-picker
                v-if="item.types === 'datetimerange'"
                v-model="searchData[item.key]"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                :start-placeholder="item.start_placeholder"
                :end-placeholder="item.end_placeholder"
                :default-time="['00:00:00', '23:59:59']"
              >

              </el-date-picker>
              <el-button
                v-if="item.types === 'button'"
                :type="item.type"
                :icon="item.icon"
                :plain="item.plain"
                @click="onClick(item.click)"
              >
                {{ item.text }}
              </el-button>
              <slot name="btn"></slot>
            </template>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <div class="table-box">
      <el-table v-loading="tableLoading" :data="tableData" @selection-change="onSelectAll" :height="tableHeight">
        <template v-for="(item, index) in listColumn">
          <el-table-column
            v-if="item.prop == 'action'"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'"
            type="selection"
          >
          </el-table-column>
          <el-table-column
            v-if="item.prop == 'avatar'"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'"
          >
            <template slot-scope="scope">
              <el-avatar size="medium" :src="scope.row[item.prop]"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.hasOwnProperty('is_interaction')"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'"
          >
            <template slot-scope="scope">
              <!--              <el-tag size="mini"  v-if="scope.row.statusType === ''">{{scope.row.dataKey}}</el-tag>-->
              <el-tag size="mini" :type="scope.row[item.prop].tag_type">{{ scope.row[item.prop].tag_name }}</el-tag>
              <!--              <el-tag size="mini" :type="scope.row.statusType" v-else-if="scope.row.statusType === 'danger'">{{scope.row.status_name}}</el-tag>-->
              <!--              <el-tag size="mini" :type="scope.´row.statusType" v-else-if="scope.row.statusType === 'warning'">{{scope.row.status_name}}</el-tag>-->
              <!--              <el-tag size="mini" :type="scope.row.statusType" v-else-if="scope.row.statusType === 'success'">{{scope.row.status_name}}</el-tag>-->
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.hasOwnProperty('is_switch')"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label ? item.label : '是否启用'"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.is_switch"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="2"
                @change="onSwitchChange(scope.row, item.url)"
              >
              </el-switch>
              <!--              <el-tag size="mini"  v-if="scope.row.statusType === ''">{{scope.row.dataKey}}</el-tag>-->
<!--              <el-tag size="mini" :type="scope.row[item.prop].tag_type">{{ scope.row[item.prop].tag_name }}</el-tag>-->
              <!--              <el-tag size="mini" :type="scope.row.statusType" v-else-if="scope.row.statusType === 'danger'">{{scope.row.status_name}}</el-tag>-->
              <!--              <el-tag size="mini" :type="scope.´row.statusType" v-else-if="scope.row.statusType === 'warning'">{{scope.row.status_name}}</el-tag>-->
              <!--              <el-tag size="mini" :type="scope.row.statusType" v-else-if="scope.row.statusType === 'success'">{{scope.row.status_name}}</el-tag>-->
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.prop.indexOf('image') > -1"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label ? item.label : '图片'"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'"
          >
            <template slot-scope="scope">
              <el-image
                :style="'width:' + scope.row[item.prop + 'Wtidth'] + ';height:' + scope.row[item.prop + 'Height']"
                :src="scope.row[item.prop + 'Url']"
                fit="contain"></el-image>
            </template>
          </el-table-column>
          <el-table-column
            v-else-if="item.prop !== 'action' && item.prop !== 'operate'"
            :key="index"
            :align="item.align ? item.align : 'left'"
            :label="item.label"
            :prop="item.prop ? item.prop : ''"
            :width="item.width ? item.width : '*'">
          </el-table-column>
        </template>
      </el-table>
      <el-pagination
        style="margin-top:10px;"
        @current-change="handleCurrentChange"
        :current-page="searchData.page"
        :page-size="pageConfig.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="pageConfig.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>

import {tableHeight} from './mixins/resize'
import { bus } from '@/export'
export default {
  mixins: [tableHeight],
  components: {
  },
  data () {
    return {
      tableHeight: 430,
      fullscreenLoading: false,
      tableLoading: false,
      pageConfig: {
        pageSize: 15,
        total: 0
      },
      searchData: {
        page: 1
      },
      tableData: [

      ]
    }
  },
  props: {
    rowKey: {
      type: String,
      default: ''
    },
    treeProps: {
      type: Object,
      default: () => {}
    },
    listUrl: {
      type: String,
      default: () => {
        return ''
      }
    },
    listRequest: {
      type: Object,
      default: () => {
        return null
      }
    },
    searchParam: {
      type: Array,
      default: () => {
        return []
      }
    },
    listColumn: {
      type: Array,
      default: () => {
        return []
      }
    },
    listDataFormat: {
      type: Function
    }
  },
  mounted () {
    this.initTable()
    this.$nextTick(() => {
      this.searchParam.page = 1
      this.getList()
    })
  },
  methods: {
    initTable () {
      let searchBox = window.document.getElementsByClassName('box-card')

      let height = window.innerHeight

      if (searchBox[0] && searchBox[0].clientHeight) {
        height = height - searchBox[0].clientHeight - 70
      }
      console.log(height)
    },
    // 禁选
    selectable (row, indx) {
      // console.log(row)
      if (!row.child) {
        return true
      } else {
        return false
      }
    },
    // Select All
    onSelectAll (All) {
      console.log(All)
    },
    // switch change
    onSwitchChange (item, url) {
      console.log(item)
      console.log('..............')
      console.log(url)
      this.$notification('success', '后台连调修改', 'top-left')
    },
    // 操作栏
    onSetting (click, item) {
      console.log(click)
      switch (click) {
        case 'onEdit':
          bus.$emit('onEditTable', item)
          break
        case 'onSee':
          this.$notification('info', '正在查看', 'top-left')
          break
        case 'onDelete':
          let confirm = () => this.$notification('info', '正在 删除中', 'top-left')
          this.$message.confirm({message: `您确定要删除这条信息吗?`, title: '删除确认'}, confirm)
          break
      }
    },
    calData () {
      let obj = {}
      this.list.forEach(item => {
        if (item.types !== 'button') {
          obj[item.key] = item.text
        }
      })
      return obj
    },
    onClick (val) {
      console.log(val)
      console.log(this.searchData)
      switch (val) {
        case 'onSearch' :
          this.getList(this.searchData)
          // bus.$emit('onSearch', this.searchData)
          break
        case 'onReset' :
          this.searchData = Object.assign({}, this.calData)
          // bus.$emit('onReset', 1)
          this.getList()
          break
        case 'onSetting' :
          this.$notification('success', '操作成功...')
          break
      }
    },
    getSearchParam () {
      return this.searchData
    },
    searchHandle () {
      const that = this
      that.searchData.page = 1
      that.getList()
    },
    resetHandle () {
      // todo 重置搜索条件，重新搜索
    },
    getList () {
      this.tableLoading = true
      // 请求源数据 this.$api.getSearch()
      // this.request(this.listUrl, 'get', this.getSearchParam()).then(res => {
      //   let tableData = res.data.data ? res.data.data : res.data.list
      //   if (!tableData) {
      //     tableData = []
      //   }
      //   this.tableData = this.listDataFormat(tableData)
      //   this.pageConfig.total = res.data.total
      //   this.tableLoading = false
      // }, error => {
      //   this.tableLoading = false
      // })
      setTimeout(() => {
        this.tableData = [
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ]
          },
          {
            id: 1,
            date: '3456789',
            avatar: require('@/assets/images/logo.png'),
            name: 'Alex',
            city: '北京',
            tag: {
              tag_name: 'private',
              tag_type: 'danger'
            },
            buttonType: 2,
            private: '是',
            button: [
              {
                show: true,
                type: 'text',
                name: '编辑',
                icon: 'el-icon-edit',
                click: 'onEdit'
              },
              {
                show: true,
                type: 'text',
                name: '查看',
                icon: 'el-icon-view',
                click: 'onSee'
              },
              {
                show: true,
                type: 'text',
                name: '删除',
                icon: 'el-icon-delete',
                click: 'onDelete'
              }
            ],
            children: [
              {
                id: 2,
                date: '3456789',
                child: true,
                avatar: require('@/assets/images/logo.png'),
                name: 'Alex',
                city: '北京',
                tag: {
                  tag_name: 'private',
                  tag_type: 'danger'
                }
                // buttonType: 2,
                // private: '是',
                // button: [
                //   {
                //     show: true,
                //     type: 'text',
                //     name: '编辑',
                //     icon: 'el-icon-edit',
                //     click: 'onEdit'
                //   },
                //   {
                //     show: true,
                //     type: 'text',
                //     name: '查看',
                //     icon: 'el-icon-view',
                //     click: 'onSee'
                //   },
                //   {
                //     show: true,
                //     type: 'text',
                //     name: '删除',
                //     icon: 'el-icon-delete',
                //     click: 'onDelete'
                //   }
                // ]
              }
            ]
          }
        ]
        this.tableLoading = false
      }, 200)
    },
    dropdownShow (row) {
      if (row.button.length > 1) {
        let show = false
        row.button.forEach((ele, index) => {
          if (index > 0 && ele.show()) {
            show = true
          }
        })
        return show
      }

      return false
    },
    handleCurrentChange (page) {
      this.searchData.page = page
      this.getList()
    },
    refresh () {
      this.getList()
    }
  }
}
</script>
<style scoped>
.table-box {
  margin-top: 10px;
}

.table-box .el-button {
  margin-right: 5px;
}
</style>
