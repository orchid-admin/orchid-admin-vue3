<template>
	<div class="system-role-container layout-padding">
		<div class="system-role-padding layout-padding-auto layout-padding-view">
			<div class="system-user-search mb15">
				<el-input v-model="state.search.keyword" size="default" placeholder="请输入角色名称" style="max-width: 180px"> </el-input>
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
				<el-button size="default" type="success" class="ml10" @click="onOpenAddRole()">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增角色
				</el-button>
			</div>
			<el-table :data="state.tableData.data" empty-text="暂无数据" v-loading="state.loading" style="width: 100%">
				<el-table-column prop="id" label="ID" width="60" />
				<el-table-column prop="name" label="角色名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sign" label="角色标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="角色状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="!scope.row._can_edit" size="small" text type="primary" @click="onOpenEditRole(scope.row)">修改</el-button>
						<el-button :disabled="!scope.row._can_delete" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination
				@size-change="onHandleSizeChange"
				@current-change="onHandleCurrentChange"
				class="mt15"
				:pager-count="5"
				:page-sizes="[10, 20, 30]"
				v-model:current-page="state.search.page"
				background
				v-model:page-size="state.search.limit"
				layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total"
			>
			</el-pagination>
		</div>
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px" destroy-on-close>
			<RoleDialog ref="roleDialogRef" @refresh="dialogSuccess" :id="state.row.id" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemRole">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { deleteRole, getRolePaginate } from '/@/api/role';
import { PaginateResponse, RoleSearchRequest, RoleList } from '/@/types/bindings';

// 引入组件
const RoleDialog = defineAsyncComponent(() => import('/@/views/system/role/dialog.vue'));

// 定义变量内容
const roleDialogRef = ref();
const state = reactive({
	loading: false,
	tableData: {
		data: [],
		total: 0,
	} as PaginateResponse<RoleList>,
	search: {
		keyword: '',
		status: null,
		page: 1,
		limit: 10,
	},
	row: {
		id: 0,
	},
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});
// 初始化表格数据
const getTableData = () => {
	state.loading = true;
	state.dialog.isShowDialog = false;
	let params = { keyword: state.search.keyword, page: state.search.page, limit: state.search.limit } as RoleSearchRequest;
	if (state.search.status != null && [1, 2].includes(state.search.status)) {
		params.status = state.search.status == 1;
	}
	getRolePaginate(params).then((res) => {
		state.tableData.data = res.data;
		state.tableData.total = res.total;
		state.loading = false;
	});
};
const onSearchQuery = () => {
	getTableData();
};
const dialogSuccess = () => {
	getTableData();
};
const onCancel = () => {
	state.dialog.isShowDialog = false;
};
const onSubmit = () => {
	roleDialogRef.value.onSubmit();
};
// 打开新增角色弹窗
const onOpenAddRole = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
};
// 打开修改角色弹窗
const onOpenEditRole = (row: RoleList) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
};
// 删除角色
const onRowDel = (row: RoleList) => {
	ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.name}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteRole(row.id).then(() => {
				getTableData();
				ElMessage.success('删除成功');
			});
		})
		.catch(() => {});
};
// 分页改变
const onHandleSizeChange = (val: number) => {
	state.search.limit = val;
	getTableData();
};
// 分页改变
const onHandleCurrentChange = (val: number) => {
	state.search.page = val;
	getTableData();
};
// 页面加载时
onMounted(() => {
	getTableData();
});
</script>

<style scoped lang="scss">
.system-role-container {
	.system-role-padding {
		padding: 15px;
		.el-table {
			flex: 1;
		}
	}
}
</style>
