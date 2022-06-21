<template>
  <div class="app-container">
    <el-form :model="form" ref="form" :inline="true" label-width="68px">
      <el-form-item label="月份起始日期：" prop="startDate" label-width="120">
        <el-select
          :disabled="disabled"
          v-model="form.startDate"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in 31"
            :key="item"
            :value="item"
            :label="item + '日'"
            >{{ item + "日" }}</el-option
          >
        </el-select>
      </el-form-item>
      <el-form-item label="月份结束日期：" prop="endDate" label-width="120">
        <el-select
          :disabled="disabled"
          v-model="form.endDate"
          placeholder="请选择"
          style="width: 80%"
        >
          <el-option
            v-for="item in 31"
            :key="item"
            :value="item"
            :label="item + '日'"
            >{{ item + "日" }}</el-option
          >
        </el-select>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-check"
          :disabled="disabled"
          @click="submitForm"
          >提交</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          size="mini"
          icon="el-icon-edit"
          :disabled="!disabled"
          @click="handleEdit"
          >编辑</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-close"
          :disabled="disabled"
          @click="handleCancel"
          >取消</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  listDuration,
  getDuration,
  delDuration,
  addDuration,
  updateDuration,
} from "@/api/setting/duration";

export default {
  name: "Duration",
  data() {
    return {
      // 查询参数
      form: {
        startDate: 1,
        endDate: 2,
      },
      disabled: true,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      listDuration().then((response) => {
        this.form = response.rows[0];
      });
    },
    submitForm() {
      updateDuration(this.form).then((response) => {
        this.$modal.msgSuccess("修改成功");
        this.disabled = true;
        this.getList();
      });
    },
    handleEdit() {
      this.disabled = false;
    },
    handleCancel(){
       this.disabled = true;
       this.getList();
    }
  },
};
</script>
