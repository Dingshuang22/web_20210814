/**
* @Author: Alex-Shuang
* @createdTime: 2021-08-22 18:30
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div class="base-dialog">
    <el-dialog
      v-el-drag-dialog
      :title="title"
      :visible.sync="visible"
      :width="width"
      :append-to-body="appendToBody"
      :close-on-click-modal="false"
    >
      <slot></slot>
      <div slot="footer" v-if="isShowFooter">
        <el-button @click="visible = false">{{cancel_name}}</el-button>
        <el-button
          type="primary"
          @click="confirmBtn"
        >{{confirm_name}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'BaseDialog',
  props:{
    title: { // 标题
      type: String,
      default: '提示'
    },
    isShow: { // 弹窗是否展示
      type: Boolean,
      default: false
    },
    width:{ //弹窗宽度
      type: String,
      default: ''
    },
    cancel_name:{ //取消按钮名称
      type: String,
      default: '取 消'
    },
    confirm_name:{ //确定按钮名称
      type: String,
      default: '确 定'
    },
    isShowFooter:{ //是否自定底部
      type: Boolean,
      default: true
    },
    appendToBody: { // 是否将自身插入至 body 元素，有嵌套的弹窗时一定要设置
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  computed: {
    visible: {
      get(){
        return this.isShow
      },
      set(val){
        this.$emit("update:isShow", false)
      }
    }
  },

  methods: {
    confirmBtn(){ // 触发保存
      this.$emit('handleClick')
    },
  },
  created() {},
  mounted() {},
};

</script>

<style scoped lang="scss">
 /deep/ .el-dialog{
  .el-dialog__header{
    box-shadow: 0px 0px 5px 0px rgba(136, 152, 157, 0.3);
    border-radius: 6px 6px 0px 0px;
    padding: 20px 20px 18px 25px;
    .el-dialog__title{
      color: #212121;
      font-weight: 600;
    }
  }
  .el-dialog__body{
    padding-left: 25px;
  }
}
</style>
