/**
* @Author: Alex-Shuang
* @createdTime: 2021-05-21 11:35
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <el-dialog
    v-el-drag-dialog
    :title="title"
    :close-on-click-modal="false"
    lock-scroll
    :visible="visible"
    @close="onCLoseDialog"
    :width="width"
  >
    <el-form
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      :label-width="formLabelWidth"
      :status-icon="false"
      :hide-required-asterisk="false"
      class="demo-ruleForm"
    >
      <span v-for="(item, idx) in form" :key="idx">
        <el-row v-if="item.types==='text'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
              <el-input :name="item.key" type="text" v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-if="item.types==='phone'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
              <el-input :name="item.key" type="tel" v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="item.types==='age'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
              <el-input :name="item.key" type="age" v-model.number="formData[item.key]" :placeholder="item.placeholder"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="item.types==='password'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key" class="position-relative">
<!--              <el-input name="password" ref="password" @blur="onFocusPwd"  id="password" autoComplete="off" type="text" v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>-->
              <el-input
                :key="passwordType"
                :ref="formData[item.key]"
                v-model="formData[item.key]"
                :type="passwordType"
                :placeholder="item.placeholder"
                name="password"
                tabindex="2"
                auto-complete="on"
              />
            <span class="show-pwd" @click="showPwd(formData[item.key])">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="item.types==='select'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
              <el-select
                v-model="formData[item.key]"
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
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="item.types==='daterange'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
               <el-date-picker
                 v-model="formData[item.key]"
                 type="daterange"
                 format="yyyy-MM-dd"
                 value-format="yyyy-MM-dd"
                 range-separator="至"
                 :start-placeholder="item.start_placeholder"
                 :end-placeholder="item.end_placeholder"
               >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row v-if="item.types==='datetimerange'">
          <el-col :span="22">
            <el-form-item :label="item.label+':'" :prop="item.key">
               <el-date-picker
                 v-model="formData[item.key]"
                 type="datetimerange"
                 format="yyyy-MM-dd HH:mm:ss"
                 value-format="yyyy-MM-dd HH:mm:ss"
                 range-separator="至"
                 :start-placeholder="item.start_placeholder"
                 :end-placeholder="item.end_placeholder"
                 :default-time="['00:00:00', '23:59:59']"
               >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </span>

    </el-form>
    <div slot="footer" class="dialog-footer txt-center">
      <el-button class="confirm-btn" type="primary" @click="onSubmit('ruleForm')">确 定</el-button>
      <el-button class="cancel-btn" @click="onCancel('ruleForm')">重 置</el-button>
    </div>
  </el-dialog>

</template>

<script>
import { bus } from '../utils/bus'

export default {
  name: 'mydialog',
  props: {
    title: {
      type: String,
      default: 'hello world'
    },
    dialogFormVisible: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '600rem'
    },
    form: {
      type: Array,
      default: () => []
    },
    formLabelWidth: {
      type: String,
      default: '180rem'
    },
    rules: {
      type: Object,
      default: () => {
      }
    }
  },
  components: {},
  data () {
    return {
      visible: false,
      formData: {},
      passwordType: 'password'
    }
  },
  computed: {

  },
  watch: {
    'dialogFormVisible': {
      handler (newVal, oldVal) {
        this.visible = newVal
        if (this.form) {
          let obj = {}
          console.log(this.form)
          this.form.forEach(item => {
            obj[item.key] = item.text
          })
          this.formData = Object.assign({}, obj)
          console.log(this.formData)
        }
      }
    }
  },
  created () {
    this.visible = this.dialogFormVisible
    let obj = {}
    console.log(this.form)
    this.form.forEach(item => {
      obj[item.key] = item.text
    })
    this.formData = Object.assign({}, obj)
    console.log(this.formData)
  },
  methods: {
    showPwd(ref) {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs[ref].focus()
      })
    },
    // 关闭弹框
    onCLoseDialog () {
      this.onCancel('ruleForm')
      this.$nextTick(() => {
        bus.$emit('closeDialog')
      })
    },
    // 提交
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.formData)
          bus.$emit('onSubmit', this.formData)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 取消
    onCancel (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
//对话框
/deep/ .el-dialog {
  padding: 20rem;
  border-radius: 10rem;
}
/deep/ .el-dialog__header {
  padding: 0;
  padding-left: 16rem;
  border-bottom: 1rem solid #D7DAE2;
  height: 40px;
  line-height: 20px;
  .el-dialog__title {
    display: inline-block;
  }
}
/deep/ .el-dialog--center {
  width: 482rem;
}
/deep/ .demo-ruleForm {
  max-height: 478rem !important;
  overflow-y: scroll;
  padding: 0 10rem 0 0;
}

/deep/ .el-dialog--center .el-dialog__body {
  text-align: initial;
  padding: 10rem 25rem 10rem;
}
/deep/ .el-dialog__body {
  padding: 30rem 25rem 0;
}
/deep/ .el-dialog--center .el-dialog__footer {
  padding: 0;
  background-color: #ddd;
  border-radius: 0 0 8rem 8rem;
  width: 100%;
  position: absolute;
  bottom: 0rem;
  left: 0rem;
}
/deep/ .el-input__suffix {
  color: #4bd863;
}
/deep/ .el-input__inner {
  height: 42rem;
  padding-right: 60rem;
  background: #fff;
  &:focus{
    background: #fff;
  }
}

/deep/ .el-date-editor {
  background: rgba(245, 245, 245, 1);
  .el-range-input {
    background: rgba(245, 245, 245, 1);
    &:focus{
      background: #fff;
    }
  }
}
.cancel-btn {
  width: 98rem;
  height: 42rem;
  background: #EAF0F4;
  opacity: 1;
  border-radius: 21rem;
  color: #222222;
}
.confirm-btn {
  width: 98rem;
  height: 42rem;
  background: #1F6BCF;
  opacity: 1;
  border-radius: 21rem;
  color: #FFF;
}
.show-pwd {
  position: absolute;
  right: 10rem;
  top: 7rem;
  font-size: 16rem;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
.dialog-footer {
  padding: 0;
  height: 10rem;
  line-height: 10rem;
}
</style>
