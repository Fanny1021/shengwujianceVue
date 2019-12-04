
<style>
  @import '../assets/css/page.css';
  @import '../assets/css/styles.css';
  @import "../assets/css/Wstyles.css";

</style>
<template>
  <el-form :model="user" :rules="rules"  ref="user" visible.sync="messageVisible"  v-loading="loading" >
  <div id="base">

    <!-- Unnamed (矩形) -->
    <div id="u217" class="ax_default box_1">
      <div id="u217_div" class="">
        <!-- Unnamed (矩形) -->
        <div id="u218" class="ax_default _一级标题" style="">
          <div id="u218_text" class="text " >
            <p ><span>生物侦检车系统平台</span></p>
          </div>
          <div id="u219" class="ax_default"  style="left: 0px;top: 0px " >
          <!-- Unnamed (矩形) -->
          <div id="u220_div"  v-bind:style="{leftLocation}">

            <div id="u220"  class="ax_default box_1">
              <!-- Unnamed (矩形) -->
              <div id="u221" class="ax_default label">
                <div id="u221_div" class=""></div>
                <div id="u221_text" class="text ">
                  <p><span>用户名</span></p>
                </div>
              </div>

              <!-- Unnamed (文本框) -->
              <div id="u222" class="ax_default text_field">
                <el-form-item prop="account">
                  <el-input id="u222_input" type="text" v-model.String="user.loginName" @focus="resetInput(this)" />
                </el-form-item>
              </div>

              <!-- Unnamed (矩形) -->
              <div id="u223" class="ax_default label">
                <div id="u223_div" class=""></div>
                <div id="u223_text" class="text ">
                  <p><span>密&nbsp;&nbsp; 码</span></p>
                </div>
              </div>



              <!-- Unnamed (文本框) -->
              <div id="u225" class="ax_default text_field">
                <el-form-item property="checkPass">
                  <el-input id="u225_input" type="password"  v-model.String="user.password" />
                </el-form-item>
              </div>

              <!-- Unnamed (矩形) -->
              <div id="u226" class="ax_default label">
                <div id="u226_div" class=""></div>
                <div id="u226_text" class="text ">
                  <p><span>忘记密码</span></p>
                </div>
              </div>

              <!-- Unnamed (矩形) -->
              <div id="u227" class="ax_default label">
                <div id="u227_div" class=""></div>
                <div id="u227_text" class="text ">
                  <p><span>记住密码</span></p>
                </div>
              </div>

              <!-- Unnamed (图片) -->
              <div id="u228" class="ax_default checkbox">
                <el-checkbox class="login_remember" v-model="checked"
                             style="width: 30px;height: 30px;"          label-position="left"></el-checkbox>
              </div>
              <!-- Unnamed (矩形) -->
              <div id="u224" class="ax_default primary_button">
                <div id="u224_div" class=""></div>
                <div id="u224_text" class="text ">
                  <p><span style="cursor: pointer;" @click="submitClick()">登陆</span></p>
                </div>
              </div>

            </div>

          </div>




          </div>
        </div>
      </div>

    </div>



    <!-- Unnamed (组合) -->

  </div>
  </el-form>
</template>

<script>
    import {isUserName} from '../global/validate.js';
    export default {
        name:"Login",
        data(){
            return {
                rules: {
                    account: [{required: true,message: '请输入用户名', trigger: 'blur'},
                        {validator: isUserName, trigger: 'blur' }
                    ],
                    checkPass: [{required: true, message: '请输入密码', trigger: 'blur'},
                        {validator: isUserName, trigger: 'blur' }
                    ]
                },
                checked: true,
                leftLocation:{'left':(Math.ceil(document.body.clientWidth/2)-300)},
                user: {
                        loginName: String("admin"),
                        password: String("123456")
                },
                loading: false

            }
        },
        watch: {

            messageVisible: function (val,oldVla) {debugger
alert(this.$refs['user'] );
                if (this.$refs['user'] != undefined) {

                    this.$refs["user"].resetFields();

                }

            }

        },
        methods: {
            submitClick: function () {
                var _this = this;
                // alert(Math.ceil(document.body.clientWidth/2)-300);
               // this.loading = true;
                let jsondata=('{"userName":"'+this.user.loginName+'","userPassWord":"'+this.user.password+'"}');
                this.$api.user.$postExUrl('sys/user/logIn',jsondata).then(resp=> {
                    _this.loading = false;
                    if (resp && resp.status == 200) {
                        //返回的json数据
                        var data = resp.data;
                        alert(data);
                        let returnJson= JSON.parse(data);
                        if(returnJson.code=='0')//验证通过
                        {
                            let userd=returnJson.data.user;
                            let localData=JSON.stringify({"name":userd.name,"username":userd.loginName,"roles":userd.roles});
                            //验证通过，存本地变量
                            _this.$store.commit('login', localData);
                            //跳转到菜单页面
                            _this.$store.initMenu(this.$store.state,"");
                        }
                        else
                        {
                            var path = _this.$route.query.redirect;
                            _this.$router()
                                .replace({path: path == '/' || path == undefined ? '/Login' : path});
                        }
                        var path = _this.$route.query.redirect;
                        _this.$router()
                            .replace({path: path == '/' || path == undefined ? '/Login' : path});
                    }
                });
            },
            resetInput:function(obj){


        }

    }
    }
</script>

<style scoped>

</style>
