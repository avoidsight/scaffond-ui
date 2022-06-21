<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="合同编号" prop="contractNo">
        <el-input
          v-model="queryParams.contractNo"
          placeholder="请输入合同编号"
          clearable
          size="small"
        />
      </el-form-item>
      <el-form-item label="按日期">
        <el-date-picker
          v-model="dateRange"
          size="small"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="按重量(吨)" prop="weight" label-width="80px">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入重量(吨)"
          clearable
          size="small"
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

    <!-- ecloudTable标准组件 -->
    <ecloud-table
      :tableData="reconciliationList"
      :columnConfig="columnConfig"
      :menuButtons="menuButtons"
      :operationButtons="operationButtons"
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
      <template #type="{ data }">
        {{ selectDictLabel(dict.type.contract_type, data.type) }}
      </template>
    </ecloud-table>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="85%"
      append-to-body
      destroy-on-close
      :close-on-click-modal="false"
      center
    >
      <RecSummary />
    </el-dialog>
  </div>
</template>

<script>
import {
  listReconciliation,
  getReconciliation,
  delReconciliation,
  addReconciliation,
  updateReconciliation,
} from "@/api/settlement/reconciliation";
import EcloudTable from "@/components/EcloudTable/ecloudTable";
import RecSummary from "./components/summary.vue";
export default {
  name: "Reconciliation",
  dicts: ["contract_type"],
  components: { EcloudTable, RecSummary },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      // 进度对账单表格数据
      reconciliationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //ecloudTable配置
      columnConfig: {
        tableHeader: [
          {
            label: "日期",
            align: "center",
            prop: "date",
            show_overflow_tooltip: true,
          },
          {
            label: "合同编号",
            width: "auto",
            align: "left",
            prop: "contractNo",
            show_overflow_tooltip: true,
          },
          {
            label: "合同类型",
            align: "center",
            prop: "type",
            type: "slot",
            slotName: "type",
            show_overflow_tooltip: true,
          },
          {
            label: "合同名称",
            align: "left",
            prop: "contractName",
            show_overflow_tooltip: true,
          },
          {
            label: "入库(kg)",
            align: "center",
            prop: "stockIn",
            show_overflow_tooltip: true,
          },
          {
            label: "出库(kg)",
            align: "center",
            prop: "stockOut",
            show_overflow_tooltip: true,
          },
          {
            label: "备注",
            align: "left",
            prop: "remark",
            show_overflow_tooltip: true,
          },
        ],
      },
      menuButtons: [
        {
          name: "plus",
          label: "汇总",
          type: "primary",
          //回调方法
          method: "handleAdd",
        },
        {
          name: "edit",
          label: "修改",
          type: "success",
          //回调方法
          method: "handleEdit",
        },
        {
          name: "delete",
          label: "删除",
          type: "danger",
          //回调方法
          method: "handleDelete",
        },
        {
          name: "download",
          label: "导出",
          type: "warning",
          method: "handleExport",
        },
      ],
      operationButtons: [
        {
          name: "edit",
          method: "handleEdit",
          label: "修改",
        },
        {
          name: "delete",
          label: "删除",
          method: "handleDelete",
        },
      ],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        contractNo: null,
        weight: null,
      },
      // // 表单参数
      // form: {},
      // // 表单校验
      // rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询进度对账单列表 */
    getList() {
      let tempData = {
        id: Math.random(),
        date: "2022-03-20",
        contractNo: "CGHT001",
        type: 0,
        contractName: "测试001",
        stockIn: 3,
        stockOut: 2,
        remark: "备注测试",
      };
      this.reconciliationList.push(tempData);
      this.loading = false;
      // listReconciliation(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
      //   this.reconciliationList = response.rows;
      //   this.queryParams.total = response.total;
      //   this.loading = false;
      // });
    },
    // ecloutTable
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.getList();
    },

    handleCurrentChange(val) {
      this.queryParams.pageNum = val;
      this.getList();
    },
    showSearchChanged(val) {
      this.showSearch = val;
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
    },
    /** 汇总按钮操作 */
    handleAdd() {
      this.open = true;
      this.title = "进度对账单汇总";
    },
    /** 修改按钮操作 */
    handleEdit(row) {
      debugger;
      // this.reset();
      const id = row ? row.id : this.ids;
      if (id.length == 0 || id.length >= 2) {
        this.$modal.msgWarning("请选择一条数据进行修改");
      } else {
        // getReconciliation(id).then((response) => {
        //   this.form = response.data;
        //   this.open = true;
        //   this.title = "修改承租人";
        // });
        this.open = true;
        this.title = "进度对账单汇总";
      }
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row ? row.id : this.ids;
      const alert = row
        ? '是否确认删除承租人名称为"' + row.companyName + '"的数据项？'
        : "是否确认删除所有勾选的的数据项？";
      this.$modal
        .confirm(alert)
        .then(function () {
          return delReconciliation(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "/business/reconciliation/export",
        {
          ...this.queryParams,
        },
        `reconciliation_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
