import T from "element-plus/lib/components/table";
import { cloneDeep, debounce } from "lodash";
import { ElLoading } from "element-plus";
import { h, resolveComponent } from "vue";

let TableLoadingInstance = null;

export default {
  name: "SchemaTable",
  data() {
    return {
      selectedRows: [],
      localLoading: false,
      localData: [],
      localPagination: Object.assign(
        {},
        {
          currentPage: 1,
          pageSize: 10,
          total: 0,
          layout: "total,sizes,prev,pager,next,jumper",
          pageSizes: [10, 20, 30, 40, 50, 100],
          background: true,
          hideOnSinglePage: true,
        },
        this.pagination
      ),
      autoScrollHeight: "400px", // table 滚动高度
    };
  },
  props: Object.assign({}, T.props, {
    // 渲染循环索引
    rowKey: {
      type: [String, Function],
      required: true,
    },
    // 数据
    data: {
      type: Function,
      required: true,
    },
    // 表格配置
    columns: {
      type: Array,
      default: () => [],
    },
    // 选中事件
    rowSelection: {
      type: Function,
    },
    // 展开行
    expand: {
      type: Boolean,
      default: false,
    },
    // 序号
    index: {
      type: Boolean,
      default: false,
    },
    // 自动设置最大高度
    autoHeight: {
      type: Boolean,
      default: false,
    },
    /**
     * 列固定 可选参数
     * [index | selection | expand]
     */
    fixed: {
      type: Array,
      default: () => [],
    },
    // 显示分页
    showPagination: {
      type: Boolean,
      default: true,
    },
    // 分页配置
    pagination: {
      type: Object,
      default: () => {},
    },
  }),
  computed: {
    paginationStyle() {
      return `box-sizing:border-box; width:100%; padding:10px; display:flex; flex-direction: 
      ${this.pagination?.position === "left" ? "row" : "row-reverse"};`;
    },
  },
  watch: {
    localLoading(newVal) {
      if (newVal) {
        if (TableLoadingInstance) return;
        this.$nextTick(() => {
          TableLoadingInstance = ElLoading.service({
            target: ".el-table__body-wrapper",
            background: "rgba(230,247,255,0.4)",
          });
        });
      } else {
        this.$nextTick(() => {
          // 以服务的方式调用的 Loading 需要异步关闭
          TableLoadingInstance.close();
          TableLoadingInstance = null;
        });
      }
    },
  },
  created() {
    this.loadData();
  },
  activated() {
    if (this.autoHeight) this.getTableScrollHeight();
  },
  mounted() {
    if (this.autoHeight) {
      this.getTableScrollHeight();
      window.addEventListener("resize", this.getTableScrollHeight);
    }
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.getTableScrollHeight);
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh(bool = false) {
      bool &&
        (this.localPagination = Object.assign({}, this.localPagination, {
          currentPage: 1,
          pageSize: this.pagination?.pageSize || 10,
        }));
      this.clearSelection();
      this.loadData();
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData(pagination, filters, sorter) {
      this.localLoading = true;
      const parameter = Object.assign(
        {
          currentPage:
            (pagination && pagination.currentPage) ||
            this.localPagination.currentPage,
          pageSize:
            (pagination && pagination.pageSize) ||
            this.localPagination.pageSize,
        },
        (sorter && sorter.prop && { sortField: sorter.prop }) || {},
        (sorter && sorter.order && { sortOrder: sorter.order }) || {},
        { ...filters }
      );
      const result = this.data(parameter);
      // 对接自己的通用数据接口需要修改下方代码中的 r.currentPage, r.total, r.list
      // eslint-disable-next-line
      if (
        (typeof result === "object" || typeof result === "function") &&
        typeof result.then === "function"
      ) {
        result.then((r) => {
          this.localPagination = Object.assign({}, this.localPagination, {
            currentPage: r.currentPage, // 返回结果中的当前分页数
            total: r.total, // 返回结果中的总记录数
            pageSize:
              (pagination && pagination.pageSize) ||
              this.localPagination.pageSize,
          });
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (
            r.list &&
            r.list.length === 0 &&
            this.showPagination &&
            this.localPagination.currentPage > 1
          ) {
            this.localPagination.currentPage--;
            this.loadData();
            return;
          }
          this.localData = r.list || []; // 返回结果中的数组数据
          this.localLoading = false;
        });
      }
    },
    // 清除选中状态
    clearSelection() {
      this.$refs["ElTableRef"].clearSelection();
    },
    // 切换行选中状态
    toggleRowSelection(rowItem, flag = null) {
      this.$refs["ElTableRef"].toggleRowSelection(rowItem, flag);
    },
    // 初始化选中数据
    initRowSelection(selectRows) {
      this.clearSelection();
      const selectRowsKeys = selectRows.map((item) => item[this.rowKey]);
      const tempRows = this.localData.filter((item) =>
        selectRowsKeys.includes(item[this.rowKey])
      );
      tempRows.forEach((item) => {
        this.toggleRowSelection(item, true);
      });
    },
    // 分页 页码改变
    paginationCurrentChange(current) {
      this.localPagination.currentPage = current;
      this.loadData();
    },
    // 分页 size 改变
    paginationSizeChange(pageSize) {
      this.localPagination.pageSize = pageSize;
      this.loadData();
    },
    // 获取table高度
    getTableScrollHeight: debounce(
      function () {
        this.$nextTick(() => {
          const windowClintHeight = document.documentElement.clientHeight;
          const tableRect = document
            .querySelector(".table-wrapper")
            ?.getBoundingClientRect();
          const footerRect = document
            .querySelector(".el-footer")
            .getBoundingClientRect();

          if (!tableRect) return;
          // 52 是 分页器高度
          this.autoScrollHeight = `${
            windowClintHeight - tableRect.top - footerRect.height - 52
          }px`;
        });
      },
      600,
      { leading: true }
    ),
  },
  render() {
    const props = {};
    const localKeys = Object.keys(this.$data);
    // 合并localProps到Table的props中
    Object.keys(T.props).forEach((k) => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(
        1
      )}`;
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey];
        return props[k];
      }
      this[k] && (props[k] = this[k]);
      return props[k];
    });

    // 初始化local配置
    const localColumns = cloneDeep(this.columns);
    // 添加索引序号
    if (this.index) {
      localColumns.unshift({
        type: "index",
        width: "50",
        align: "center",
        label: "#",
        fixed: this.fixed.includes("index"),
      });
    }
    // 添加选择项
    if (typeof this.rowSelection === "function") {
      localColumns.unshift({
        type: "selection",
        width: "50",
        fixed: this.fixed.includes("selection"),
      });
    }
    // 添加展开项
    if (this.expand) {
      localColumns.unshift({
        fixed: this.fixed.includes("expand"),
        type: "expand",
        width: "50",
        slots: { customRender: "expand" },
      });
    }

    // 表格Columns
    const tableColumns = localColumns.map((item) => {
      if (item.slots) {
        const TableColumn = resolveComponent("ElTableColumn");
        const slots = {};
        if (item.slots.customRender) {
          slots["default"] = (props) => {
            return this.$slots[item.slots.customRender](props);
          };
        }
        if (item.slots.customHeader) {
          slots["header"] = (props) => {
            return this.$slots[item.slots.customHeader](props);
          };
        }
        return h(TableColumn, { ...item }, slots);
      } else {
        return <el-table-column {...item}></el-table-column>;
      }
    });

    // 表格
    const table = (
      <el-table
        style="width: 100%;"
        ref="ElTableRef"
        max-height={this.autoHeight ? this.autoScrollHeight : "auto"}
        {...props}
        onExpandChange={(expandedRows, expanded) => {
          // 展开行
          this.$emit("expand", expandedRows, expanded);
        }}
        onSelectionChange={(selection) => {
          // 选中变化
          if (typeof this.rowSelection === "function") {
            this.rowSelection(selection);
          }
        }}
        onSortChange={(sortProp) => {
          // 排序
          this.loadData(null, {}, sortProp);
        }}
        onFilterChange={(filters) => {
          // 筛选
          this.$emit("filterChange", filters);
        }}
        onRowDblclick={(row, column, event) => {
          // 行双击
          this.$emit("row-dblclick", row, column, event);
        }}
        onRowClick={(row, column, event) => {
          // 行 点击
          this.$emit("row-click", row, column, event);
        }}
        onRowContextmenu={(row, column, event) => {
          // 行 右击
          this.$emit("row-contextmenu", row, column, event);
        }}
        onCellClick={(row, column, event) => {
          // 单元格 点击
          this.$emit("cell-click", row, column, event);
        }}
        onCellDblclick={(row, column, event) => {
          // 单元格双击
          this.$emit("cell-dblclick", row, column, event);
        }}
        onCellContextmenu={(row, column, event) => {
          // 单元格 右击
          this.$emit("cell-contextmenu", row, column, event);
        }}
      >
        {tableColumns}
      </el-table>
    );

    // 分页
    const pagination = (
      <el-pagination
        {...this.localPagination}
        onCurrentChange={(current) => {
          this.paginationCurrentChange(current);
        }}
        onSizeChange={(pageSize) => {
          this.paginationSizeChange(pageSize);
        }}
      ></el-pagination>
    );
    return (
      <div class="table-wrapper">
        {table}
        {this.showPagination && (
          <div style={this.paginationStyle}>{pagination}</div>
        )}
      </div>
    );
  },
};
