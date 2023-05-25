<template>
	<div class="system-menu-container layout-pd">
		<el-card shadow="hover">
			<div class="system-menu-search mb15">
				<el-input size="default" placeholder="请输入菜单名称" style="max-width: 180px" v-model="state.search.keyword"> </el-input>
				<el-select v-model="state.search.menu_types" class="m-2" placeholder="请选择菜单类型" size="default" multiple clearable>
					<el-option v-for="item in menuTypes" :key="item.value" :label="item.label" :value="item.value" />
				</el-select>
				<el-button size="default" type="primary" class="ml10" @click="onSearchQuery">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddMenu()">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增菜单
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				empty-text="暂无数据"
				v-loading="state.loading"
				style="width: 100%"
				row-key="id"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column label="菜单名称" show-overflow-tooltip>
					<template #default="scope">
						<SvgIcon :name="scope.row.icon" />
						<span class="ml10">[{{ scope.row.id }}]{{ scope.row.title }}</span>
					</template>
				</el-table-column>
				<el-table-column label="菜单类型">
					<template #default="scope">
						<el-text size="small" type="success" v-if="scope.row.type == 1">菜单</el-text>
						<el-text size="small" type="success" v-if="scope.row.type == 2">重定向/目录</el-text>
						<el-text size="small" type="success" v-if="scope.row.type == 3">外链</el-text>
						<el-text size="small" type="success" v-if="scope.row.type == 4">内嵌</el-text>
						<el-text size="small" type="success" v-if="scope.row.type == 5">权限</el-text>
						<el-text size="small" type="success" v-if="scope.row.type == 6">API接口</el-text>
					</template>
				</el-table-column>
				<el-table-column prop="router_path" label="路由路径" show-overflow-tooltip></el-table-column>
				<el-table-column label="组件路径" show-overflow-tooltip>
					<template #default="scope">
						<span>{{ scope.row.router_component }}</span>
					</template>
				</el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.row.sort }}
					</template>
				</el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" v-if="scope.row.type == 1 || scope.row.type == 2" @click="onAddChildrenMenu(scope.row.id)"
							>新增</el-button
						>
						<el-button size="small" text type="primary" @click="onOpenEditMenu(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px" destroy-on-close>
			<MenuDialog ref="menuDialogRef" @success="onSuccess" :menuData="state.tableData.data" :id="state.row.id" :parent_id="state.row.parent_id" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemMenu">
import { defineAsyncComponent, onMounted, reactive, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getTreeMenu, deleteMenu } from '/@/api/menu';
import { MenuInfo, MenuTree, MenuSearchRequest } from '/@/types/bindings';
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';
const menuDialogRef = ref();
// 引入组件
const MenuDialog = defineAsyncComponent(() => import('/@/views/system/menu/dialog.vue'));

const menuTypes = [
	{
		value: 1,
		label: '菜单',
	},
	{
		value: 2,
		label: '重定向/目录',
	},
	{
		value: 3,
		label: '外链',
	},
	{
		value: 4,
		label: '内嵌',
	},
	{
		value: 5,
		label: '权限',
	},
	{
		value: 6,
		label: 'API接口',
	},
];
// 定义变量内容
const state = reactive({
	loading: true,
	tableData: {
		data: [] as MenuTree[],
	},
	search: {
		keyword: '',
		menu_types: [],
	} as MenuSearchRequest,
	row: {
		id: 0,
		parent_id: 0,
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 获取路由数据，真实请从接口获取
const getTableData = async () => {
	state.loading = true;
	state.dialog.isShowDialog = false;
	state.tableData.data = await getTreeMenu(state.search);
	state.loading = false;
};
const onSuccess = () => {
	getTableData();
	setBackEndControlRefreshRoutes();
};
// 打开新增菜单弹窗
const onOpenAddMenu = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
	state.row.parent_id = 0;
};
// 新增子级菜单
const onAddChildrenMenu = (menu_id: number) => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
	state.row.parent_id = menu_id;
};
const onCancel = () => {
	state.dialog.isShowDialog = false;
};
const onSubmit = () => {
	menuDialogRef.value.onSubmit(menuDialogRef.value.menuDialogFormRef);
};
const onSearchQuery = () => {
	getTableData();
};

// 打开编辑菜单弹窗
const onOpenEditMenu = (row: MenuInfo) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
	state.row.parent_id = 0;
};
// 删除当前行
const onTabelRowDel = (row: MenuInfo) => {
	ElMessageBox.confirm(`此操作将永久删除路由：${row.title}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteMenu(row.id)
				.then(async () => {
					ElMessage.success('删除成功');
					getTableData();
					await setBackEndControlRefreshRoutes();
				})
				.catch(() => {
					ElMessage.error('删除失败');
				});
		})
		.catch(() => {});
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
