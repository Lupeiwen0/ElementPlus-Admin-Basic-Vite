import {
  ElInfiniteScroll,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElConfigProvider,
  ElButton,
  ElTable,
  ElTableColumn,
  ElDivider,
  ElPopconfirm,
  ElUpload,
  ElPagination,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElDialog,
  ElForm,
  ElFormItem,
  ElRow,
  ElCol,
  ElDropdown,
  ElDropdownItem,
  ElEmpty,
  ElTag,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElOptionGroup,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElRadio,
  ElRadioGroup,
  ElCheckbox,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElSwitch,
  ElTooltip,
  ElTabs,
  ElTabPane,
  ElPopover,
  ElRadioButton,
  ElCascader,
  ElCard,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElAvatar,
} from 'element-plus';

const components = [
  ElButton,
  ElContainer,
  ElHeader,
  ElAside,
  ElMain,
  ElFooter,
  ElConfigProvider,
  ElTable,
  ElDivider,
  ElUpload,
  ElPagination,
  ElBreadcrumb,
  ElDialog,
  ElForm,
  ElCol,
  ElDropdown,
  ElEmpty,
  ElTag,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTimePicker,
  ElTimeSelect,
  ElRadio,
  ElCheckbox,
  ElSwitch,
  ElTooltip,
  ElTabs,
  ElPopover,
  ElCascader,
  ElCard,
  ElRadioButton,
  ElOptionGroup,
  ElTabPane,
  ElTableColumn,
  ElCheckboxGroup,
  ElCheckboxButton,
  ElRadioGroup,
  ElDropdownItem,
  ElFormItem,
  ElRow,
  ElBreadcrumbItem,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElSubMenu,
  ElAvatar
]

const plugins = [
  ElInfiniteScroll,
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
  ElPopconfirm
]

export function setupElement (App) {
  components.forEach(component => {
    App.component(component.name, component)
  })

  plugins.forEach(plugin => {
    App.use(plugin)
  })
}