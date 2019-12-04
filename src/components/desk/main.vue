<template>
  <el-row class="container">
    <el-col :span="24" class="header" style=" font-style:normal;font-size:40px;">
      <span >生物侦检车后台数据管理平台</span>
      <el-col :span="8">

        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>

      <el-col :span="7" class="userinfo">
        <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner">
                        你好：管理员
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a href="#/">首页</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="">修改密码</a>
            </el-dropdown-item>
            <el-dropdown-item @click.native="">
              注销登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu background-color="#545c64" text-color="#fff"
                 active-text-color="#ffd04b"
                 @select="handleselect"
                 v-bind:style=" collapsed ? {} : { 'width': '230px' } "
                 :default-active="$route.path"
                 class="el-menu-vertical-demo"
                 unique-opened
                 router
                 v-show="!collapsed">
          <template v-for="(item,index) in menuData " v-if="!item.hidden">
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path" :key="index">
              <i :class="item.iconCls"></i>{{item.children[0].name}}
            </el-menu-item>
                        <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">
                <i :class="item.iconCls"></i>{{item.title}}
              </template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                {{child.title}}
              </el-menu-item>
            </el-submenu>
          </template>

        </el-menu>
</aside>
<section class="content-container">
  <div class="grid-content bg-purple-light">
    <el-col :span="24" class="breadcrumb-container">
      <strong class="title">{{$route.name}}</strong>
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>
    <el-col :span="24" class="content-wrapper">
      <transition name="fade" mode="out-in">
       <router-view name="mainArea" key="content"></router-view>
<!--        <router-view ></router-view> //by fan 2019.11.28 [1]-->
      </transition>
    </el-col>
  </div>
</section>
</el-col>

</el-row>


</template>

<script>
    let initMenu = function() {
        for(let i in this.$router.options.routes) {
            let root = this.$router.options.routes[i]
            if(root.hidden)
                continue
            let children = []
            for(let j in root.children) {
                let item = root.children[j]
                if(item.hidden)
                    continue
                children.push(item)
            }

            if(children.length < 1)
                continue
            this.menuData.push(root)
            root.children = children
        }
    }
    export default {
        data() {
            return {
               collapsed: false,
                menuData: [
                                  ],
            }
        },
        inject: ['reload'],
        methods: {
            handleselect: function (a, b) {
                this.reload()  // 点击侧边栏重新载入页面
            },
            //退出
            logout() {
                this.$confirm('确认要退出吗？','提示',{}).then(() => {
                    this.$api.user.$getJson('logout').then((res) =>{
                        if(res.errCode == 200) {
                            //this.delCookie('session');
                           // this.delCookie('u_uuid');
                            this.$router.push({path: '/', query: {redirect: this.$router.currentRoute.fullPath}});
                        } else {
                            console.log(res.errMsg);
                        }
                    });
                }).catch(() => {
                });
            },
             initMenu: initMenu,
            //折叠导航栏
            collapse: function() {
                this.collapsed = !this.collapsed;
            },
            showMenu: function(i, status) {
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
        },
        mounted:
            function() {
                this.initMenu()

            },


    }
</script>

<style scoped="scoped" lang="scss">
  .container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .header {
      height: 100px;
      line-height: 100px;
      background: #545c64;
      color: #fff;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        height: 100px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }

      .tools {
        padding: 0 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 100px;
      bottom: 0;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        /*侧边菜单*/
        .el-menu {
          height: 100%;
          background-color: #545c64;
          /*选中列*/
          .el-menu-item {
            background-color: #545c64;
          }
          .el-submenu__title {
            i {
              color: #fff;
            }
          }
        }
        overflow-y: auto !important;
      }
      .el-menu-collapsed li:hover {
        background-color: #434a50;
      }
      /*当前选中菜单*/
      .is-opened {
        color: #fff;
        background-color: #fff;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      background-color: #d3d7d4;
      .breadcrumb-container {
        display: none;
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          float: right;
        }
      }
      .content-wrapper {
        box-sizing: border-box;
      }
    }
  }
  </style>
