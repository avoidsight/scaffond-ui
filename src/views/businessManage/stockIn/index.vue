<template>
<!-- 入库单 -->  
  <div class="app-container">
       <div class="filter-container">
          <el-form
            :model="queryParams"
            ref="queryForm"
            label-position="left"
            :inline="true"
            v-show="showSearch"
            label-width="auto"
          >
            <el-form-item label="日期" prop="name">
               <el-date-picker
                v-model="dateRange"
                style="width: 240px"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="合同类型" prop="name">
                <el-select clearable v-model="queryParams.contractType" placeholder="合同类型" style="width:100%">
                  <el-option  v-for="dict in dict.type.contract_type"
                            :key="dict.value"
                            :value="dict.value"
                            :label="dict.label">{{dict.label}}</el-option>
                </el-select>
            </el-form-item>
             <el-form-item label="模糊查询" prop="name">
                <el-input  v-model="queryParams.name" placeholder="模糊查询" >                 
                </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                size="mini"
                @click="handleQuery"
                >搜索</el-button
              >
              <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
                >重置</el-button
              >

              <el-button icon="el-icon-download" size="mini" @click="resetQuery"
                >导出</el-button
              >
            </el-form-item>
          </el-form>
       </div>
       <ecloud-table
        :tableData="tableData"
        :columnConfig="columnConfig"
        :menuButtons="menuButtons"
        :operationButtons = "operationButtons"
        :showIndex="true"
        :page="queryParams"
        :loading="loading"
        :showSelection="true"
        @showSearchChanged="showSearchChanged"
        @changeSelectedRow="handleSelectionChange"
        @changeSize="handleSizeChange"
        @changeCurrentPage="handleCurrentChange"
        @queryTable="handleQuery"
        >
          <template #contractType="{ data }">
            <!-- <a href="#" v-if="data.stockType === 0">租赁</a>
            <a href="#" v-else-if="data.stockType === 1">外借</a>
            <a href="#" v-else-if="data.stockType === 2">寄存</a>
            <a href="#" v-else-if="data.stockType === 3">采购</a>
            <a href="#" v-else-if="data.stockType === 4">报废</a> -->
            {{
              selectDictLabel(dict.type.contract_type, data.stockType)
            }}
          </template>
       </ecloud-table>

       <el-dialog 
        title="新建入库单"
        :visible.sync="openNewDialog"
            append-to-body
       >
        <el-row :gutter="1">
           <el-form
            :model="newDialogForm"
            :rules="rules"
            ref="newDialogForm"
            :inline="true"
            v-if="showSearch"
            label-width="auto"
          >
              <el-col :span="24">
                <el-form-item label="合同类型" prop="type">
                  <el-select clearable v-model="newDialogForm.type" @change="onContractTypeChange" placeholder="合同类型" style="width:100%" >
                    <el-option  v-for="dict in dict.type.contract_type"
                              :key="dict.value"
                              :value="dict.value"
                              :label="dict.label">{{dict.label}}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="合同名称" prop="contractId">
                  <el-select :disabled="newDialogForm.type==''" clearable v-model="newDialogForm.contractId" placeholder="合同名称" style="width:100%" @change="selectContract">
                     <el-option  v-for="dict in contractOptions"
                        :key="dict.contractCode"
                        :value="dict.contractCode"
                        :label="dict.contractName">{{dict.contractName}}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>              
           </el-form>
        </el-row>
        <div slot="footer" align="right"  class="dialog-footer">
          <el-button type="primary" @click="createDialog">创 建</el-button>
        </div>
       </el-dialog>

        <el-dialog
          :title="title"
          :visible.sync="openDialog"
          width="95%"      
          append-to-body
          destroy-on-close
        >
          <editDialog
            ref="editDialog"
            style="height:calc(100vh - 215px);"      
            :editMode = "editMode"
            @closeDialog = "closeDialog"
          />
        </el-dialog>
  </div>
</template>

