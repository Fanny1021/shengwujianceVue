<template>
<div>
  <el-form :model="biology" :ref="biology" :rules="rules" class="table"
            name="form1">
    <el-row>
      <el-col :span="12">
        <el-form-item label="设备编码"  name="item11" property="biologyId">
          <el-input type="input" v-model="biology.biologyId" class="text" style="width: 70%"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备名称"  property="biologyName"  name="item3">
          <el-input type="input" v-model="biology.biologyName" class="text" style="width: 70%"></el-input>
        </el-form-item>
      </el-col>
      </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="设备类型"  name="item5">
          <el-select v-model="biology.biologyType" style="width: 70%">
            <el-option v-for="(item,i) in biologyTypeOption"
                       :key="i"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="设备状态"  name="item5">
          <el-select v-model="biology.status" style="width: 70%">
            <el-option v-for="(item,i) in biologyStatusOption"
                       :key="i"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22" style="align-items: center">
        <el-form-item style="text-align: center" >
          <el-button @click="save" class="button_2">保存</el-button>
          <el-button @click="cancel" class="button_2">取消</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
    import {isUserName} from '@/global/validate.js';
    export default {
        name: "Edit",
        data(){return{
            rules: {
                biologyId: [{required: true,message: '请输入侦测车编号', trigger: 'blur'},
                    {validator: isUserName, trigger: 'blur' }
                ],
                biologyName: [{required: true, message: '请输入侦测车名字', trigger: 'blur'},
                    {validator: isUserName, trigger: 'blur' }
                ],

            },
            biologyTypeOption:[{label:"类型1",value:"1"},{label:"类型2",value:"2"},{label:"类型3",value:"3"}],
            biologyStatusOption:[{label:"正常",value:"1"},{label:"异常",value:"2"}],
            dropActive:false,//按钮是否激活
            biology:{
                "id": "",
                "biologyId": "",
                "biologyName": "",
                "biologyType": "",
                "createTime": "",
                "updateTime": "",
                "configPath": "",
                "dataPath": "",
                "warningPath": "",
                "newmeasureTime": "",
                "ownerId": "",
                "status": "",
                "faultRate": ""
            }
        }

        },
        mounted:function () {
            if(this.$route.params.biologicId!=null)
              this.biology.biologyId= this.$route.params.biologicId;
           if(this.biology.biologyId!=null&&this.biology.biologyId!="")
              this.query();

        },
        inject: ['reload'],
        methods: {
            query:function (id) {

               this.$api.user.$getJson('sys/biology/info/{biologyId}',JSON.stringify(this.biology.biologyId)).then((resp)=>{
                    this.loading = false;
                    if (resp && resp.status == 200) {
                        //返回的json数据
                        let returnJson= resp.data;
                        this.$nextTick(()=>{
                           this.biology=returnJson.data.biology;
                        });
                    }
                });


            },
            cancel()
            {
                this.$router.push({ name: 'shengwujiancelist', params: {}});
            },
            save()
            {
                debugger
                if(this.biology.id="")//新增
                {
                    this.$api.user.$postJson("sys/biology/save",JSON.stringify(this.biology)).then((resp)=>{
                        this.loading = false;
                        if (resp && resp.status == 200) {
                            //返回的json数据
                            debugger
                            alert( resp.message);
                            this.cancel();
                        }
                    });
                }
                else //修改
                {
                    this.$api.user.$putJson("sys/biology/update",JSON.stringify(this.biology)).then((resp)=>{
                        this.loading = false;
                        if (resp && resp.status == 200) {
                            //返回的json数据
                            debugger
                            alert( resp.message);
                            this.cancel();
                        }
                    });
                }
            }

        }
    }
</script>

<style scoped>
  @import  "../../assets/css/styles.css";
  @import "../../assets/css/BaseStyle.css";
</style>
