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
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          >修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          >删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          >导出
        </el-button>
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="contractList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" width="55" type="index" align="center">
        <template slot-scope="scope">
          <span>{{
            (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="合同编码"
        align="center"
        prop="contractCode"
        show-overflow-tooltip
      />
      <el-table-column
        label="合同名称"
        align="center"
        prop="contractName"
        show-overflow-tooltip
      />
      <el-table-column
        label="表单编号"
        align="center"
        prop="formCode"
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
        label="创建日期"
        align="center"
        prop="createTime"
        width="100"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="经办人"
        align="center"
        prop="operator"
        show-overflow-tooltip
      />
      <el-table-column
        label="备注"
        align="center"
        prop="remark"
        show-overflow-tooltip
      />
      <el-table-column
        label="操作"
        align="center"
        width="180"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改
          </el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 添加或修改合同对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
      :before-close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="auto">
        <el-row :gutter="30">
          <el-col :span="12">
            <el-form-item label="合同类型">
              <el-select
                v-model="form.type"
                style="width: 100%"
                disabled
                placeholder="请选择"
              >
                <el-option
                  v-for="dict in dict.type.contract_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="合同附件">
              <FileUpload
                :isButton="!form.resources"
                :isShowTip="false"
                @input="setResources"
                :value="form.resources"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同名称" prop="contractName">
              <el-input
                v-model="form.contractName"
                placeholder="请输入合同名称"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="仓库名称" prop="warehouseId">
              <el-popover
                placement="top-start"
                width="auto"
                style="height: 200px; overflow: auto"
                trigger="click"
              >
                <select-list
                  ref="warehouseSelect"
                  @selected="selected"
                  popoverType="warehouse"
                />
                <el-input
                  slot="reference"
                  v-model="form.warehouseName"
                  placeholder="点击选择仓库"
                  readonly
                >
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外借入库时间" prop="inTime">
              <el-date-picker
                clearable
                size="small"
                v-model="form.inTime"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择外借入库时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外借出库时间" prop="outTime">
              <el-date-picker
                clearable
                size="small"
                v-model="form.outTime"
                type="date"
                style="width: 100%"
                value-format="yyyy-MM-dd"
                placeholder="选择外借出库时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-card v-show="subOpen">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="合同编码" prop="contractCode">
                <el-input
                  v-model="form.contractCode"
                  placeholder="请输入合同编码"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="业务单号" prop="businessCode">
                <el-input
                  v-model="form.businessCode"
                  placeholder="请输入业务单号"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="表单编号" prop="formCode">
                <span slot="label">
                  <span style="color: red">表单编号</span>
                </span>
                <el-input
                  v-model="form.formCode"
                  placeholder="请输入表单编号"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="供货单位" prop="customerId">
                <el-popover
                  placement="top-start"
                  width="auto"
                  style="height: 200px; overflow: auto"
                  trigger="click"
                >
                  <select-list
                    ref="rentalSelect"
                    @selected="selected"
                    popoverType="rental"
                  />
                  <el-input
                    slot="reference"
                    v-model="form.customerName"
                    placeholder="点击选择租赁商名录的单位"
                    readonly
                  >
                  </el-input>
                </el-popover>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="开始日期" prop="startTime">
                <el-date-picker
                  clearable
                  size="small"
                  v-model="form.startTime"
                  type="date"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                  placeholder="选择开始日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="结束日期" prop="endTime">
                <el-date-picker
                  clearable
                  size="small"
                  v-model="form.endTime"
                  type="date"
                  style="width: 100%"
                  value-format="yyyy-MM-dd"
                  placeholder="选择结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="仓库地址" prop="address">
                <el-input v-model="form.address" placeholder="请输入内容" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系人" prop="linkMan">
                <el-input v-model="form.linkMan" placeholder="请输入联系人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" prop="linkPhone">
                <el-input
                  v-model="form.linkPhone"
                  placeholder="请输入联系电话"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="经办人" prop="operator">
                <el-input v-model="form.operator" placeholder="请输入经办人" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="计费模板" prop="templateId">
                <el-input
                  v-model="form.templateId"
                  placeholder="//TODO暂未对接接口"
                  disabled
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="form.remark"
                  type="textarea"
                  placeholder="请输入内容"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-card>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-show="!subOpen" type="primary" @click="handleCreate"
          >创 建</el-button
        >
        <el-button v-show="subOpen" type="primary" @click="submitForm"
          >确 定</el-button
        >
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listContract,
  getContract,
  delContract,
  addContract,
  updateContract,
} from "@/api/contract/contract";
import selectList from "@/views/components/selectList";
import FileUpload from "@/components/FileUpload";
export default {
  name: "Lending",
  dicts: ["contract_type"],
  components: { selectList, FileUpload },
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
      // 总条数
      total: 0,
      // 合同表格数据
      contractList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出子层
      subOpen: false,
      //子组件传参
      popoverType: "",
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        type: 2,
        contractName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        type: [
          {
            required: true,
            message: "不能为空",
            trigger: "change",
          },
        ],
        warehouseId: [
          {
            required: true,
            message: "仓库名称不能为空",
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
        formCode: [
          {
            required: true,
            message: "表单编号不能为空",
            trigger: "blur",
          },
        ],
        customerId: [
          {
            required: true,
            message: "供货单位不能为空",
            trigger: "change",
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
        type: "2",
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加合同";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getContract(id).then((response) => {
        this.form = response.data;
        this.form.type = String(this.form.type);
        this.open = true;
        this.subOpen = true;
        this.title = "修改合同";
      });
    },
    /** 创建合同 */
    handleCreate() {
      this.subOpen = true;
      this.form.formCode = "CG-" + new Date().getTime();
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateContract(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addContract(this.form).then((response) => {
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
      const ids = row.id || this.ids;
      const alert = row.id
        ? '是否确认删除合同名称为"' + row.contractName + '"的数据项？'
        : "是否确认删除所有勾选的的数据项？";
      this.$modal
        .confirm(alert)
        .then(function () {
          return delContract(ids);
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
        "/business/Contract/export",
        {
          ...this.queryParams,
        },
        `Contract${new Date().getTime()}.xlsx`
      );
    },
    //附件回写
    setResources(fileList) {
      this.form.resources = fileList;
    },
    //popover组件回写
    selected(selection, component) {
      switch (component) {
        case "warehouse":
          this.form.warehouseName = selection.name;
          this.form.warehouseId = selection.id;
          this.form.address = selection.address;
          break;
        case "rental":
          this.form.customerName = selection.name;
          this.form.customerId = selection.id;
          break;
      }
    },
  },
};
</script>
