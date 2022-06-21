<template>
<!-- 盘扣规格 -->  
  <div class="app-container">
       <div class="filter-container">
          <el-form
            :model="queryParams"
            ref="queryForm"
            :inline="true"
            v-show="showSearch"
            label-width="98px"
          >
            <el-form-item label="物料分类编号" prop="name">
              <el-input
                v-model="queryParams.name"
                placeholder="请输入物料分类编号"
                clearable
                @keyup.enter.native="handleQuery"
              />
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
       </ecloud-table>   

        <el-dialog
          :title="title"
          :visible.sync="opendDialog"
          width="600px"
          append-to-body
        >
          <editDialog 
          :editRowData = "editRowData"
          :editMode="editMode"
          @closeDialog = "closeDialog"
          />
        </el-dialog>
  </div>
</template>

<script>
import EcloudTable from "@/components/EcloudTable/ecloudTable"
import editDialog from "./components/editDialog.vue"
export default {
  name: "specfication",
  components: {EcloudTable,editDialog},
  data() {
    return {
      // 遮罩层
      loading: true,
      selectVal:[],
       editRowData:{},
      tableData:[],
        columnConfig: {
            tableHeader: [
                {
                    width: "120",
                    label: "物料分类编号",
                    align: "left",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {                    
                    label: "材料分类",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "规格类型",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {
                    
                    label: "型号",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                 {
                    
                    label: "直径",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                 {
                    
                    label: "厚度",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                 {
                    
                    label: "长度",
                    align: "right",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                 {                   
                    label: "材质",
                    align: "center",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "单件重量(kg)",
                    align: "right",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {                   
                    label: "打包数量",
                    align: "right",
                    prop: "code",
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
            }
        ],
     // 选中数组
      editMode: 0,
      // 显示搜索条件
      showSearch: true,      
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      opendDialog: false,
     
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: 0,   
      },      
    };
  },
  created() {
    this.getList();
  },
  methods: {
     closeDialog(){
      this.opendDialog = false;
    },
    /** 查询合同列表 */
    getList() {
      this.loading = false;
      //  fake
      this.tableData = [{
          code:"1234"
      }]
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
      this.opendDialog = true;
      this.editRowData = row;
      this.editMode = 1;
      this.title = "编辑";
    },

     /** 新增按钮操作 */
    doAdd() {
      this.opendDialog = true;
      this.editMode = 0;
      this.title = "添加";
    },
  
  
    /** 删除按钮操作 */
    doDelete(row) {
      // const ids = row.id || this.ids;
      // const alert = row.id
      //   ? '是否确认删除合同名称为"' + row.name + '"的数据项？'
      //   : "是否确认删除所有勾选的的数据项？";
      // this.$modal
      //   .confirm(alert)
      //   .then(function () {
      //     return delContract(ids);
      //   })
      //   .then(() => {
      //     this.getList();
      //     this.$modal.msgSuccess("删除成功");
      //   })
      //   .catch(() => {});
    },   
   
  },
};
</script>
