<template>
<!-- 出库单台账 -->  
  <div class="app-container">
       <div class="filter-container">
          <el-form
            :model="queryParams"
            ref="queryForm"
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
  </div>
</template>

<script>
import EcloudTable from "@/components/EcloudTable/ecloudTable"
import {getAccount} from "@/api/businessManage/stockIn";
//获取合同
import {listContract} from "@/api/contract/contract";
export default {
  name: "stockInAccount",
  dicts: ["contract_type"],
  components: {EcloudTable},
  data() {
    return {
      // 遮罩层
      loading: true,     
      tableData:[],
        columnConfig: {
            tableHeader: [
                {
                    width: "120",
                    label: "业务日期",
                    align: "center",
                    prop: "createTime",
                    show_overflow_tooltip: true,
                }, 
                {                    
                    label: "合同类型",
                    align: "center",
                    prop: "updateTime",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "合同编号",
                    align: "left",
                    prop: "contractType",
                    show_overflow_tooltip: true,
                    type: "slot",
                    slotName: "contractType",
                }, 
                {
                    
                    label: "名称",
                    align: "left",
                    prop: "origin",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "型号规格",
                    align: "center",
                    prop: "contractCode",
                    show_overflow_tooltip: true,
                },                 
                {
                    
                    label: "数量",
                    align: "left",
                    prop: "contractId",
                    show_overflow_tooltip: true,
                }, 
                 {                   
                    label: "单位",
                    align: "center",
                    prop: "contractId",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "单件重量(kg)",
                    align: "right",
                    prop: "actualWeight",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "重量(kg)",
                    align: "right",
                    prop: "operator",
                    show_overflow_tooltip: true,
                }, 
                 {                   
                    label: "流水单号",
                    align: "left",
                    prop: "remark",
                    show_overflow_tooltip: true,
                }, 
                  {                   
                    label: "业务单号",
                    align: "left",
                    prop: "remark",
                    show_overflow_tooltip: true,
                }, 
                  {                   
                    label: "车次",
                    align: "left",
                    prop: "remark",
                    show_overflow_tooltip: true,
                }, 
                  {                   
                    label: "所在地",
                    align: "left",
                    prop: "remark",
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
                    
        ],

        operationButtons:[
            
        ],
     // 选中数组
      
      showSearch: true, 
    
      dateRange:[],
      contractOptions:[],
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
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      //  fake
      getAccount(this.addDateRange(this.queryParams, this.dateRange)).then((res)=>{
        this.tableData = res.rows;
        this.loading = false;
      })      
    },
    //
    getContract() {
      //const form = this.newDialogForm;
      listContract().then(
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
  
   
  },
};
</script>
