<template>
  <div id="app">
    <transition name="fade" mode="out-in">
    <router-view v-if="isRouterAlive"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
    // 点击页面侧边栏重载功能的实现（该处提供了提供给后代组件的数据/方法）
    provide() {
        return{
            reload: this.reload
        }
    },
    data() {
        return{
            isRouterAlive: true
        }
    },
    methods: {
        //页面重新载入函数
        reload () {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true
            })
        }
    },
}
</script>

<!--<style>-->
<!--#app {-->
<!--  font-family: 'Avenir', Helvetica, Arial, sans-serif;-->
<!--  -webkit-font-smoothing: antialiased;-->
<!--  -moz-osx-font-smoothing: grayscale;-->
<!--  text-align: center;-->
<!--  color: #2c3e50;-->
<!--}-->
<!--</style>-->
<style lang="scss">
  body {
    margin: 0;
    padding: 0;
    font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  #app {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }

  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  .toolbar {
    background: #f2f2f2;
    padding: 10px;
    margin: 10px 0;
    .el-form-item {
      margin-bottom: 10px;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.2s ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
  </style>
