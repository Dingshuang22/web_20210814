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
  <div class="tags" v-if="nowActive.meta && nowActive.meta.title && nowActive.name !== 'Dashboard'">
    <svg-icon iconClass="location" className="tag"></svg-icon>
<!--    <i class="el-icon-delete-location"></i>-->
    <span>当前位置:</span>
    <span class="cursor tag-dashboard" @click="goToDashboard">首页</span>
    <span >
      <span>&nbsp;{{ separator }} &nbsp;</span>
      <span class="is-active">{{ nowActive.meta.title }}</span>
    </span>
  </div>
</template>

<script>
import { bus } from '@/utils/bus'
export default {
  name: 'Tags',
  props: {},
  components: {},
  data () {
    return {
      separator: '/',
      tagsList: [],
      nowActive: ''
    }
  },
  computed: {
    showTags () {
      return this.tagsList.length > 0
    }
  },
  watch: {
    $route (newValue, oldValue) {
      console.log(newValue)
      this.nowActive = newValue
      this.setTags(newValue)
    }
  },
  methods: {
    // 首页
    goToDashboard () {
      if (this.nowActive.name !== 'Dashboard') {
        this.$router.push({
          name: 'Dashboard'
        })
      }
    },
    isActive (path) {
      return path === this.$route.fullPath
    },
    // 关闭单个标签
    closeTags (index) {
      const delItem = this.tagsList.splice(index, 1)[0]
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1]
      if (item) {
        delItem.path === this.$route.fullPath && this.$router.push(item.path)
      } else {
        this.$router.push('/')
      }
    },
    // 关闭全部标签
    closeAll () {
      this.tagsList = []
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther () {
      const curItem = this.tagsList.filter((item) => {
        return item.path === this.$route.fullPath
      })
      this.tagsList = curItem
    },
    // 设置标签
    setTags (route) {
      const isExist = this.tagsList.some((item) => {
        // console.log('****')
        // console.log(route.fullPath)
        // console.log('目标' + item.path)
        // console.log(route.matched[route.matched.length - 1].components.default.name)
        return item.path === route.fullPath
      })
      if (!isExist) {
        if (this.tagsList.length >= 8) {
          this.tagsList.shift()
        }
        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[route.matched.length - 1].components.default.name
        })
      }
      bus.$emit('tags', this.tagsList)
    },
    handleTags (command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    }
  },
  created () {
    // console.log(this.$route);
    this.setTags(this.$route)
    // 监听关闭当前页面的标签页
    bus.$on('close_current_tags', () => {
      for (let i = 0, len = this.tagsList.length; i < len; i++) {
        const item = this.tagsList[i]
        if (item.path === this.$route.fullPath) {
          if (i < len - 1) {
            this.$router.push(this.tagsList[i + 1].path)
          } else if (i > 0) {
            this.$router.push(this.tagsList[i - 1].path)
          } else {
            this.$router.push('/')
          }
          this.tagsList.splice(i, 1)
          break
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.tags {
  position: relative;
  height: 40rem;
  line-height: 40rem;
  overflow: hidden;
  padding-left: 20rem;
  padding-right: 120rem;
  color: #999999;
  font-size: 14rem;
  .is-active {
    color: #1F6BCF;
    font-weight: bold;
  }
}
.tags ul {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.tags-li {
  float: left;
  margin: 3rem 5rem 2rem 3rem;
  border-radius: 3rem;
  font-size: 12rem;
  overflow: hidden;
  cursor: pointer;
  height: 23rem;
  line-height: 23rem;
  border: 1rem solid #e9eaec; /*no*/
  background: #fff;
  padding: 5rem 5rem 5rem 12rem;
  vertical-align: middle;
  color: #666;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}
.tags-li:not(.active):hover {
  //color: #f00;
}
.tags-li.active .tags-li-title[data-v-ea1081c4] {
  color: rgb(32, 160, 255);
}
.tags-li-title {
  float: left;
  max-width: 80rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5rem;
  color: #666;
}
.tags-li.active .tags-li-title {
  //background-color: #666;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  box-sizing: border-box;
  padding-top: 1rem;
  text-align: center;
  width: 110rem;
  height: 30rem;
  background: #fff;
  box-shadow: -3rem 0 15rem 3rem rgba(0, 0, 0, 0.1);
  z-index: 10;
}
.svg-icon-tag {
  font-size: 14rem;
}
</style>
