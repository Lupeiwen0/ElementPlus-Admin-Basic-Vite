<template>
  <BasicCard title="Table Schema">
    <template #extra>
      <el-button type="text">more</el-button>
    </template>

    <SchemaMenuBar :barList="barList"></SchemaMenuBar>

    <SchemaTable
      :ref="setSchemaTableRef"
      index
      expand
      rowKey="id"
      autoHeight
      :fixed="['index', 'selection', 'expand']"
      :data="loadData"
      :columns="columns"
      :rowSelection="onSelectChange"
      @expand="expandHandler"
      @filter-change="onFilterChange"
      @row-click="onRowClick"
    >
      <template #actionHeader>
        <el-input size="mini" placeholder="请输入关键字" v-model="queryInfo.action"></el-input>
      </template>
      <template #action="scope">
        <el-button type="text" @click.stop="editHandler(scope.row)">编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-popconfirm :title="`确定删除（${scope.row.name}）的信息吗？`">
          <template #reference>
            <el-button type="text" @click.stop="delHandler(scope.row)">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
      <template #expand="scope">
        <span>{{ scope.row.name }}</span>
      </template>
    </SchemaTable>
  </BasicCard>
</template>

<script>
export default {
  name: 'table-schema-view'
}
</script>

<script setup>
import { ref, reactive } from 'vue'
import { SchemaTable, SchemaMenuBar, BasicCard } from '@/components'
import { FormState } from './schema-form'
import { useSchemaTable } from './schema-table'

// 表格 ref
const STableRef = ref(null)
const setSchemaTableRef = (el) => STableRef.value = el
// 搜索数据
const queryInfo = reactive({}) 
// 选中行数据
const selectedRows = ref([]) 

// table
const {
  columns,
  loadData,
  onSelectChange,
  expandHandler,
  onFilterChange,
  onRowClick,
  editHandler,
  delHandler,
  addHandler,
  restTable,
  initHandler
} = useSchemaTable({ FormState, STableRef, queryInfo, selectedRows })

/**
 * 菜单按钮
 */
const barList = ref([
  {
    label: '新 增',
    attr: {
      type: 'primary',
      icon: 'el-icon-circle-plus-outline'
    },
    targetMethod: () => addHandler()
  },
  {
    label: '重 置',
    attr: {
      type: 'danger',
      icon: 'el-icon-refresh-left'
    },
    targetMethod: () => restTable()
  },
  {
    label: '选 中',
    attr: {
      type: 'success',
      icon: 'el-icon-thumb'
    },
    targetMethod: () => initHandler()
  }
])

</script>
