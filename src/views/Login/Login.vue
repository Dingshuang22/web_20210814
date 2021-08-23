/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-15 10:25
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div class="login-container">
    <div class="login-wrap">
      <div class="title-container tc">
        <h3 class="title-big">{{ loginTitle }}</h3>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
        @keydown.enter.native="handleLogin"
      >
        <div class="title-container tc">
          <h3 class="title-small">用户登录/SIGN IN</h3>
        </div>

        <el-form-item prop="username" style="margin-top:20rem">
        <span class="svg-container">
          <img src="../../assets/image/user2.png" alt="">
<!--          <svg-icon icon-class="user" />-->
        </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="请输入登录账号"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
          <span class="svg-container">
            <img src="../../assets/image/pw2.png" alt="">
          </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2"
              auto-complete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>
        <div class="login-btn cursor" v-loading="loading" @click="handleLogin">登录</div>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入账号'))
        return
      }

      if (value.length > 50) {
        callback(new Error('请填写登录账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.trim().length === 0) {
        callback(new Error('请输入密码'))
        return
      }

      if (value.length < 6 || value.length > 15) {
        callback(new Error('请输入大于等于6位小于等于15位的密码'))
      } else {
        callback()
      }
    }
    return {
      loginTitle: '轻车简从生活服务平台',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      srcCaptcha: ''
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }

    // this.getCaptcha()
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      console.log(this)
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          setTimeout(() => {
            this.$router.push({ path: '/' })
            console.log(this.loginForm)
            // 后台联调
            this.loading = false
          }, 800)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#FFF;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47rem;
    width: 85%;
    input {
      background: $cursor;
      border: 0rem;
      -webkit-appearance: none;
      border-radius: 0rem;
      padding: 12rem 5rem 12rem 15rem;
      color: #D7DAE2;
      height: 47rem;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0rem 1000rem $bg inset !important;
        -webkit-text-fill-color: #D7DAE2 !important;
      }
    }
  }

  .el-form-item {
    border: 1rem solid #D7DAE2; /*no*/
    background: #fff;
    border-radius: 5rem;
    color: #D7DAE2;
    margin-bottom: 20rem;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

//$bg:#FFF;
//$dark_gray:#FFF;
//$light_gray:#FFF;

.login-container {
  min-height: 100%;
  width: 100%;
  background-image: url('../../assets/image/bg1.png');
  background-repeat:no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;
  .login-wrap {
    width: 650rem;
    max-width: 100%;
    height: 580rem;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    .title-container {
      position: relative;
      .title-big {
        font-family: PingFang SC;
        font-size: 54rem;
        color: #FFF;
        margin: 0rem auto 40rem auto;
        text-align: center;
        font-weight: bold;
        text-space: 30;
        letter-spacing: 3rem;
      }
    }
    .login-form {
      width: 522rem;
      max-width: 100%;
      height: 470rem;
      padding:10rem 64rem 0;
      margin:0 auto;
      overflow: hidden;
      border-radius: 20rem; /*no*/
      border: 1rem solid #707070; /*no*/
      background-color: #fff;
      .title-container {
        position: relative;
        .title-small {
          font-family: Microsoft YaHei UI;
          font-size: 28rem;
          color: #1F6BCF;
          margin: 70rem auto 40rem auto;
          text-align: center;
          font-weight: bold;
        }
      }
    }
  }
  .tips {
    font-size: 14rem;
    color: #fff;
    margin-bottom: 10rem;

    span {
      &:first-of-type {
        margin-right: 16rem;
      }
    }
  }

  .svg-container {
    padding: 6rem 5rem 6rem 15rem;
    color: $dark_gray;
    vertical-align: middle;
    width: 30rem;
    display: inline-block;
    img {
      width: 20rem;
      height: 20rem;
    }
  }



  .show-pwd {
    position: absolute;
    right: 10rem;
    top: 7rem;
    font-size: 16rem;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6rem;
  }

  @media only screen and (max-width: 470rem) {
    .thirdparty-button {
      display: none;
    }
  }
}
.login-btn {
  width: 522rem;
  height: 60rem;
  line-height: 60rem;
  font-size: 16rem;
  background: linear-gradient(90deg, #1F6BCF 0%, #1766CE 100%);
  opacity: 1;
  border-radius: 30rem;
  text-align: center;
  color: #fff;
}
</style>
