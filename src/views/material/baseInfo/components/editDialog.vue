<template  :loading="loading">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="编码">
                <el-input  v-model="form.code" placeholder="编码" >                 
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="大类" prop="name">
              <el-input  v-model="form.name" placeholder="大类" >                 
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="品名" prop="flag">             
                <el-select clearable v-model.lazy="form.flag" placeholder="品名" style="width:100%">
                  <el-option  v-for="dict in dict.type.material_type"
                            :key="dict.value"
                            :value="dict.value"
                            :label="dict.label">{{dict.label}}</el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主计量单位" prop="mUnit">
              <el-input v-model="form.mUnit" placeholder="主计量单位" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="辅助计量单位" prop="orderNum">
              <el-input v-model="form.aUnit" placeholder="辅助计量单位" />
            </el-form-item>
          </el-col>
          <el-col :span="24" label="备注">
            <el-form-item label="备注">
             <el-input v-model="form.remarks" 
                  type="textarea"
                  placeholder="请输入内容"
                  :rows="2"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" align="right"  class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </div>
</template>
<script>
import {getCategory,addCategory,updateCategory} from "@/api/material/category.js"
    export default {
        name: "baseInfo",
        dicts: ["material_type"],
        props: {
          editRowData: {
              type: Object,
          },
          //0新增，1编辑,2:查看
          editMode:{
              type:Number,
              default:0
          },
          id:{
             type:Number,
              default:-1
          }
        },
        data(){
            return{
              loading:false,
                 // 表单参数
              form: {
                code:"",
                name:"盘扣",
                flag:"",
                mUnit:"",
                aUnit:"",
                remarks:""
              },
              rules: {
                  type: [
                    {
                      required: true,
                      message: "0:采购,1:租赁,2:外借,3:寄存不能为空",
                      trigger: "change",
                    },
                  ],
              }
            }
        },
        created() {

        },
        methods:{
            submitForm(){
              this.loading = true;
              if(this.editMode == 0){
                //新增
                addCategory(this.form).then((res)=>{
                  this.$message.success(res.msg);
                  //waiting for interface
                  this.loading = false;
                   this.$emit("closeDialog")
                })
              }else{
                updateCategory(this.form).then((res)=>{
                  this.$message.success(res.msg);
                  //waiting for interface
                  this.loading = false;
                   this.$emit("closeDialog")
                })
              }              
            },
            cancel(){
                this.$emit("closeDialog")
            }
        },
        watch: {
          id: {
            handler(val) {
              if(val == -1){
                  this.form={
                  code:"",
                  name:"盘扣",
                  flag:"",
                  mUnit:"",
                  aUnit:"",
                  remarks:""
                }
              }else{
                /*this.loading = true;
                getCategory(val).then((res)=>{
                  this.loading = false;
                  this.form = res.data;
                  this.form.flag = res.data.flag+"";
                })*/
              }              
            },
          },
          editRowData:{
            handler(val) {
               this.form = val;
               this.form.flag = val.flag+"";
            },
            immediate: true,
          }         
        }
    
    }


</script>
