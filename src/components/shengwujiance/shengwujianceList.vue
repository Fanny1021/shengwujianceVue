<template>

  <div>
    <el-form :model="keyword" ref="keyword">
    <el-row>
      <el-col :span="5">
        <el-form-item label="设备型号：" style="text-align: left">
      <el-input id="biologicType" v-model="keyword.biologicType" type="input" style="width: 150px"  class="text"> </el-input>
        </el-form-item>
      </el-col>
      <el-col span="5">
        <el-form-item label="设备名称：">
        <el-input id="biologicName" v-model="keyword.biologicName" type="input"  style="width: 150px"  class="text"> </el-input>
        </el-form-item>
      </el-col>
      <el-col span="8">
        <el-form-item>
          <el-button id="find"  @click="query">查询</el-button>
        <el-button id="add"  @click="add">添加</el-button>
        </el-form-item>
      </el-col>

    </el-row>
    <el-row>
      <el-col :span="24">
<el-table    :data="records"    :row-style="tableRowStyle"    :header-cell-style="tableHeaderColor" style="min-width: 100%">

  1<el-table-column      property="id"      label="biologicId"      min-width="10%"  v-if="show" >    </el-table-column>
  <el-table-column      property="biologicId"      label="biologicId"      min-width="10%"  v-if="show" >    </el-table-column>
  <el-table-column      property="biologicNo"      label="设备编号"      min-width="10%">    </el-table-column>
  <el-table-column      property="biologicName"      label="设备名称"      min-width="15%">    </el-table-column>
  <el-table-column      property="biologicMsg"      label="设备配置信息"      min-width="15%">    </el-table-column>
  <el-table-column      property="biologicType"      label="设备型号"      min-width="10%">    </el-table-column>
  <el-table-column      property="biologicStatus"      label="设备状态"      min-width="15%">    </el-table-column>
  <el-table-column      property="newsResult"      label="最新测量结果"      min-width="10%">    </el-table-column>
  <el-table-column      property="fault"      label="故障率"      min-width="10%">    </el-table-column>
  <el-table-column            label="操作"      min-width="15%">
    <template slot-scope="scope">
    <span  @click="editRowClick(scope.$index,scope.row)" style="cursor: pointer" @mouseover="onMouseOver($event)" @mouseleave="onMouseLeave($event)">&nbsp;修改配置&nbsp;</span>
     <span  @click="deleteRowClick(scope.$index,scope.row)" style="cursor: pointer" @mouseover="onMouseOver($event)" @mouseleave="onMouseLeave($event)">&nbsp;移除&nbsp;</span>
    </template>
  </el-table-column>
</el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item style="text-align: center" >
     <span>总记录：<label  v-text="total"/>&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <label  v-text="current" /><span>/</span><label v-text="pages"/>
        <el-button-group>
          <el-button  type="primary" icon="el-icon-arrow-left" :disabled="first">首页</el-button>
          <el-button  type="primary" icon="el-icon-arrow-left" :disabled="pre">上一页</el-button>
          <el-button  type="primary" :disabled="next">下一页<i class="el-icon-arrow-right el-icon--right" ></i></el-button>
          <el-button  type="primary" :disabled="last">尾页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        </el-form-item>
      </el-col>
    </el-row>
    </el-form>
  </div>

</template>

<script>
  import * as general from "../../global/general_api"
    export default {
        data(){
            return{
                records:[],
                total:0,
                size:0,
                current:0,
                pages:0,
                show:false,
                first:false,
                pre:false,
                next:false,
                last:false,
                keyword:{
                    biologicType:"",
                    biologicName:""
                },

            }
        },
        mounted:function () {
            this.query();

        },
        inject: ['reload'],
        methods: {



            query:function () {

                let jsondata=('{"carId":"","current":"'+this.current+'","size":"10","keyWord":"'+JSON.stringify(this.keyword)+'"}');

                this.$api.user.$getJson('sys/biology/list',jsondata).then((resp)=>{
                    this.loading = false;
                    if (resp && resp.status == 200) {
                        //返回的json数据
                        let returnJson= resp.data;
                        this.$nextTick(()=>{
                            this.total=returnJson.data.total;
                            this.pages=returnJson.data.pages;
                            this.records=returnJson.data.records;
                            //控制按钮显示
                            {}
                        });
                    }
                });


            },
            onMouseOver($event){
                general.onMouseOver($event);
            },
            onMouseLeave($event){
                general.onMouseLeave($event);
            },
            tableRowStyle({ row, rowIndex })
            {
                return general.tableRowStyle({ row, rowIndex })},
            tableHeaderColor({ row, column, rowIndex, columnIndex }) {
               return  general.tableHeaderColor({row, column, rowIndex, columnIndex})
            },
            deleteRowClick(index,row){
               this.$api.user.$deleteJson('sys/clear/'+row.biologicId,JSON.stringify(row.biologicId)).then((resp)=>{
                    this.loading = false;
                    if (resp && resp.status == 200) {
                        //返回的json数据
                        var data = resp.data;
                        let returnJson= resp.data;
                       if(returnJson.code==0)//删除成功,重新请求数据
                       {
                          this.reload();
                       }
                    }
                });
            },
            editRowClick(index,row){
                this.$router.push({ name: 'shengwujianceedit', params: { biologicId: row.biologicId }});
            },
            add(){
                this.$router.push({ name: 'shengwujianceedit'});
            }
        }

    }
</script>

<style scoped>
@import  "../../assets/css/styles.css";
@import "../../assets/css/BaseStyle.css";
</style>
