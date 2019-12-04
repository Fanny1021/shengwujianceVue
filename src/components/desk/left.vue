<template>
  <div>
    <aside :class="collapsed?'menu-collapsed' : 'menu-expanded'">
      <!--展开折叠开关-->
      <div class="menu-toggle" @click.prevent="collapse">
        <i class="iconfont icon-menufold" v-show="!collapsed"></i>
        <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
      </div>

      <!--菜单展开时的显示情况-->
      <el-menu v-show="!collapsed" default-active="0" @open="handleOpen" @close="handleClose" router>
        <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
          <el-submenu v-if="!item.leaf" :index="index+''">
            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
            <el-menu-item v-for="term in item.children" :key="term.path" :index="term.path" v-if="term.menuShow">
              {{term.name}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else-if="item.leaf&&item.children&&item.children.length" :index="item.children[0].path" class="el-submenu__title">
            <i :class="item.iconCls"></i>{{item.children[0].name}}
          </el-menu-item>
        </template>
      </el-menu>
      <!--菜单折叠后的显示情况
这里需要说明一下： $router.options.routes，其实就是从路由获取菜单数据，具体往下面看。这是重点，要不然你都不知道数据从哪里过来的。其实这里的数据可以做到数据库中，然后直接从数据库中获取。
-->
      <ul v-show="collapsed" class="el-menu collapsed" ref="menuCollapsed" >
        <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
          <li v-if="!item.leaf" :index="index+''" style="position: relative;">
            <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
              <li v-for="term in item.children" :key="term.path" v-if="term.menuShow" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==term.path?'is-active':''"
                  @click="$router.push(term.path)">{{term.name}}</li>
            </ul>
          </li>
          <li v-else-if="item.leaf&&item.children&&item.children.length" class="el-menu-item el-submenu__title" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">
            <i :class="item.iconCls"></i>
          </li>
        </template>
      </ul>

    </aside>
  </div>
</template>
  // <!-- 导航按钮组合 (组合) -->
  // <div id="u259" class="ax_default" data-label="导航按钮组合" selectiongroup="侧栏导航" data-left="1" data-top="136" >
  //
  //   <!-- 首页 (矩形) -->
  //   <div class="u260_divselected"  data-label="首页" selectiongroup="侧栏导航"  @mouseover="firstPageActived($event)" @mouseleave="firstPageUnActived($event)">
  //    <div class="u260_div"></div>
  //     <div class="u260_text" >
  //       <span style="cursor: pointer" @click="openRightFrame('about:blank')">系统首页</span>
  //     </div>
  //   </div>
  //   <!-- 首页 (矩形) -->
  //   <div class="u260_divselected"  data-label="首页" selectiongroup="侧栏导航"  @mouseover="firstPageActived($event)" @mouseleave="firstPageUnActived($event)">
  //     <div class="u260_div"></div>
  //     <div class="u260_text" >
  //       <span style="cursor: pointer" @click="openRightFrame('/shengwujiance')">生物监测</span>
  //     </div>
  //   </div>
  //
  // </div>

<script>
  import * as menu from "../../store/index"
  import  * as menu1 from "../../global/menu"
    export default {
        name: "left",
//         data(){
//           return{
//               firstPageActive:true,
//               shengwucheActive:false,
// }
//         },
        mounted:function () {
//this.openRightFrame("about:blank");
        },
        methods:{
// openRightFrame:function (RightURL) {
//     //window.parent.main.cols = "170,*,7";
//     if (RightURL != "about:blank") RightURL = RightURL + (RightURL.indexOf("?") == -1 ? "?" : "&") + "width=" + screen.width + "&height=" + screen.height;
//    alert(window.parent.rightFrame);
//     if (window.parent.rightFrame != null) window.parent.rightFrame.location.href = RightURL;
//
// },
            handleOpen() {
            },
            handleClose() {
            },
            //折叠导航栏
            collapse: function () {
                this.collapsed = !this.collapsed;
            },
            showMenu(i, status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            firstPageActived:function ($event) {
                $event.currentTarget.className = "u260_divselected";

            },
            firstPageUnActived:function ($event) {
                $event.currentTarget.className = "u260";

            },
        }

    }
</script>

<style scoped>
  @import '../../assets/css/page.css';
  @import '../../assets/css/styles.css';
  @import "../../assets/css/leftstyle.css";
  @import "../../assets/css/Wstyles.css";
</style>
