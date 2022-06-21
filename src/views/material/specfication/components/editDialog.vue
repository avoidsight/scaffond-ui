<template :loading="loading">
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="物料分类编码">
                <el-input  v-model="form.categoryCode" placeholder="物料分类编码" >                 
                </el-input>
            </el-form-item>
          </el-col>
          
          <el-col :span="12">
            <el-form-item label="规格类型">             
              <el-select clearable v-model="form.specsType" placeholder="规格类型" style="width:100%">
                <el-option  v-for="dict in dict.type.specs_type"
                          :key="dict.value"
                          :value="dict.value"
                          :label="dict.label">{{dict.label}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号" prop="specsName">
              <el-input v-model="form.specsName" placeholder="型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直径" >
              <el-input v-model="form.diameter" placeholder="直径" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="厚度">
            <el-form-item label="厚度" >
             <el-input v-model="form.thickness" placeholder="厚度" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="长度">
            <el-form-item label="长度" >
             <el-input v-model="form.lengths" placeholder="长度" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="材质">
            <el-form-item label="材质" >
             <el-input v-model="form.material" placeholder="材质"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="单位">
            <el-form-item label="单位">
             <el-input v-model="form.units" placeholder="单位"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="单件重量(kg)">
            <el-form-item label="单件重量(kg)" >
             <el-input v-model="form.singleWeight" placeholder="单件重量" oninput="value=value.replace(/^\.+|[^\d.]/g,'')"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="打包数量">
            <el-form-item label="打包数量" >
             <el-input v-model="form.packagesNumber" placeholder="打包数量"/>
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
    import {addSpecs,updateSpecs,getSpecs} from "@/api/material/specs.js"
    export default {
        name: "baseInfo",
        dicts: ["specs_type"],
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
            },           
        },
        data(){
          return{
            loading:false,
                // 表单参数
            form: {
              categoryCode:"",
              flag:"",
              specsName:"",
              diameter:0,
              lengths:0,
              thickness:0,
              material:"",
              units:"",
              singleWeight:0,
              packagesNumber:0,
              id:-1
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
          //console.log("dict.type.specs_type",dict.type.specs_type);
        },
        methods:{
            submitForm(){
              if(this.editMode == 0){
                addSpecs(this.form).then((res)=>{
                  //waiting for interface
                  this.$emit("closeDialog")
                })
              }else{
                updateSpecs(this.form).then((res)=>{
                  //waiting for interface
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
              //debugger;
              if(val == -1){
                this.form={
                  categoryCode:"",
                  flag:0,
                  specsName:"",
                  diameter:0,
                  thickness:0,
                  material:"",
                  units:"",
                  singleWeight:0,
                  packagesNumber:0,
                  id:-1
                }
              }else{
               /* this.loading = true;
                getSpecs(val).then((res)=>{
                  this.loading = false;
                  this.form = res.data;
                  this.form.specsType = res.data.specsType+"";
                  //this.form.flag = res.data.flag+"";
                })*/
              }              
            },
          },
          editRowData:{
            handler(val) {
               this.form = val;
               this.form.specsType = val.specsType+"";
            },
            immediate: true,
          } 
        }
    
    }


</script>
