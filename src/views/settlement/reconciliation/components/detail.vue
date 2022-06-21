<template>
  <div class="modal">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-row :gutter="2">
        <el-col :span="6">
          <el-form-item label="合同名称" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同编号" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="出租方" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="承租方" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目编号" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="租赁期" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上传附件" prop="code">
            <el-input v-model="form.code" placeholder="请输入合同编码" />
          </el-form-item>
        </el-col>
      </el-row>
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
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleTab">
      <el-tab-pane label="新增供货量" name="first"></el-tab-pane>
      <el-tab-pane label="内退场量" name="second"></el-tab-pane>
      <el-tab-pane label="其他费用" name="third"></el-tab-pane>
    </el-tabs>

    <el-form
      :model="queryParams"
      ref="infoForm"
      style="padding-bottom: 15px"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-row :gutter="2">
        <el-col :span="3">
          <span style="color: red">制单人：</span>
          <span style="color: red">测试</span>
        </el-col>
        <el-col :span="3">
          <span style="color: red">审核人：</span>
          <span style="color: red">测试</span>
        </el-col>
        <el-col :span="3">
          <span style="color: red">出租经办人：</span>
          <span style="color: red">测试</span>
        </el-col>
        <el-col :span="3">
          <span style="color: red">承租经办人：</span>
          <span style="color: red">测试</span>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary">创 建</el-button>
      <el-button>取 消</el-button>
    </div>
  </div>
</template>

<script>
import { addReconciliation } from "@/api/settlement/reconciliation";
export default {
  name: "RecDetail",
  dicts: ["contract_type"],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 显示搜索条件
      showSearch: true,
      // 进度对账单表格数据
      recSummaryList: [],
      // 弹出层标题

      title: "",
      // 是否显示弹出层
      open: false,
      //tab页签
      activeName: "first",
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        code: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询进度对账单列表 */
    getList() {
      let tempData = {
        id: 1,
        date: "2022-03-20",
        code: "test",
        remark: "备注测试",
      };
      this.recSummaryList.push(tempData);
      this.loading = false;
      // listReconciliation(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
      //   this.reconciliationList = response.rows;
      //   this.queryParams.total = response.total;
      //   this.loading = false;
      // });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    //页签切换
    handleTab() {},
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
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加承租人";
    },
    /** 修改按钮操作 */
    handleEdit(row) {
      this.reset();
      const id = row ? row.id : this.ids;
      if (id.length == 0 || id.length >= 2) {
        this.$modal.msgWarning("请选择一条数据进行修改");
      } else {
        getReconciliation(id).then((response) => {
          this.form = response.data;
          this.open = true;
          this.title = "修改承租人";
        });
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateReconciliation(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReconciliation(this.form).then((response) => {
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
