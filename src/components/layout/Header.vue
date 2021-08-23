/**
* @Author: Alex-Shuang
* @createdTime: 2021-05-21 10:09
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div class="header" :class="{'header-collapse': collapse}">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <svg-icon icon-class="lock" class="lock-screen" @click="onLockScreen"></svg-icon>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userInfo.userName}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changepassword">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="avatar" />
        </div>
      </div>
    </div>
    <my-dialog
      :title="dialogTitle"
      :dialogFormVisible="dialogFormVisible"
      :form="dialogForm"
      :rules="dialogFormRules"
    />
  </div>
</template>

<script>
import {bus} from '@/utils/bus'
import { mapGetters } from 'vuex'
export default {
  name: 'Header',
  props: {},
  components: {},
  data () {
    return {
      avatar: require('@/assets/image/d11.png'),
      collapse: false,
      fullscreen: false,
      name: 'Alex',
      dialogTitle: '修改密码',
      dialogFormVisible: false,
      dialogForm: [
        {
          types: 'password',
          label: '请输入旧密码',
          key: 'oldPw',
          placeholder: '请输入旧密码',
          text: ''
        },
        {
          types: 'password',
          label: '请输入新密码',
          key: 'newPw',
          placeholder: '请输入新密码',
          text: ''
        },
        {
          types: 'password',
          label: '请确认新密码',
          key: 'newPwd',
          placeholder: '请确认新密码',
          text: ''
        }
      ],
      dialogFormRules: {
        oldPw: [
          { required: true, message: '请输入旧密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        newPw: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请再次输入新密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    username () {
      let username = 'Alex'
      return username || this.name
    }
  },
  watch: {},
  mounted () {

  },
  created () {
    // 关闭修改密码
    bus.$off('closeDialog')
    bus.$on('closeDialog', () => {
      this.dialogFormVisible = false
    })
    // 修改密码
    bus.$off('onSubmit')
    bus.$on('onSubmit', (data) => {
      console.log(data)
      console.log(this)
      console.log(this.dialogFormVisible)
      // this.dialogFormVisible = false
    })
  },
  methods: {
    // 锁屏状态
    onLockScreen () {
      this.$router.push({
        name: 'LockScreen'
      })
    },
    //  折叠按钮
    collapseChage () {
      this.collapse = !this.collapse
      bus.$emit('collapse', this.collapse)
    },
    // 用户名下拉菜单选择事件
    handleCommand (command) {
      if (command === 'loginout') {
        this.$router.push('/login')
      } else if (command === 'changepassword') {
        this.dialogFormVisible = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  box-sizing: border-box;
  left: 240rem;
  width: calc(100% - 240rem);
  //height: 162rem;
  font-size: 56rem;
  color: #000;
  background-color: #fff;
}
.header-collapse {
  left: 60rem;
  width: calc(100% - 60rem);
}


.collapse-btn {
  font-size: 32rem;
  float: left;
  padding: 0 40rem;
  cursor: pointer;
  line-height: 70rem;
}
.header .logo {
  //width: 136rem;
  font-size: 22rem;
  border-bottom: 1rem solid #ddd; /*no*/
  text-align: center;
  float: left;
  line-height: 70rem;
}
.header-right {
  float: right;
  padding-right: 50rem;
}
.header-user-con {
  display: flex;
  height: 70rem;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5rem;
  font-size: 24rem;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30rem;
  height: 30rem;
  text-align: center;
  border-radius: 15rem;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2rem;
  width: 8rem;
  height: 8rem;
  border-radius: 4rem;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10rem;
}
.lock-screen {
  width: 40rem !important;
  height: 40rem !important;
}
.user-avator {
  margin-left: 20rem;
}
.user-avator img {
  display: block;
  width: 40rem;
  height: 40rem;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #000;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
