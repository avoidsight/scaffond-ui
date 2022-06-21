import tableHeaderStyle from "@/utils/commonStyle";
import ColumnItem from "./columnItem";
export default {
    name: 'ecloudTable',
    components: {
        ColumnItem
    },
    /**
     * 
    checkRowMethod://查看行的回调jeff:这里有点坑，以后需要优化
    operationButtons://操作菜单,如：新增，删除按钮
    [
        //================view 要单独隔离出来
        {
            name:'view',
            //回调方法
            method:'doView',
        },
        //=================
        {
            name:'edit'
            method:doEdit,
        },
        {
            name:'other'
            icon:el-icon,
            label:"其他操作"
            method:doOther
        }
    ],
    //==================================
    columnConfig://列信息配置
    {
        tableHeader:[
            {
                width:55,               
                align:'center',
                prop:'planEndDate',
                type:'selection'//'index'
                show-overflow-tooltip:'true'//宽度不够显示tooltip
            },
            {
                align:'center',
                prop:'nodeName',               
                type:'slot',
                slotName:'name',
                <template #name='{data}'>
                    {{data}}
                </template>
            }
        ]
    },
    //===================================
    menuButtons://菜单按钮
    [
        {
            name:'plus',      
            type:'primary',
            //回调方法
            method:'doAdd',
        },
        {
            name:'delete', 
            type:'warning',           
            //回调方法
            method:'doDelete',
        },
        {
            name:'other',            
            //回调方法
            icon:el-icon,
            label:"其他操作"
            method:'doOther',
        }
    ]
     */
    props: {
        //是否展示index
        showIndex: {
            type: Boolean,
            default: true
        },
        //是否展示selection
        showSelection: {
            type: Boolean,
            default: true
        },     
        checkRowMethod: {
            type: String,
            default: ''
        },
        operationButtons: {
            type: Array,
            default: () => [],
        },
        columnConfig: {
            type: Object,
            default: {},
        },
        tableData: {
            type: Array,
            default: [],
        },
        //需要多选后才能激活的按钮
        checkRequiredMenuButton: {
            type: Array,
            default: () => [],
        },
        menuButtons: {
            type: Array,
            default: () => [],
        },
        //底部page
        page: {
            type: Object,
            default: {},
        },
        //加载数据的
        loading: {
            type: Boolean,
            default: false
        },
        //合并行或列的计算方法
        spanMethod: {
            type: Function,
            default: function () {
                return ""
            }
        },
    },

    data() {
        return {
            //slotList
            slotList: ['test'],
            //多选框选择的行
            selectedRow: [],
            //delete按钮控制
            deleteDisabled: true,
            //maxHeight
            maxHeight: 0,
            showSearchData:true,
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.resizeHandler)
    },
    mounted() {
        //console.log(0, this.$refs.mainTable.offsetTop);
        // this.$nextTick(() => {
        //     const top = this.$refs.mainTable.$el.offsetTop + 186;
        //     const winHeight = window.innerHeight;
        //     this.maxHeight = winHeight - top;
        //     //console.log(2, this.maxHeight);
        //     setTimeout(() => {
        //         this.$refs.mainTable.doLayout()
        //     }, 600)
        // })
        this.resizeHandler();
    },
    activated() {
        this.resizeHandler();
    },
    watch:{        
        showSearchData:{
            handler(val){
               this.$emit("showSearchChanged",val);
               this.resizeHandler();
            }
        }
    },
    created() {
        // console.log(3);
    },
    methods: {
        queryTable(){
            this.$emit("queryTable");
        },
        resizeHandler(topPositionY) {
            this.$nextTick(() => {
                //const baseY = topPositionY?topPositionY:186
                const top = this.$refs.mainTable.$el.offsetTop + 153;
                const winHeight = window.innerHeight;
                this.maxHeight = winHeight - top;
                setTimeout(() => {
                    this.$refs.mainTable.doLayout()
                }, 200)
            })
        },
        //对按钮饿disabled操作
        disabledFilter(item) {
            if (item.name == 'delete' || this.isIncheckRequiredMenuButton(item.label)) {
                return this.deleteDisabled
            } else {
                return false
            }
        },
        //从checkRequiredMenuButton 中获取 name
        isIncheckRequiredMenuButton(name) {
            for (let i in this.checkRequiredMenuButton) {
                if (name == this.checkRequiredMenuButton[i]) {
                    console.log("name::", name);
                    return true;
                }
            }
            return false;
        },
        //解决row-key is required
        getRowKey(row) {
            return row.id;
        },       

        //表头的统一样式
        tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
            return tableHeaderStyle({ row, column, rowIndex, columnIndex })
        },
        //根据item获取icon
        getIcon(item) {
            if (item.icon == null || item.icon == '') {
                return this.getIconByName(item.name)
            } else {
                return item.icon
            }
        },
        //根据name返回icon
        getIconByName(name) {
            return 'el-icon-' + name;
        },
        handleSizeChange(val) {
            //this.page.size = val;
            //page页数更新了，提醒父页面更新页面信息
            this.$emit('changeSize', val);
        },
        handleCurrentChange(val) {
            // this.page.currentPage = val;
            //page页数更新了，提醒父页面更新页面信息
            this.$emit('changeCurrentPage', val);
        },
        //选择单选框，控制按钮状态
        handleSelectionChange(val) {
            if (val) {
                this.selectedRow = val;
                if (val.length == 0) {
                    this.deleteDisabled = true;
                } else {
                    this.deleteDisabled = false
                }
                this.$emit('changeSelectedRow', val);
            }
        },
        //点击按钮事件回调
        handleClick(methodName, row) {
            try {
                this.$parent.$options.methods[methodName].call(this.$parent, row)
            } catch (e) {
                console.log(e);
            }
        }
    }
}