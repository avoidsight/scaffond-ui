<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default  {
  name:  'App',
    metaInfo() {
        return {
            title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>

<style lang="scss">
.el-divider--horizontal {
  margin-top: 8px;
}
  .el-cascader-menu {
    .el-radio,
    .el-checkbox {
      display: table;
      vertical-align: middle;
      width: 90%;
      height: 100%;
      position: absolute;
      box-sizing: border-box;
      margin-left: -20px;
      padding-left: 10px;
    }
    // 隐藏掉单选的radio和多选的checkbox
    .el-radio__inner,
    .el-checkbox__inner {
      display: none;
    }
}
</style>