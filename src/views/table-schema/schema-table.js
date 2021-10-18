
import { cloneDeep } from 'lodash'
import { ElMessage } from 'element-plus'
import { getTableList } from '@/api/table-list'
// 引入表单配置及方法
import { showFormModal } from './schema-form'
import { isRef, unref, toRaw } from 'vue'

export const useSchemaTable = ({ FormState, STableRef, queryInfo, selectedRows }) => {
  return {
    // 表格列 配置项
    columns: [
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
        align: 'center'
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
        width: 120,
        label: '有无恋爱经验',
        prop: 'loveHistory',
        align: 'center',
      }, {
        width: 120,
        label: '主要经济来源',
        prop: 'occupation',
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
        slots: { customRender: 'action', customHeader: 'actionHeader' },
      }
    ],
    // 加载数据
    loadData: parameter => {
      // 这里可以对搜索参数做一些格式化的操作
      const newQueryInfo = cloneDeep(isRef(queryInfo) ? unref(queryInfo) : toRaw(queryInfo))
      if (newQueryInfo.birthday) {
        newQueryInfo.birthday = newQueryInfo.birthday.join(',')
      }
      return getTableList(Object.assign({}, newQueryInfo, parameter)).then(res => {
        return res.data
      })
    },
    // 新增事件
    addHandler: () => {
      showFormModal({ title: '新 增', fields: FormState.fileds })
    },
    // 编辑事件
    editHandler: (row) => {
      // clone数据，避免表单编辑时更改table中的数据
      FormState.fileds = cloneDeep(row)
      showFormModal(
        { title: '编 辑', fields: FormState.fileds },
        () => {
          ElMessage.success('操作成功')
          STableRef.value.refresh()
        }
      )
    },
    // 删除事件
    delHandler: (row) => {
      console.log('delHandler: ', row)
    },
    // 重置事件
    restTable: () => {
      STableRef.value.refresh()
    },
    // 初始化选中
    initHandler: () => {
      const list = [{ id: 102 }, { id: 106 }]
      STableRef.value.initRowSelection(list)
    },
    expandHandler: (expandedRows, expanded) => {
      console.log('expandHandler', { expandedRows, expanded });
    },
    onSelectChange: (_selectedRows) => {
      selectedRows.value = _selectedRows
      console.log('onSelectChange', selectedRows.value);
    },
    onFilterChange: (filters) => {
      console.log('onFilterChange', filters);
    },
    onRowClick: (row) => {
      STableRef.value.toggleRowSelection(row)
    }
  }
}