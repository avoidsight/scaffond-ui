<template>
  <el-table-column
    :prop="col.prop"
    :label="col.label"
    :align="col.align"
    :type="col.type"
    :min-width="col.width"
    :show-overflow-tooltip="col.show_overflow_tooltip"
  >
    <template v-for="(item, index) of col.children">
      <column-item v-if="item.children" :key="index" :col="item">
        <!-- <template slot-scope="{ row }" >
              <slot name="test" :data="row"></slot>
            </template> -->
        <!-- 注意：如果是vue2中的话customSlots可以替换为$scopedSlots，而且下面setup中的取值也不需要了 -->
        <template v-for="slot in Object.keys($scopedSlots)" #[slot]="scope">
          <!-- 以之前的名字命名插槽，同时把数据原样绑定 -->
          <slot :name="slot" v-bind="scope" />
        </template>
      </column-item>
      <el-table-column
        :key="index"
        :type="item.type"
        :min-width="item.width"
        :align="item.align"
        :label="item.label"
        v-else-if="item.type === 'slot'"
        :show-overflow-tooltip="item.show_overflow_tooltip"
      >
        <template #default="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        :key="index"
        :type="item.type"
        :min-width="item.width"
        :align="item.align"
        :prop="item.prop"
        :show-overflow-tooltip="item.show_overflow_tooltip"
        :label="item.label"
        v-else
      ></el-table-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: "ColumnItem",
  props: {
    col: {
      type: Object,
    },
  },
  mounted() {
    //console.log(this.$scopedSlots);
  },
};
</script>
<style scoped></style>

