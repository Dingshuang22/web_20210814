/**
* @Author: Alex-Shuang
* @createdTime: 2021-06-19 12:25
* @description:
* @version：v1.0
* @Modify record：
* @Modify content：
* @Modifier：
* @Change the time：
*/
<template>
  <fragment>

    <template v-for='(menu, idx) in menuList'>
      <!-- 如果当前有子菜单，则显示 el-submenu ，在el-subment 里调用 递归组件 -->
      <el-submenu
        v-if='menu.children && menu.children.length>0'
        :index="menu.route"
        :key="idx"
      >
        <template slot="title" >
          <svg-icon :icon-class="menu.meta.icon" />
          <span slot="title">{{menu.meta.title}}</span>
        </template>
        <!-- 调用自身  此处是重点-->
        <MenuTree :menuList='menu.children'></MenuTree>
      </el-submenu>
      <!-- 如果没有子菜单，则显示当前内容 -->
      <template v-else>
        <el-menu-item
          :index='menu.route'
          :key='idx'
        >
          <svg-icon :icon-class="menu.meta.icon" />
          <span slot="title">{{menu.meta.title}}</span>
        </el-menu-item>
      </template>
    </template>
  </fragment>
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    menuList: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      active: false,
      select: false,
      isBlur:false
    }
  },
  methods: {
    bingIcon (icon) {
      // icon = icon || "sjfwgl";
      return require(`../../assets/image/${icon}.png`);
    }
  }
}
</script>

<style lang="scss" scoped>
/*  子菜单背景颜色*/
  //.el-menu-item {
  //  background-color: #F00  !important;
  //}
.el-menu-item {
  font-size: 16rem;
  height: 48rem;
  line-height: 48rem;
  opacity: 0.32;
}
.el-menu-item:hover{
  outline: 0 !important;
  color: #FFF !important;
  background: #1F6BCF !important;
  opacity: 1;
}
.el-menu-item.is-active {
  color: #fff !important;
  background: #1F6BCF !important;
  opacity: 1;
}

/deep/ .el-submenu__title {
  font-size: 16rem;
  color: #fff;
  opacity: 0.3;
}
/deep/ .el-submenu__title:focus, /deep/ .el-submenu__title:hover{
  outline: 0 !important;
  background: #1F6BCF !important;
  background: none !important;
  opacity: 1;
}
/deep/ .el-submenu__title.is-active {
  background: #1F6BCF !important;
  opacity: 1;
}
</style>
