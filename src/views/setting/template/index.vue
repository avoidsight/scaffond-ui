<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="模板名称" prop="name">
        <el-select
          v-model="queryParams.name"
          placeholder="请选择模板"
          size="small"
          style="width: 90%"
          :disabled="editable"
          @change="getModule"
        >
          <el-option
            v-for="dict in moduleList"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8" v-show="!editable">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          >新增模板
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          @click="handleEdit"
          >修改模板
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="editable"
          @click="handleDelete"
          >删除模板
        </el-button>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="mb8" v-show="editable">
      <el-col :span="1.5">
        <el-button
          type="primary"
          icon="el-icon-check"
          size="mini"
          @click="handleSubmit"
          >提交
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          icon="el-icon-close"
          size="mini"
          @click="handleCancel"
          >取消
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button plain icon="el-icon-refresh" size="mini" @click="handleReset"
          >重置
        </el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="moduleData" :rules="rules">
      <el-table-column label="序号" width="55" type="index" align="center">
        <template slot-scope="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="品名" align="center" prop="name">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.name"
            placeholder="请输入品名"
            clearable
            v-if="editable"
            size="small"
          />
          <span v-else>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="费用类型" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.costType"
            placeholder="请选择费用类型"
            clearable
            v-if="editable"
            size="small"
            style="width: 100%"
          >
            <el-option
              v-for="dict in dict.type.expense_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <span v-else>{{
            selectDictLabel(dict.type.expense_type, scope.row.costType)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单位" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.unit"
            placeholder="请选择单位"
            clearable
            v-if="editable"
            size="small"
            style="width: 100%"
          >
            <el-option
              v-for="dict in dict.type.sys_common_units"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <span v-else>{{
            selectDictLabel(dict.type.sys_common_units, scope.row.unit)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="单价" align="center">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.price"
            placeholder="请输入单价"
            clearable
            v-if="editable"
            size="small"
          />
          <span v-else>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="税率" align="center">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.taxRate"
            placeholder="请选择税率"
            clearable
            v-if="editable"
            size="small"
            style="width: 100%"
          >
            <el-option
              v-for="dict in dict.type.sys_common_taxrate"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            />
          </el-select>
          <span v-else>{{
            selectDictLabel(dict.type.sys_common_taxrate, scope.row.taxRate)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="editable"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="addRow(scope.$index)"
            >新增</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="deleteRow(scope.$index)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-top"
            @click="sortUp(scope.$index)"
          ></el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-bottom"
            @click="sortDown(scope.$index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="500px"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="form" label-width="80px" @submit.native.prevent>
        <el-form-item label="模板名称" prop="name">
          <el-input v-model="form.moduleName" placeholder="请输入模板名称" />
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
// import {
//   listRental,
//   getRental,
//   delRental,
//   addRental,
//   updateRental,
// } from "@/api/setting/rental";

export default {
  name: "template",
  dicts: ["sys_common_units", "sys_common_taxrate","expense_type"],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      //
      editable: false,
      moduleList: [
        { value: "1", label: "模板1" },
        { value: "2", label: "模板2" },
      ],
      // 模块详细数据
      moduleData: [],
      costTypeList: [
        { value: "1", label: "费用类型1" },
        { value: "2", label: "费用类型2" },
      ],
      // 查询参数
      queryParams: {
        // pageNum: 1,
        // pageSize: 10,
        name: null,
      },
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      form: {
        id: null,
        moduleName: null,
        name: null,
        costType: null,
        unit: null,
        price: null,
        taxRate: null,
      },
    };
  },
  created() {
    this.getModule();
  },
  methods: {
    // /** 表格字典转换*/
    // formatDictValue(key, dict) {
    //   for (var i = 0; i < dict.length; i++) {
    //     if (dict[i].value == key) {
    //       return dict[i].label;
    //     }
    //   }
    // },
    /** 查询模板列表 */
    getModule() {
      this.loading = true;
      this.moduleData.push(JSON.parse(JSON.stringify(this.form)));
      // listRental(this.queryParams).then((response) => {
      //   this.moduleData = response.rows;
      //   // this.total = response.total;
      //   this.loading = false;
      // });
      this.loading = false;
    },
    handleQuery() {
      this.getModule();
    },
    handleAdd() {
      this.open = true;
      this.title = "添加模板";
    },
    handleEdit() {
      this.editable = true;
    },
    handleDelete() {
      this.$modal
        .confirm("是否确认删除当前模板")
        .then(function () {
          return; //delRental(ids);
        })
        .then(() => {
          this.getModule();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    handleSubmit() {
      this.$modal.msgSuccess("新增成功");
    },
    handleCancel() {
      this.handleReset();
      this.editable = false;
    },
    handleReset() {
      this.moduleData = [];
      this.moduleData.push(JSON.parse(JSON.stringify(this.form)));
    },
    addRow(index) {
      this.moduleData.splice( index + 1, 0, JSON.parse(JSON.stringify(this.form)));
    },
    deleteRow(index) {
      this.moduleData.splice(index, 1);
    },
    // 上移按钮
    sortUp(index) {
      if (index === 0) {
        this.$message({
          message: "已经是列表中第一！",
          type: "warning",
        });
      } else {
        let temp = this.moduleData[index - 1];
        this.$set(this.moduleData, index - 1, this.moduleData[index]);
        this.$set(this.moduleData, index, temp);
      }
    },
    // 下移按钮
    sortDown(index) {
      if (index === this.moduleData.length - 1) {
        this.$message({
          message: "已经是列表中最后！",
          type: "warning",
        });
      } else {
        let i = this.moduleData[index + 1];
        this.$set(this.moduleData, index + 1, this.moduleData[index]);
        this.$set(this.moduleData, index, i);
      }
    },
    /** 提交按钮 */
    submitForm() {
      this.open = false;
      this.editable = true
      this.queryParams.name = "2"
      this.getModule();
    },
    // 取消按钮
    cancel() {
      this.open = false;
      //this.reset();
    },
  },
};
</script>
