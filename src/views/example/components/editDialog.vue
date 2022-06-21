<template>
    <div>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="物料分类编码">
                <el-input  v-model="form.icon" placeholder="物料分类编码" >                 
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="材料分类" prop="menuType">
              <el-select clearable v-model="form.category" placeholder="材料分类" style="width:100%">
					<el-option v-for="item in 24" :key="item" :value="item-1">{{item-1}}</el-option>
				</el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="规格类型" prop="icon">             
                <el-input  v-model="form.icon" placeholder="规格类型" >                 
                </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号" prop="menuName">
              <el-input v-model="form.menuName" placeholder="型号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="直径" prop="orderNum">
              <el-select clearable v-model="form.category" placeholder="直径" style="width:100%">
				    	  <el-option v-for="item in 24" :key="item" :value="item-1">{{item-1}}</el-option>
				      </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="厚度">
            <el-form-item label="厚度">
             <el-input v-model="form.orderNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="长度">
            <el-form-item label="长度">
             <el-input v-model="form.orderNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="材质">
            <el-form-item label="材质">
             <el-input v-model="form.orderNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="单件重量(kg)">
            <el-form-item label="单件重量">
             <el-input v-model="form.orderNum"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" label="打包数量">
            <el-form-item label="打包数量">
             <el-input v-model="form.orderNum"/>
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
    export default {
        name: "baseInfo",
        props: {
            editRowData: {
                type: Object,
            },
             //0新增，1编辑,2:查看
            editMode:{
                type:Number,
                default:0
            }
        },
        data(){
            return{
                 // 表单参数
                form: {},

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
                //waiting for interface
                this.$emit("closeDialog")
            },
            cancel(){
                this.$emit("closeDialog")
            }
        },
        watch: {

        }
    
    }


</script>
