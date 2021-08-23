<template>
  <div class="free-table">
    <slot name="query"></slot>
    <slot></slot>
    <el-table ref="elTable" :data="data" :height="height" v-bind="$attrs" v-on="$listeners"
              :header-cell-style="{color:'#222222',background: '#F4F6FB',fontSize: '18rem'}"
    >
      <template v-for="item in tbColumns">
        <el-table-column
          v-if="item.slotScope"
          v-bind="item"
          :key="typeof(item.prop) == 'string' ? item.prop : item.prop.par" :column="item"
          v-on="$listeners"
        >
          <template slot-scope="scope">
            <slot :name="typeof(item.prop) == 'string' ? item.prop : item.prop.par" :column="item" v-bind="scope"></slot>
          </template>
        </el-table-column>
        <free-column v-else v-bind="$attrs" :key="typeof(item.prop) == 'string' ? item.prop : item.prop.par" :column="item" />
      </template>
    </el-table>

    <template v-if="pagination">
      <pagination v-if="data.length > 0" v-bind="$attrs" v-on="$listeners" />
    </template>
  </div>
</template>

<script>
import FreeColumn from './columu'
import Pagination from '../Pagination'
import { bus } from '../../../utils/bus'

export default {
  name: 'FreeTable',
  components: {
    Pagination,
    FreeColumn
  },
  props: {
    data: Array,
    column: Array,
    columnsProps: Object,
    height: {
      type: String,
      default: '600rem'
    },
    pagination: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    tbColumns () {
      const { column, columnsProps: props } = this
      return column.map(col => {
        const it = Object.assign({}, props, col)
        return it
      })
    }
  },
  methods: {
    // 页面跳转
    onJump (item, name) {
      bus.$emit('onJump', {item, name})
    }
  }
}
</script>
