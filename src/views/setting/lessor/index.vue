<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="公司名称" prop="companyName">
        <el-input
          v-model="queryParams.companyName"
          placeholder="请输入公司名称"
          clearable
          size="small"
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

    <!-- ecloudTable标准组件 -->
    <ecloud-table
      :tableData="lessorList"
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
    </ecloud-table>
    <!-- 添加或修改生产商对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-form-item label="租赁公司名称" prop="companyName">
          <el-input v-model="form.companyName" placeholder="请输入公司名称" />
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="usc">
          <el-input v-model="form.usc" placeholder="请输入统一社会信用代码" />
        </el-form-item>
        <el-form-item label="公司地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入公司地址" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLessor,
  getLessor,
  delLessor,
  addLessor,
  updateLessor,
} from "@/api/setting/lessor";
import EcloudTable from "@/components/EcloudTable/ecloudTable";
export default {
  name: "Lessor",
  components: { EcloudTable },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 生产商表格数据
      lessorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      //ecloudTable配置
      columnConfig: {
        tableHeader: [
          {
            label: "租赁公司名称",
            align: "left",
            prop: "companyName",
            show_overflow_tooltip: true,
          },
          {
            label: "统一社会信用代码",
            width: "auto",
            align: "left",
            prop: "usc",
            show_overflow_tooltip: true,
          },
          {
            label: "公司地址",
            align: "left",
            prop: "address",
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
          label: "新增",
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
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        companyName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyName: [
          {
            required: true,
            message: "公司名称不能为空",
            trigger: "blur",
          },
        ],
        usc: [
          {
            required: true,
            message: "统一社会信用代码不能为空",
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
    /** 查询生产商列表 */
    getList() {
      this.loading = true;
      listLessor(this.queryParams).then((response) => {
        this.lessorList = response.rows;
        this.queryParams.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        companyName: null,
        usc: null,
        address: null,
        remark: null,
      };
      this.resetForm("form");
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加出租人";
    },
    /** 修改按钮操作 */
    handleEdit(row) {
      this.reset();
      const id = row ? row.id : this.ids;
      if (id.length == 0 || id.length >= 2) {
        this.$modal.msgWarning("请选择一条数据进行修改");
      } else {
        getLessor(id).then((response) => {
          this.form = response.data;
          this.open = true;
          this.title = "修改出租人";
        });
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateLessor(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLessor(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row ? row.id : this.ids;
      const alert = row
        ? '是否确认删除出租人名称为"' + row.companyName + '"的数据项？'
        : "是否确认删除所有勾选的的数据项？";
      this.$modal
        .confirm(alert)
        .then(function () {
          return delLessor(ids);
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
        "/business/lessor/export",
        {
          ...this.queryParams,
        },
        `lessor_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
