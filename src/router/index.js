import Vue from 'vue'
import Router from 'vue-router'
import Mainframe from '../components/desk/main'
import Login from "../components/Login";
import Top from "../components/desk/top"
import Left from "../components/desk/left"
import ShengwuJiance from '../components/shengwujiance/shengwujianceList'
import ShengWuEdit from "../components/shengwujiance/Edit"
import login from '../components/Login'
import fa from "element-ui/src/locale/lang/fa";

Vue.use(Router)

const router=new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '主页',
      hidden: true,
      component: Mainframe
    },
    {
      path: '/shengwujiance',
      name: 'shengwujiance',
      title:'生物检测',
      hidden:false,   // 控制导航菜单的显示与否 by fan 2019.11.28 [3]
      leaf: false, //只有一个节点
      iconCls: 'fa fa-address-card',
      component: Mainframe ,
      children: [
        {
          path:'/shengwujiance/list',   //这里initmenu直接把url取值进行传递，这里的嵌套路由就不起作用了
          components:{mainArea:ShengwuJiance} ,
          name: 'shengwujiancelist',
          title:'生物检测',
          meta:{requireAuth: true },

        },
        {
          path:'/shengwujiance/edit:',   //这里initmenu直接把url取值进行传递，这里的嵌套路由就不起作用了
          components:{mainArea:ShengWuEdit} ,
          hidden:true,
          name: 'shengwujianceedit',
          title:'生物检测',
          meta:{requireAuth: true },
        }
      ]
    }

    // {
    //   path: '/desk/top',
    //   name: '顶部',
    //   hidden:true,
    //   component:Top,
    //   redirect: '/Login',
    //   leaf: true, //只有一个节点
    //   menuShow: true,
    //   iconCls: 'iconfont icon-home', //图标样式
    //   children: [
    //     {path:'/home', component: ShengwuJiance, name: '首页', menuShow: true, meta:{requireAuth: true }}
    //   ]
    // },
    // {
    //   path: '/desk/left',
    //   name: '菜单页',
    //   hidden:true,
    //   component:Left
    //
    // },

  ],

})
export default router