<script>
import EcloudTable from "@/components/EcloudTable/ecloudTable"
import editDialog from "../components/editDialog.vue"
import {listInventory,getInventory,addInventory,updateInventory,delInventory} from "@/api/businessManage/stockIn";
//获取合同
import {listContract} from "@/api/contract/contract";
export default {
  name: "stockIn",
  dicts: ["contract_type"],
  components: {EcloudTable,editDialog},
  data() {
    return {
      // 遮罩层
      loading: true,
      selectVal:[],
      rules: {
        type: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
         contractId: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
      tableData:[],
        columnConfig: {
            tableHeader: [
                {
                    width: "120",
                    label: "制单日期",
                    align: "center",
                    prop: "createTime",
                    show_overflow_tooltip: true,
                }, 
                {                    
                    label: "业务日期",
                    align: "center",
                    prop: "updateTime",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "合同类型",
                    align: "center",
                    prop: "contractType",
                    show_overflow_tooltip: true,
                    type: "slot",
                    slotName: "contractType",
                }, 
                {
                    
                    label: "供货单位",
                    align: "left",
                    prop: "origin",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "合同编号",
                    align: "left",
                    prop: "contractCode",
                    show_overflow_tooltip: true,
                }, 
                 {
                    
                    label: "合同名称",
                    align: "left",
                    prop: "contractName",
                    show_overflow_tooltip: true,
                }, 
                 {
                    
                    label: "流水单号",
                    align: "left",
                    prop: "contractId",
                    show_overflow_tooltip: true,
                }, 
                 {                   
                    label: "业务单号",
                    align: "left",
                    prop: "contractId",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "总重(kg)",
                    align: "right",
                    prop: "actualWeight",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "经办人",
                    align: "left",
                    prop: "operator",
                    show_overflow_tooltip: true,
                }, 
                 {                   
                    label: "备注",
                    align: "left",
                    prop: "remark",
                    show_overflow_tooltip: true,
                }, 
            ]
        },

        menuButtons: [
          {
              name: "plus",
              label: "新增",
              type: "primary",
              //回调方法
              method: "doAdd",
          },
          {
              name: "delete",
              label: "删除",
              type: "danger",
              //回调方法
              method: "doDelete",
          }               
        ],

        operationButtons:[
            {
                name: "edit",
                method: "doEdit",
                label: "编辑",
            },
            {
                name: "delete",
                label: "删除",
                //回调方法
                method: "doDelete",
            }       
        ],
     // 选中数组
      editMode: 0,
      // 显示搜索条件
      showSearch: true, 
      //
      selectedObj:{},
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      openDialog: false,
      openNewDialog:false,
      dateRange:[],
      contractOptions:[],
      newDialogForm:{
         type:"",
         contractId:""
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        content:"",
        contractType:"",
        stockType:0,//入库
        pageSize: 10,
        total:0
      },
    };
  },
  created() {
    this.getList();
    this.getContract();
  },
  methods: {    
    onContractTypeChange(val){
      if(val==""){
        this.newDialogForm.contractId="";
      }
      this.getContract();
    },
    selectContract(id){
      //console.log("select中对应value值",id)
      let selected = {};
      selected = this.contractOptions.find((item)=>{
        //这里的chargingWorkNameList就是上面遍历的数据源
        
          return item.contractCode === id;
          //筛选出匹配数据，是对应数据的整个对象
      });
      this.selectedObj = selected;
    },
    closeDialog(){
      this.openDialog = false;
    },
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      //  fake
      listInventory(this.addDateRange(this.queryParams, this.dateRange)).then((res)=>{
        this.tableData = res.rows;
        this.loading = false;
      })      
    },
    //
    getContract() {
      const form = this.newDialogForm;
      listContract(form).then(
        (response) => {
          this.contractOptions = response.rows;
        }
      );
    },
    //page相关
    handleSizeChange(val) {
        this.queryParams.pageSize = val;
        this.getList();
    },

    handleCurrentChange(val) {
        this.queryParams.currentPage = val;
        this.queryParams.pageIndex = val;
        this.getList();
    },
    handleSelectionChange(selection){
        this.selectVal = selection;            
    },

    showSearchChanged(val ){
      this.showSearch = val;
    },   
   
    // 表单重置
    reset() {
      this.form = {
       
      };
      //this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      //this.resetForm("queryForm");
      this.handleQuery();
    }, 

    /** 编辑按钮操作 */
    doEdit(row){
      this.openDialog = true;
      this.editMode = 1;
      //更新editdialog 信息
      this.$nextTick(() => {
        this.$refs.editDialog.updateForm(row);
      })
      this.title = "编辑";
    },

     /** 新增按钮操作 */
    doAdd() {
      this.openNewDialog = true;
    },
    createDialog(){     
      const type = this.newDialogForm.type;
      if(type==""){
        this.$message({ message: '请选择合同类型', type: 'warning' })
        return 
      }else if(this.newDialogForm.contractId == ""){
        this.$message({ message: '请选择合同', type: 'warning' })
        return 
      }
      let subTitle = '';
      this.dict.type.contract_type.forEach(item=>{
        if(item.value == type){
          subTitle = item.label;
        }
      })

      this.openNewDialog = false;
      this.openDialog = true;
      this.$nextTick(() => {
        this.$refs.editDialog.updateForm(this.selectedObj);
      })
      this.editMode = 0;

      this.title = subTitle+"入库单";

      this.newDialogForm={};
    },
  
    /** 删除按钮操作 */
    doDelete(row) {
      // const ids = row.id || this.ids;
      let ids;
      if(row.id){
        ids = row.id;
      }else{
        ids="";
        this.selectVal.forEach(item=>{
          ids+=item.id+",";
        })
      }
       const alert = 
      //   ? '是否确认删除合同名称为"' + row.name + '"的数据项？'
         "是否确认删除当前数据项？";
      this.$modal
        .confirm(alert)
        .then(function () {
          return delInventory(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },   
   
  },
};
</script>
