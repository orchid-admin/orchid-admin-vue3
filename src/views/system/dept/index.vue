<template>
	<div class="system-dept-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-dept-search mb15">
				<el-input v-model="state.search.keyword" size="default" placeholder="请输入部门名称" style="max-width: 180px"> </el-input>
				<el-select v-model="state.search.status" class="m-2" placeholder="状态" size="default" clearable>
					<el-option label="开启" :value="1" />
					<el-option label="关闭" :value="2" />
				</el-select>
				<el-button size="default" type="primary" class="ml10" @click="onSearchQuery">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddDept()">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增部门
				</el-button>
			</div>
			<el-table
				:data="state.tableData.data"
				empty-text="暂无数据"
				v-loading="state.loading"
				style="width: 100%"
				row-key="id"
				default-expand-all
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column label="部门名称" show-overflow-tooltip>
					<template #default="scope"> {{ scope.row.name }}[{{ scope.row.id }}] </template>
				</el-table-column>
				<el-table-column prop="describe" label="部门描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="部门状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="排序" show-overflow-tooltip width="80">
					<template #default="scope">
						{{ scope.row.sort }}
					</template>
				</el-table-column>
				<el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" show-overflow-tooltip width="140">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onAddChildrenMenu(scope.row.id)">新增</el-button>
						<el-button size="small" text type="primary" @click="onOpenEditDept(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onTabelRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px" destroy-on-close>
			<DeptDialog ref="deptDialogRef" @success="onSuccess" :id="state.row.id" :parent_id="state.row.parent_id" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemDept">
import { defineAsyncComponent, ref, reactive, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { deleteDept, getTreeDept } from '/@/api/dept';
import { DeptSearchRequest, DeptTree } from '/@/types/bindings';

// 引入组件
const DeptDialog = defineAsyncComponent(() => import('/@/views/system/dept/dialog.vue'));

// 定义变量内容
const deptDialogRef = ref();
const state = reactive({
	tableData: {
		data: [] as DeptTree[],
	},
	loading: false,
	search: {
		keyword: '',
		status: null,
	},
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

// 初始化表格数据
const getTableData = async () => {
	state.loading = true;
	state.dialog.isShowDialog = false;
	let params = { keyword: state.search.keyword } as DeptSearchRequest;
	if (state.search.status != null && [1, 2].includes(state.search.status)) {
		params.status = state.search.status == 1;
	}
	state.tableData.data = await getTreeDept(params);
	state.loading = false;
};
const onSearchQuery = () => {
	getTableData();
};
const onSuccess = () => {
	getTableData();
};
const onCancel = () => {
	state.dialog.isShowDialog = false;
};
const onSubmit = () => {
	deptDialogRef.value.onSubmit();
};
// 打开新增菜单弹窗
const onOpenAddDept = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
};
// 新增子级菜单
const onAddChildrenMenu = (menu_id: number) => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
	state.row.parent_id = menu_id;
};
// 打开编辑菜单弹窗
const onOpenEditDept = (row: DeptTree) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
};
// 删除当前行
const onTabelRowDel = (row: DeptTree) => {
	ElMessageBox.confirm(`此操作将永久删除部门：${row.name}, 是否继续?`, '提示', {
		confirmButtonText: '删除',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(async () => {
			await deleteDept(row.id);
			getTableData();
			ElMessage.success('删除成功');
		})
		.catch(() => {});
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>
