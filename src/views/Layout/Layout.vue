/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-15 10:22
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar :menuList="items"></v-sidebar>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <div class="content">
        <v-tags></v-tags>
        <transition name="move" mode="out-in">
           <keep-alive>
              <router-view :key="$route.fullPath"/>
           </keep-alive>
        </transition>
        <el-backtop target=".content"></el-backtop>
      </div>
    </div>
  </div>
</template>

<script>
import {routes} from '@/router/child'
import vHead from '@/components/layout/Header.vue'
import vSidebar from '@/components/layout/SideBar.vue'
import vTags from '@/components/layout/Tags.vue'
import { bus } from '@/utils/bus'
export default {
  // 组件名称
  name: 'layout',
  data () {
    return {
      tagsList: [],
      collapse: false,
      items: routes
    }
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created () {
    bus.$on('collapse-content', msg => {
      this.collapse = msg
    })
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = []
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name)
      }
      this.tagsList = arr
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #EEF0F4;
}
.content-box {
  position: absolute;
  left: 240rem;
  right: 0;
  top: 70rem;
  bottom: 0;
  padding-bottom: 30rem;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
}

.content {
  width: auto;
  margin: 10rem 36rem 0 48rem;
//height: 100%;
  padding: 10rem;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content-collapse {
  left: 90rem;
}

.container {
  box-sizing: border-box;
  padding: 30rem 30rem 0;
  //height: calc(100vh - 120rem);
  background: #fff;
  //border: 1rem solid #ddd; /*no*/
  border-radius: 8rem;
  overflow-y: scroll;
}
.box-card {
  border: none;
  padding: 8rem 0;
  .el-input {
    width: 268rem;
    margin-bottom: 5rem;
  }
}

</style>
