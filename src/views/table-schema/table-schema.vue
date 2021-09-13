<template>
  <BasicCard title="Table Schema">
    <template #extra>
      <el-button type="text">more</el-button>
    </template>

    <SchemaMenuBar :barList="barList"></SchemaMenuBar>

    <SchemaTable
      :ref="setSchemaTableRef"
      autoHeight
      :fixed="['index', 'selection', 'expand']"
      index
      expand
      rowKey="id"
      :data="loadData"
      :columns="columns"
      :rowSelection="onSelectChange"
      @expand="expandHandler"
      @filter-change="onFilterChange"
      @row-click="onRowClick"
    >
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
import { reactive, ref, watch } from 'vue'
import { SchemaTable, SchemaMenuBar, BasicCard } from '@/components'
import { useFormModal } from '@/hooks'
import { getFormSchema } from './schema-form'
import { useRouter } from 'vue-router'
import { getTableList } from '@/api/table-list'
const $router = useRouter()

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
    targetMethod: () => addhandler()
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


// 表格 ref
const STableRef = ref(null)
const setSchemaTableRef = (el) => STableRef.value = el

const queryInfo = ref({}) // 搜索数据
const selectedRows = ref([]) // 选中行数据
// 表格列 配置项
const columns = [
  {
    width: 50,
    label: 'id',
    prop: 'id',
    align: 'center',
    fixed: true
  }, {
    width: 80,
    label: '姓名',
    prop: 'name',
    align: 'center'
  }, {
    width: 80,
    label: '性别',
    prop: 'gender',
    align: 'center',
  }, {
    width: 80,
    label: '年龄',
    prop: 'age',
    align: 'center',
  }, {
    width: 80,
    label: '身高',
    prop: 'height',
    align: 'center',
  }, {
    width: 120,
    label: '出生日期',
    prop: 'birthday',
    align: 'center',
  }, {
    width: 120,
    label: '用餐时间',
    prop: 'eatDinnerTime',
    align: 'center',
  }, {
    width: 120,
    label: '上班时间',
    prop: 'workingTime',
    align: 'center',
  }, {
    width: 80,
    label: '是否单身',
    prop: 'single',
    align: 'center',
  }, {
    width: 80,
    label: '有无恋爱经验',
    prop: 'loveHistory',
    align: 'center',
  }, {
    width: 80,
    label: '主要经济来源',
    prop: 'occupation',
    align: 'center',
  }, {
    width: 120,
    label: '兴趣爱好',
    prop: 'like',
    align: 'center',
  }, {
    label: '简介',
    prop: 'desc',
    align: 'center',
    showOverflowTooltip: true
  }, {
    width: 150,
    fixed: 'right',
    label: '操作',
    prop: 'gender',
    align: 'center',
    slots: { customRender: 'action' },
  }
]
// 加载数据
const loadData = parameter => {
  return getTableList(Object.assign({}, queryInfo.value, parameter)).then(res => {
    console.log(res.data);
    return res.data
  })
}
/**
 * FormState 定义表单数据
 * fileds 表单数据
 * rules 校验规则
 */
let FormState = reactive({
  fileds: {},
  rules: {
    name: [{ required: true, message: '请输入姓名', trigger: ['blur'] }],
    gender: [{ required: true, message: '请选择性别', trigger: ['change'] }],
    age: [
      { required: false, message: '请输入年龄', trigger: ['change'] },
      { pattern: /^\d{1,}$/, message: '只能输入正整数', trigger: ['change'] }
    ]
  }
})
/**
 * 重置表单信息
 */
const resetFormState = () => {
  FormState.fileds = {}
}
/**
 * 动态改变校验规则
 */
watch(() => FormState.fileds.gender, (newVal) => {
  if (newVal === 1) {
    FormState.rules.age[0].required = false
  } else {
    FormState.rules.age[0].required = true
  }
})

// showFormmodal
const showFormModal = (params) => {
  useFormModal({
    title: params.title,
    width: 1200,
    formAttr: { labelWidth: 100, },
    formSchema: getFormSchema(),
    fields: params.fields,
    rules: FormState.rules,
    handleOk: (modelRef) => {
      return new Promise(resolve => {
        console.log(modelRef);
        resetFormState()
        resolve()
      })
    },
    closed: () => resetFormState()
  })
}
// 新增事件
const addhandler = () => {
  showFormModal({ title: '新 增', fields: FormState.fileds })
}

// 编辑事件
const editHandler = (row) => {
  console.log('editHandler: ', row)
  showFormModal({ title: '编 辑', fields: row })
}
// 删除事件
const delHandler = (row) => {
  console.log('delHandler: ', row)
}
// 重置事件
const restTable = () => {
  STableRef.value.refresh()
}
// 初始化选中
const initHandler = () => {
  const list = [{ id: 102 }, { id: 106 }]
  STableRef.value.initRowSelection(list)
}

const expandHandler = (expandedRows, expanded) => {
  console.log('expandHandler', { expandedRows, expanded });
}
const onSelectChange = (_selectedRows) => {
  selectedRows.value = _selectedRows
  console.log('onSelectChange', selectedRows.value);
}
const onFilterChange = (filters) => {
  console.log('onFilterChange', filters);
}
const onRowClick = (row) => {
  STableRef.value.toggleRowSelection(row)
}
</script>
