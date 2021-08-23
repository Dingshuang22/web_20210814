<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts, {init, graphic} from 'echarts'
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    sourceData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    sourceData: {
      handler (newVal, oldCal) {
        this.initChart()
      },
      // immediate: true,
      deep: true
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = init(document.getElementById(this.id))
      this.chart.setOption({
        backgroundColor: '#FFF',
        title: {
          top: 20,
          text: '交易趋势',
          textStyle: {
            fontFamily: 'Microsoft YaHei UI',
            fontWeight: 'bold',
            fontSize: '24rem',
            color: '#4D565C'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#EAF0F4'
            }
          },
          textStyle: {
            fontWeight: 'normal',
            fontSize: '12rem',
            color: '#555555'
          },
        },
        legend: {
          top: '60',
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 58,
          data: ['每日商户交易金额 (元)', '每日商户退款金额 (元)'],
          left: '1%',
          textStyle: {
            fontSize: '13rem',
            color: '#4D4F5C',
            fontFamily: 'Microsoft YaHei UI',
            fontWeight: 400
          }
        },
        grid: {
          top: 110,
          left: '1%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // 坐标轴两端留白 默认不留白
          boundaryGap: true,
          axisLine: {
            lineStyle: {
              fontSize: '13rem',
              fontFamily: 'DINPro',
              fontWeight: 400,
              color: '#EAF0F4',
              opacity: 1
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: '13rem',
              fontFamily: 'DINPro',
              fontWeight: 400,
              color: '#999999',
              opacity: 1
            }
            // interval: 0  // 强制X轴全部显示
          },
          data: this.sourceData.xias
        }],
        yAxis: [{
          type: 'value',
          name: '',
          // interval:100,
          axisTick: {
            show: true
          },
          axisLine: {
            show: true,
            lineStyle: {
              fontSize: '13rem',
              fontFamily: 'DINPro',
              fontWeight: 400,
              color: '#EAF0F4',
              opacity: 1
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: '13rem',
              fontFamily: 'DINPro',
              fontWeight: 400,
              color: '#999999',
              opacity: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            },
            show: false
          }
        },
          {
            type: 'value',
            name: '',
            interval:100,
            axisTick: {
              show: true
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#EAF0F4'
              }
            },
            axisLabel: {
              margin: 10,
              textStyle: {
                fontSize: '13rem',
                fontFamily: 'DINPro',
                fontWeight: 400,
                color: '#999999',
                opacity: 1
              }
            },
            splitLine: {
              lineStyle: {
                color: '#EAF0F4',
                show: true
              }
            }
          }
        ],
        series: [{
          name: '每日商户交易金额 (元)',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: '5rem',
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          itemStyle: {
            normal: {
              color: '#1F6BCF',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: '12rem'

            }
          },
          data: this.sourceData.deal
        },
          {
          name: '每日商户退款金额 (元)',
          type: 'bar',
          barWidth:'20rem',
          yAxisIndex: "1",
          lineStyle: {
          normal: {
            width: 1
          }
          },
          itemStyle: {
            normal: {
              color: '#EAF0F4',
              barBorderRadius: [20,20,0,0],
              label: {
                // 柱形数字是否显示
                show: false,
                position: 'inside',
                formatter (p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.sourceData.refund
        }
        ]
      })
    }
  }
}
</script>

<style lang="scss">
#line-marker {
  canvas {
    border-radius: 10rem;
    margin-top: 20rem !important;
  }
}
</style>
