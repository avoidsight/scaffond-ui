<template>
  <div class="ecTable">
    <!-- start menu button -->
    <div class="btnMenu" v-if="menuButtons.length > 0">
      <el-button
        v-for="(item, index) in menuButtons"
        :key="index"
        plain
        :icon="getIcon(item)"
        :type="item.type"
        :disabled="disabledFilter(item)"
        @click="handleClick(item.method)"
        >{{ item.label }}</el-button
      >
      <right-toolbar :showSearch.sync="showSearchData"  @queryTable="queryTable"></right-toolbar>
    </div>

    <!-- end menu buttons -->
    <!-- start table -->
    <el-table
      ref="mainTable"
      id="mainTable"
      v-loading="loading"
      :data="tableData"
      element-loading-spinner="el-icon-loading"
      :header-cell-style="tableHeaderStyle"
      :max-height="maxHeight"
      fit
      border
      :row-key="getRowKey"
      @selection-change="handleSelectionChange"
      :span-method="spanMethod"
    >
      <el-table-column
        v-if="showSelection == true"
        fixed
        type="selection"
        align="center"
        width="60"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        label="序号"
        v-if="showIndex == true"
        fixed
        type="index"
        align="center"
        width="60"
        v-slot="scope"
      >
        {{ scope.$index + (page.currentPage - 1) * page.pageSize + 1 }}
      </el-table-column>

      <!-- start多级表头 -->
      <template v-for="(item, index) in columnConfig.tableHeader">
        <el-table-column
          :key="index"
          :type="item.type"
          :fixed="item.fixed"
          :min-width="item.width"
          :align="item.align"
          :label="item.label"
          v-if="item.type === 'slot'"
          :show-overflow-tooltip="item.show_overflow_tooltip"
        >
          <template slot-scope="{ row }">
            <slot :name="item.slotName" :data="row"></slot>
          </template>
        </el-table-column>
        <column-item v-else :key="index" :col="item">
          <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </column-item>
      </template>
      <!--end多级表头  -->
      <!-- start 操作 -->
      <el-table-column
        v-if="
          (operationButtons && operationButtons.length > 0) 
        "
        fixed="right"
        label="操作"
        width="170"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
              :icon="getIcon(operationButtons[0])"
              size="mini"
              type="text"
              :underline="false"
              @click="handleClick(operationButtons[0].method, scope.row)"
              >{{ operationButtons[0].label }}
          </el-button>
          <el-button
            v-if="operationButtons.length > 1"
            :icon="getIcon(operationButtons[1])"
            size="mini"
            type="text"
            :underline="false"
            @click="handleClick(operationButtons[1].method, scope.row)"
            >{{ operationButtons[1].label }}
          </el-button>
          <el-dropdown v-if="operationButtons.length > 2" size="mini" @command="(command) => handleCommand(command, scope.row)" v-hasPermi="['system:role:edit']">
            <span class="el-dropdown-link">
              <i class="el-icon-d-arrow-right el-icon--right"></i>更多
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                  v-for="(item, index) in operationButtons.slice(2)"
                  :key="index"
                >
                  <el-link
                    :icon="getIcon(item)"
                    type="text"
                    :underline="false"
                    @click="handleClick(item.method, scope.row)"
                    >{{ item.label }}</el-link
                  >
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <!-- end 操作 -->
    </el-table>
    <!-- end table -->
    <!-- start pagination -->
    <el-pagination
      style="margin-bottom: 10px"
      :page-sizes="[10, 30, 50, 100]"
      :current-page.sync="page.currentPage"
      :page-size.sync="page.pageSize"
      layout="total,  prev, pager, next,sizes, jumper"
      :total="page.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />

    <!-- end pagination -->
  </div>
</template>
<script>
import ecTable from "./index.js";
export default ecTable;
</script>
<style scoped>
/deep/.el-table--border th.gutter:last-of-type {
  display: table-cell !important;
}
</style>