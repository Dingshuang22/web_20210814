/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-22 14:05
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div class="container">
    <div class="page-title mg-b-5">
      退款记录
    </div>
    <free-table
      border
      stripe
      :data="dataSource"
      :column="basicColumn"
      @selection-change="handleSelectionChange"
      pagination
      :auto-scroll="false"
      :total="dataSource && dataSource.length"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.size"
      @pagination="getList"
    >
      <query-list
        slot="query"
        ref="query-list"
        :list="queryData"
        :queryType="queryType"
      >
        <el-button
          slot="btn"
          type="primary"
          icon="el-icon-download"
          :plain="false"
          @click="onClick('onSetting')"
        >
          批量导出
        </el-button>
      </query-list>
      <template v-slot:payStatus="{ row }">
        <el-tag class="" :type="row.payStatus == '1' ? 'success' : 'warning'">
          {{ row.payStatus == 1 ?  '已支付' : '已退款' }}
        </el-tag>
      </template>
    </free-table>

  </div>
</template>

<script>
import { bus } from '@/utils/bus'
export default {
  name: 'RefundRecord',
  props: {},
  components: {},
  data () {
    return {
      // 区分 QueryLisit Component
      queryType: 'RefundRecord',
      // 分页
      listQuery: {
        page: 1,
        size: 15,
        mobile: '',
      },
      // 源数据
      dataSource: [
        {
          slotScope: true,
          date: '1234567890',
          tag: '待支付',
          msg: '备注',
          mobile: '13009898987',
          id:1,
          payStatus: 2
        },
        {
          date: '5432156789',
          tag: '已支付',
          msg: '备注: hello world',
          mobile: '13009898987',
          id:2,
          payStatus: 1
        }
      ],
      // 查询数据
      queryData: [
        {
          types: 'input',
          key: 'mobile',
          placeholder: '请输入手机号码',
          text: ''
        },
        {
          types: 'daterange',
          key: 'timer',
          start_placeholder: '开始日期',
          end_placeholder: '结束日期',
          text: ''
        },
        {
          types: 'button',
          type: 'primary',
          icon: 'el-icon-search',
          plain: false,
          text: '查询',
          click: 'onSearch'
        },
        {
          types: 'button',
          type: 'primary',
          icon: 'el-icon-refresh',
          plain: false,
          text: '重置',
          click: 'onReset'
        }
      ],
      // table column
      basicColumn: [
        { label: '选择',
          action: true,
          align: 'center',
          prop: 'action',
          type: 'selection'},
        { label: '手机号码', align: 'center', prop: 'mobile'},
        { label: '备注', align: 'center', prop: 'msg' },
        {
          label: '支付状态',
          align: 'center',
          prop: 'payStatus',
          slotScope: true
        },
        { label: '时间', align: 'center', prop: 'date' },
        {
          label: '操作',
          prop: 'operate',
          align: 'center',
          width: 200,
          render: (h, scope) => {
            return (
              <div>
                <el-button
                  icon="el-icon-edit-outline"
                  type="text"
                  size="mini"
                  onClick={() => {
                    console.log('编辑')
                    this.dialogTitle = 'My Infomations'
                    this.dialogFormVisible = true
                  }}
                >
                  编辑
                </el-button>
                <el-button
                  icon="el-icon-delete"
                  type="text"
                  size="mini"
                  onClick={() => {
                    let message = {
                      title: '',
                      message: ''
                    }
                    let confirm = () => alert('删除' + scope.row.name)
                    this.$message.confirm(message, confirm)
                  }}
                >
                  删除
                </el-button>
              </div>
            )
          }
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 父组件点击时间执行自组件点击事件
    onClick (val) {
      console.log(val)
      console.log(this.$refs)
      this.$refs['query-list'].onClick(val)
    },
    // 多选
    async handleSelectionChange (val) {
      await console.log(val)
    },
    // 页码
    getList (val) {
      console.log(val)
      console.log(this.listQuery)
      this.listQuery.page = val.page
      this.listQuery.size = val.size
      console.log(this.listQuery)
    },
    // 请求字段重置
    resetQueryData () {
      this.queryData.forEach(item => {
        if (item.types !== 'button') {
          item.text = ''
        }
      })
    }
  },
  created () {
    // 搜索栏搜索
    bus.$off('onSearch'+this.queryType)
    bus.$on('onSearch'+this.queryType, data => {
      console.log(data)
      this.listQuery.page = 1
      console.log(this.listQuery)
      this.listQuery = Object.assign(this.listQuery, data)
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>refound')
      console.log(this.listQuery)
    })
    // 重置搜索栏
    bus.$off('onReset'+this.queryType)
    bus.$on('onReset'+this.queryType, page => {
      this.listQuery.page = page
      this.listQuery.mobile = ''
      this.listQuery.timer = []
      console.log(this.listQuery)
      // 重置请求源数据
      this.resetQueryData()
      // 重新请求数据
    })
    // 监听操作 批量导出
    bus.$off('onSetting'+this.queryType)
    bus.$on('onSetting'+this.queryType, () => {
      this.$notification('info', '数据正在下载中...')
    })
  }
}
</script>

<style lang="scss" scoped>
  .page-title {
    height: 24rem;
    line-height: 24rem;
    font-size: 24rem;
    color: #4D565C;
    padding-left: 12rem;
    border-left: 9rem solid #1F6BCF;
    font-weight: bold;
    opacity: 1;
  }
</style>
