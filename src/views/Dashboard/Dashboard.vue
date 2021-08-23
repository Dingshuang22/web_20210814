/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-15 14:45
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div>
    <div class="page-title" v-clipboard="'统计款项'">
      统计款项
    </div>
    <div class="display-flex justify-content-space-between align-items-center static-wrap mg-t-14">
      <div class="item bg1 display-flex flex-direction-column">
        <div class="display-flex align-items-center">
          <img src="../../assets/image/money3.png" alt="">
          <div class="item-title display-flex flex-direction-column justify-content-end">
            <span class="zh">今日商户交易金额 (元)</span>
            <span class="en">Daily merchant transaction amount</span>
          </div>
        </div>
        <div class="item-footer">
          <span class="fs-14">¥</span>
          <span class="fs-54">1450.0</span>
        </div>
      </div>
      <div class="item bg2 display-flex flex-direction-column">
        <div class="display-flex align-items-center">
          <img src="../../assets/image/money3.png" alt="">
          <div class="item-title display-flex flex-direction-column justify-content-end">
            <span class="zh">今日商户交易笔数</span>
            <span class="en">Daily merchant transaction amount</span>
          </div>
        </div>
        <div class="item-footer">
          <span class="fs-54">1450.0</span>
        </div>
      </div>
      <div class="item bg3 display-flex flex-direction-column">
        <div class="display-flex align-items-center">
          <img src="../../assets/image/money3.png" alt="">
          <div class="item-title display-flex flex-direction-column justify-content-end">
            <span class="zh">今日商户退款金额 (元)</span>
            <span class="en">Daily merchant transaction amount</span>
          </div>
        </div>
        <div class="item-footer">
          <span class="fs-14">¥</span>
          <span class="fs-54">1450.0</span>
        </div>
      </div>
      <div class="item bg4 display-flex flex-direction-column">
        <div class="display-flex align-items-center">
          <img src="../../assets/image/money3.png" alt="">
          <div class="item-title display-flex flex-direction-column justify-content-end">
            <span class="zh">商户总交易金额 (元)</span>
            <span class="en">Daily merchant transaction amount</span>
          </div>
        </div>
        <div class="item-footer">
          <span class="fs-14">¥</span>
          <span class="fs-54">1450.0</span>
        </div>
      </div>
    </div>
    <div class="box position-relative mg-t-48">
      <line-marker id="line-marker" width="100%" height="90%" :sourceData="sourceData"/>
      <div class="timer-box position-absolute">
        <el-date-picker
          style="width:212px;"
          value-format="yyyy-MM-dd"
          type="daterange"
          v-model="timer"
          range-separator="-"
          :clearable="false"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handlerSelecDate"
          prefix-icon="el-icon-arrow-down"
        >
        </el-date-picker>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  props: {},
  components: {},
  data () {
    return {
      timer: [
        this.moment(new Date(new Date().getTime() - 3600 * 1000 * 24 * 15)).format('YYYY-MM-DD'),
        this.moment(new Date()).format('YYYY-MM-DD')
      ], // 时间
      sourceData: {
        xias: [],
        deal: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122,100, 112, 130,150],
        refund: [20, 10, 25, 45, 122, 165, 22, 22, 82, 9, 34, 50, 22, 22, 82,60]
      }
    }
  },
  computed: {},
  created () {

    this.$api.system.getGroups()
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
        this.$notification(
            'error', '加载失败', 'top-right'
        )
      })
  },
  mounted () {
    this.initEchartXias()
  },
  watch: {},
  methods: {
    // Echarts 循环xias
    initEchartXias (count=15) {
      let arr = []
      let num = count
      console.log(num)
      for (var i=num; i>-1; i--)
      {
        arr.push(this.moment(new Date(new Date(this.timer[1]).getTime() - 3600 * 1000 * 24 * i)).format('YYYY-MM-DD'))
      }
      console.log(arr)
      this.sourceData.xias = arr
    },
    // 日期选择器
    handlerSelecDate () {
      console.log(this.timer)
      let count = this.moment(this.timer[1]).diff(this.moment(this.timer[0]), 'days')
      this.initEchartXias(count)
    }
  }
}
</script>
<style lang="scss" scoped>
  .static-wrap {
    height: 214rem;
    box-sizing: border-box;

    .item {
      width: 24%;
      height: 214rem;
      cursor: pointer;
      img {
        width: 52rem;
        height: 52rem;
        margin-left: 34rem;
        margin-top: 36rem;
        vertical-align: middle;
      }
      .item-title {
        display: inline-block;
        font-size: 12rem;
        margin-top: 30rem;
        margin-left: 10rem;
        color: #FFF;
        .zh {
          font-size: 24rem;
        }
        .en {
          margin-top: 5rem;
          font-size: 11rem;
        }
      }
      .item-footer {
        margin-top: 30rem;
        margin-left: 34rem;
        color: #FFF;
        .fs-14 {
          font-size: 14rem;
        }
        .fs-54 {
          font-size: 54rem;
        }
      }
    }
  }

  .box {
    width: 100%;
    height: 513rem;
    margin-top: 48rem;
    background: #FFFFFF;
    box-shadow: 0rem 2rem 6rem rgba(0, 0, 0, 0.04);
    opacity: 1;
    .timer-box {
      z-index: 99;
      right: 55rem;
      top: 60rem;

    }
  }
  .page-title {
    font-family: Microsoft YaHei UI;
    font-weight: bold;
    height: 32rem;
    line-height: 32rem;
    font-size: 24rem;
    color: #4D565C;
    padding-left: 12rem;
    border-left: 9rem solid #1F6BCF;
  }
  .bg1 {
    background-image: url('../../assets/image/d12.png');
    background-repeat:repeat;
    background-size: 100% 100%;
  }
  .bg2 {
    background-image: url('../../assets/image/d22.png');
    background-repeat:repeat;
    background-size: 100% 100%;
  }
  .bg3 {
    background-image: url('../../assets/image/d32.png');
    background-repeat:repeat;
    background-size: 100% 100%;
  }
  .bg4 {
    background-image: url('../../assets/image/d42.png');
    background-repeat:repeat;
    background-size: 100% 100%;
  }
  /deep/ .el-range-input {
    font-size: 13rem;
    color: #555555;
  }
</style>
