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
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#031525"
      text-color="#f1f1f1"
      active-text-color="#FFF"
      unique-opened
      router
      v-if="menuList"
    >
      <template>
        <el-menu-item
          index='/dashboard'
          key='dashboard'
          class="fs-22"
        >
          <svg-icon icon-class="logo"></svg-icon>
          <span slot="title">我的网</span>
        </el-menu-item>
      </template>
      <MenuTree :menuList="menuList"></MenuTree>
    </el-menu>
  </div>
</template>
<script>
import {bus} from '@/utils/bus';
import MenuTree from "./MenuTree";
export default {
  name:'Menus',
  components: {
    MenuTree,
  },
  data () {
    return {
      collapse: false,
    }
  },
  computed: {
    onRoutes () {
      console.log(this.$route.path)
      return this.$route.path
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', (msg) => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  },
  mounted () {
  },
  props:{
    menuList: {
      type: Array,
      required: true
    }
  },
  methods: {
    goToDashboard () {
      this.$router.push({
        name: 'Dashboard'
      })
    }
  }
}
</script>
<style scoped>
.sidebar {
  height: 100%;
}
.el-menu-item {
  height: 70rem;
  line-height: 70rem;
  opacity: 0.32;
  text-align: center;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 240rem;
}
.sidebar > ul {
  height: 100%;
}
.logo-title {
  width: 100%;
  height: 70rem;
  line-height: 70rem;
  background: #061C3A;
  color: #FFF;
  font-family: PingFang SC;
  font-size: 20rem;
  font-weight: bold;
  text-algin: center;
  opacity: 0.87;
}
</style>
