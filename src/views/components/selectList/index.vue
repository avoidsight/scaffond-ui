<template>
  <div class="selectList-body">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      label-width="68px"
      @submit.native.prevent
    >
      <el-form-item label="模糊搜索" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请搜索"
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
    <el-table
      v-loading="loading"
      :data="selectList"
      highlight-current-row
      @current-change="handleSelectionChange"
    >
      <el-table-column label="序号" width="55" type="index" align="center">
        <template slot-scope="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in columnConfig.tableHeader"
        :key="index"
        :label="item.label"
        :prop="item.prop"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      layout="total, prev, pager, next, jumper"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      style="margin-bottom: 10px"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listWarehouse } from "@/api/setting/warehouse";
import { listUser } from "@/api/system/user";
import { listManufacturer } from "@/api/setting/manufacturer";
import { listRental} from "@/api/setting/rental";
import { listLessee} from "@/api/setting/lessee";
export default {
  name: "selectList",
  props: {
    popoverType: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 总条数
      total: 0,
      // 表格数据
      selectList: [
        { id: 1, name: "test", code: "001", address: "测试" },
        { id: 2, name: "test", code: "001", address: "测试" },
      ],
      // 弹出层标题
      title: "",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        name: null,
      },
      columnConfig: {
        tableHeader: [],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询弹窗列表 */
    getList() {
      this.loading = false;
      this.columnConfig.tableHeader = [];
      this.selectList = [];
      switch (this.popoverType) {
        case "warehouse":
          this.getWarehouseList();
          break;
        case "operator":
          this.getUserList();
          break;
        case "manufacturer":
          this.getManufacturerList();
          break;
        case "rental":
          this.getRentalList();
          break;
        case "lessee":
          this.getLesseeList();
          break;
      }
    },
    /** 查询仓库管理列表 */
    getWarehouseList() {
      this.columnConfig.tableHeader = [
        {
          label: "仓库名称",
          prop: "name",
        },
        {
          label: "仓库编码",
          prop: "code",
        },
        {
          label: "仓库地址",
          prop: "address",
        },
      ];
      listWarehouse(this.queryParams).then((response) => {
        this.selectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询人员列表 */
    getUserList() {
      this.columnConfig.tableHeader = [
        {
          label: "用户编码",
          prop: "userName",
        },
        {
          label: "用户名称",
          prop: "nickName",
        },
        {
          label: "邮箱",
          prop: "email",
        },
      ];
      listUser(this.queryParams).then((response) => {
        this.selectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询生产商列表 */
    getManufacturerList() {
      this.columnConfig.tableHeader = [
        {
          label: "单位名称",
          prop: "name",
        },
        {
          label: "单位地址",
          prop: "address",
        },
        {
          label: "备注",
          prop: "remark",
        },
      ];
      listManufacturer(this.queryParams).then((response) => {
        this.selectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询租赁商列表 */
    getRentalList() {
      this.columnConfig.tableHeader = [
        {
          label: "单位名称",
          prop: "name",
        },
        {
          label: "单位地址",
          prop: "address",
        },
        {
          label: "备注",
          prop: "remark",
        },
      ];
      listRental(this.queryParams).then((response) => {
        this.selectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    /** 查询承租人列表 */
    getLesseeList() {
      this.columnConfig.tableHeader = [
        {
          label: "公司名称",
          prop: "companyName",
        },
        {
          label: "公司地址",
          prop: "address",
        },
        {
          label: "备注",
          prop: "remark",
        },
      ];
      listLessee(this.queryParams).then((response) => {
        this.selectList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
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
    // 单选数据
    handleSelectionChange(selection) {
      this.$emit("selected", selection, this.popoverType);
      document.body.click();
    },
  },
};
</script>

<style>
.selectList-body {
  width: 100%;
  padding: 10px;
  height: 400px;
  overflow: auto;
}
</style>