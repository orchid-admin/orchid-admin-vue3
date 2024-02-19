<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto h100">
			<el-row class="system-user-search mb15">
				<el-col :xs="24" :sm="6" :md="8" :lg="3" :xl="11" class="mb20 pr10">
					<el-input v-model="state.search.keyword" size="default" placeholder="请输入用户名称">
					</el-input>
				</el-col>
				<el-col :xs="24" :sm="6" :md="8" :lg="3" :xl="11" class="mb20 pr10">
					<el-select v-model="state.search.role_id" class="m-2" placeholder="请选择角色" size="default" clearable>
						<el-option v-for="item in state.roles" :key="item.id" :label="item.name" :value="item.id" />
					</el-select>
				</el-col>
				<el-col :xs="24" :sm="6" :md="8" :lg="3" :xl="11" class="mb20  pr10">
					<el-cascader v-model="state.search.dept_id" :options="state.depts" :props="deptsDefaultProps"
						:show-all-levels="false" size="default" placeholder="请选择部门" clearable />
				</el-col>
				<el-col :xs="24" :sm="6" :md="8" :lg="3" :xl="11" class="mb20 pr10">
					<el-select v-model="state.search.status" class="m-2" placeholder="状态" size="default" clearable>
						<el-option label="开启" :value="1" />
						<el-option label="禁用" :value="0" />
					</el-select>
				</el-col>
				<el-button size="default" type="primary" class="ml10" @click="onSearchQuery">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddUser()">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增用户
				</el-button>
			</el-row>
			<el-table :data="state.tableData.data" v-loading="state.loading" style="width: 100%">
				<el-table-column prop="id" label="ID" width="60" />
				<el-table-column prop="username" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="nickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="role.name" label="关联角色" show-overflow-tooltip>
					<template #default="scope">
						<div v-if="scope.role">{{ scope.role.name }}</div>
					</template>
				</el-table-column>
				<el-table-column prop="dept.name" label="部门" show-overflow-tooltip> </el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="创建时间" width="180" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="!scope.row._can_edit" size="small" text type="primary"
							@click="onOpenEditUser(scope.row)">修改</el-button>
						<el-button :disabled="!scope.row._can_delete" size="small" text type="primary"
							@click="onRowDel(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.search.page" background
				v-model:page-size="state.search.limit" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</el-card>
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px" destroy-on-close>
			<UserDialog ref="userDialogRef" @success="onSuccess" :id="state.row.id" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemUser">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { getTreeDept } from '/@/api/dept';
import { DeptTree, RoleList, UserList, UserSearchRequest } from '/@/types/bindings';
import { getRoleAll } from '/@/api/role';
import { deleteUser, getUserPaginate } from '/@/api/user';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/system/user/dialog.vue'));

// 定义变量内容
const userDialogRef = ref();
const state = reactive({
	depts: [] as DeptTree[],
	roles: [] as RoleList[],
	tableData: {
		data: [] as UserList[],
		total: 0,
	},
	loading: false,
	search: {
		keyword: '',
		role_id: null,
		dept_id: null,
		status: null,
		page: 1,
		limit: 10,
	} as UserSearchRequest,
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
const deptsDefaultProps = {
	children: 'children',
	label: 'name',
	value: 'id',
	emitPath: false,
	checkStrictly: true,
};

// 初始化表格数据
const getTableData = () => {
	state.loading = true;
	state.dialog.isShowDialog = false;
	getUserPaginate(state.search).then((res) => {
		state.tableData.data = res.data;
		state.tableData.total = res.total;
		state.loading = false;
	});
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
	userDialogRef.value.onSubmit(userDialogRef.value.formRef);
};
// 打开新增用户弹窗
const onOpenAddUser = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
};
// 打开修改用户弹窗
const onOpenEditUser = (row: UserList) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
};
// 删除用户
const onRowDel = (row: UserList) => {
	ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.username}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteUser(row.id).then(() => {
				getTableData();
				ElMessage.success('删除成功');
			});
		})
		.catch(() => { });
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
	getTreeDept().then((res) => {
		state.depts = res;
	});
	getRoleAll().then((res) => {
		state.roles = res;
	});
	getTableData();
});
</script>

<style scoped lang="scss">
.system-user-container {
	:deep(.el-card__body) {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: auto;

		.el-table {
			flex: 1;
		}
	}
}
</style>
