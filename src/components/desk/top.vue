<template>
  <el-form >
  <div>
    <!-- Unnamed (矩形) -->
    <div id="u248" class="ax_default box_1">
      <div id="u248_div" class="">
        <div id="u249" class="ax_default _一级标题" data-label="主题">
          <div id="u249_div" class=""></div>
          <div id="u249_text" class="text ">
            <p><span>生物侦检车后台数据管理平台</span></p>
          </div>
          <!-- 搜索 (组合) -->
          <div id="u250" class="ax_default" data-label="搜索">
            <!-- Unnamed (图片) -->
            <div id="u251" class="ax_default image">
            <img id="u251_img" class="img " src="../../assets/css/images/u251.png"/>
            </div>
            <div id="u251_text">
            <p><span style="font-family:'PingFangSC-Regular', 'PingFang SC';">关键词：车辆</span><span style="font-family:'ArialMT', 'Arial';">001</span></p>
            </div>
          </div>
          <!-- Unnamed (图片) -->
          <div id="u254" class="ax_default image">
            <img id="u254_img" class="img " src="../../assets/css/images/u205.png"/>
            <!-- Unnamed (矩形) -->
            <div id="u255" class="ax_default _一级标题">
            <div id="u255_text" class="text ">
              <p><span>车辆A管理员</span></p>


            </div>
              <img id="u258_img" class="img " src="../../assets/css/images/u207.png"/>

          </div>
            <div id="u254_text" class="text ">
              <span style="cursor: pointer" @click="closeClick">退出</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  </div>
  </el-form>
</template>

<script>
    export default {
        name: "top",
        methods:{
            closeClick:function () {
if(confirm("确定退出系统?")){
this.$store.state.user=[];
this.$store.state.route=[];
this.$store.state.menu=[];
this.$api.user.$post("logout","").then(resp=> {{alert( resp.status)
    if (resp && resp.status != 200)
        this.$store.state.message("退出登录失败");
    }
    });

}
            }
        }

    }
</script>

<style scoped>
  @import '../../assets/css/page.css';
  @import '../../assets/css/styles.css';
  @import "../../assets/css/topstyle.css";
  @import "../../assets/css/Wstyles.css";
</style>
