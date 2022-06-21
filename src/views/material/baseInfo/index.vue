<template>
<!-- 材料基本信息管理 -->
  <div class="app-container">
       <ecloud-table
        :tableData="tableData"
        :columnConfig="columnConfig"
        :menuButtons="menuButtons"
        :operationButtons = "operationButtons"
        :showIndex="true"
        :page="queryParams"
        :loading="loading"
        :showSelection="true"
        :showSearch="showSearch"
        @changeSelectedRow="handleSelectionChange"
        @changeSize="handleSizeChange"
        @changeCurrentPage="handleCurrentChange"
         @queryTable="handleQuery"
        >
          <template #flag="{ data }">
            <span>{{
              selectDictLabel(dict.type.material_type, data.flag)
            }}</span>
          </template>
       </ecloud-table>
  
    <el-dialog
      :title="title"
      :visible.sync="opendDialog"
      width="600px"
      append-to-body
    >
      <editDialog 
        :editRowData = "editRowData"
        :id="rowId"
        :editMode="editMode"
        @closeDialog = "closeDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import EcloudTable from "@/components/EcloudTable/ecloudTable"
import editDialog from "./components/editDialog.vue"
import {listCategory,delCategory} from "@/api/material/category.js"
export default {
  name: "baseInfo",
  dicts: ["material_type"],
  components: {EcloudTable,editDialog},
  data() {
    return {
      // 遮罩层
      loading: true,
      selectVal:[],
      tableData:[],
      rowId:-1,
      //行信息
      editRowData:{},
        columnConfig: {
            tableHeader: [
                {
                    width: "180",
                    label: "编码",
                    align: "left",
                    prop: "code",
                    show_overflow_tooltip: true,
                }, 
                {
                    width: "180",
                    label: "大类",
                    align: "center",
                    prop: "name",
                    show_overflow_tooltip: true,
                }, 
                {
                  //0：其它，1:立杆，2：水平杆，3：脚手板 
                    width: "180",
                    label: "品名",
                    align: "center",
                    prop: "flag",
                    show_overflow_tooltip: true,
                    type:"slot",
                    slotName: "flag",
                },                 
                {                    
                    label: "主计量单位",
                    align: "center",
                    prop: "mUnit",
                    show_overflow_tooltip: true,
                }, 
                {
                    label: "辅计量单位",
                    align: "center",
                    prop: "aUnit",
                    show_overflow_tooltip: true,
                }, 
                {
                    width: "200",
                    label: "备注",
                    align: "left",
                    prop: "remarks",
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
              method: "doDelete",
              label: "删除",
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
  
      // 表单校验
      rules: {
        type: [
          {
            required: true,
            message: "0:采购,1:租赁,2:外借,3:寄存不能为空",
            trigger: "change",
          },
        ],
        contractName: [
          {
            required: true,
            message: "合同名称不能为空",
            trigger: "blur",
          },
        ],
        contractCode: [
          {
            required: true,
            message: "合同编码不能为空",
            trigger: "blur",
          },
        ],
        businessCode: [
          {
            required: true,
            message: "业务单号不能为空",
            trigger: "blur",
          },
        ],
        formCode: [
          {
            required: true,
            message: "表单编号不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    this.getList();    
  },
  methods: {
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      //  fake
      //debugger;
      listCategory().then((res)=>{
        //debugger;
        this.loading = false;
        this.tableData = res.rows;
        this.queryParams.total = res.total;
      })     
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

    doEdit(row){
      this.opendDialog = true;
      this.editRowData = row;
      //this.$nextTick(() => {
        this.rowId = row.id
     // })
      this.editMode = 1;
    },

    closeDialog(){
      this.opendDialog = false;
      this.getList();
    },
  
    // 表单重置
    reset() {
      this.form = {
       
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
   
    /** 新增按钮操作 */
    doAdd() {
      this.opendDialog = true;
      this.editMode = 0;
      this.$nextTick(() => {
        this.rowId = -1
      })
      this.title = "添加";
    },
  
    /** 删除按钮操作 */
    doDelete(row) {
      // const ids = row.id || this.ids;
      let ids;
      if(row && row.id){
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
          return delCategory(ids);
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
