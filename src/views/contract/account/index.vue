<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="auto"
    >
      <el-form-item label="选择日期">
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
      <el-form-item label="合同类型" prop="type">
        <el-radio-group v-model="queryParams.type">
          <el-radio
            v-for="dict in dict.type.contract_type"
            :key="dict.value"
            :label="dict.value"
            >{{ dict.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="合同名称" prop="contractName">
        <el-input
          v-model="queryParams.contractName"
          placeholder="请输入合同名称"
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
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出
        </el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="contractList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" width="55" type="index" align="center">
        <template slot-scope="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="所在单位" align="center" prop="deptName" /> -->
      <el-table-column label="合同类型" align="center" prop="type">
        <template slot-scope="scope">
          <span>{{
            selectDictLabel(dict.type.contract_type, scope.row.type)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同名称"
        align="center"
        prop="contractName"
        show-overflow-tooltip
      />
      <el-table-column
        label="流水编码"
        align="center"
        prop="formCode"
        show-overflow-tooltip
      />
      <el-table-column
        label="合同编码"
        align="center"
        prop="contractCode"
        show-overflow-tooltip
      />
      <!-- <el-table-column label="合同金额" align="center" prop="" /> -->
      <el-table-column
        label="项目名称"
        align="center"
        prop="projectName"
        show-overflow-tooltip
      />
      <el-table-column
        label="开始日期"
        align="center"
        prop="startTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束日期"
        align="center"
        prop="endTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地址"
        align="center"
        prop="address"
        show-overflow-tooltip
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        show-overflow-tooltip
      />
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listContract, getContract } from "@/api/contract/contract";
export default {
  name: "Account",
  dicts: ["contract_type"],
  data() {
    return {
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 合同表格数据
      contractList: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: "",
        contractName: null,
        // warehouseId: null,
        // projectId: null,
        // inTime: null,
        // outTime: null,
        // resources: null,
        // contractCode: null,
        // businessCode: null,
        // formCode: null,
        // deptId: null,
        // customerId: null,
        // startTime: null,
        // endTime: null,
        // address: null,
        // linkMan: null,
        // linkPhone: null,
        // operator: null,
        // templateId: null,
        // isDeleted: null,
      },
      // 表单参数
      form: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询合同列表 */
    getList() {
      this.loading = true;
      listContract(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.contractList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.subOpen = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        type: "",
        contractName: null,
        warehouseName: null,
        warehouseId: null,
        projectId: null,
        inTime: null,
        outTime: null,
        resources: null,
        contractCode: null,
        businessCode: null,
        formCode: null,
        deptId: null,
        customerName: null,
        customerId: null,
        startTime: null,
        endTime: null,
        address: null,
        linkMan: null,
        linkPhone: null,
        operator: null,
        templateId: null,
        remark: null,
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
      this.dateRange = [];
      this.queryParams.type = "";
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "/business/Contract/export",
        {
          ...this.queryParams,
        },
        `Contract${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
