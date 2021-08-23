/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-22 16:27
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div  class="box-card">
    <span v-for="(item, idx) in list" :key="idx">
      <el-input
        v-if="item.types === 'input'"
        v-model.trim="data[item.key]"
        :placeholder="item.placeholder"
      >
      </el-input>
      <el-select
        v-if="item.types === 'select'"
        v-model="data[item.key]"
        :placeholder="item.placeholder"
        filterable
        clearable
      >
        <el-option
          v-for="(sItem, idx) in item.selectOptions"
          :key="idx"
          :label="sItem.label"
          :value="sItem.value"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-if="item.types === 'daterange'"
        v-model="data[item.key]"
        type="daterange"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        range-separator="-"
        :start-placeholder="item.start_placeholder"
        :end-placeholder="item.end_placeholder"
        :default-time="['00:00:00', '23:59:59']"
        prefix-icon="el-icon-arrow-down"
      >

      </el-date-picker>
      <el-date-picker
        v-if="item.types === 'datetimerange'"
        v-model="data[item.key]"
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
    </span>
    <div class="float-right">
      <slot name="btn" class="float-right"></slot>
    </div>
  </div>
</template>

<script>
import { bus } from '@/utils/bus'
export default {
  name: 'QueryList',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    queryType: {
      type: String,
      default: ''
    }
  },
  components: {},
  data () {
    return {
      data: []
    }
  },
  watch: {
    list: {
      handler(newVal, oldVal) {
        console.log(newVal)
        this.data = Object.assign({}, this.calData)
      },
      immediate: true,
      deep: true
    }
  },
  computed: {},

  created () {

    this.data = Object.assign({}, this.calData)
  },
  mounted () {
  },
  methods: {
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
      switch (val) {
        case 'onSearch' :
          console.log(this.data)
          console.log('onSearch'+this.queryType)
          console.log(this.queryType)
          bus.$emit('onSearch'+this.queryType, this.data)
          break
        case 'onReset' :
          this.data = Object.assign({}, this.calData)
          bus.$emit('onReset'+this.queryType, 1)
          break
        case 'onSetting' :
          bus.$emit('onSetting'+this.queryType)
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/ .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner {
  width: 320rem;
}
/deep/ .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
  width: 268rem;
}
</style>
