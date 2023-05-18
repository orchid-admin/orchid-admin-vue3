<template>
	<div class="system-user-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto h100">
			<div class="system-user-search mb15">
				<el-input v-model="state.search.keyword" size="default" placeholder="请输入用户名称" style="max-width: 180px"> </el-input>
				<el-select v-model="state.search.role_id" class="m-2" placeholder="请选择角色" size="default">
					<el-option v-for="item in state.roles" :key="item.id" :label="item.name" :value="item.id" />
				</el-select>
				<el-cascader
					v-model="state.search.dept_id"
					:options="state.depts"
					:props="deptsDefaultProps"
					:show-all-levels="false"
					size="default"
					placeholder="请选择部门"
					clearable
				/>
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
			</div>
			<el-table :data="state.tableData.data" v-loading="state.loading" style="width: 100%">
				<el-table-column type="index" label="序号" width="60" />
				<el-table-column prop="userName" label="账户名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="userNickname" label="用户昵称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="roleSign" label="关联角色" show-overflow-tooltip></el-table-column>
				<el-table-column prop="department" label="部门" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
				<el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="describe" label="用户描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click="onOpenEditUser(scope.row)">修改</el-button>
						<el-button :disabled="scope.row.userName === 'admin'" size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
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
		</el-card>
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px" destroy-on-close>
			<UserDialog ref="userDialogRef" @refresh="dialogSuccess" :id="state.row.id" />
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
import { DeptTree, RoleList } from '/@/types/bindings';
import { getRoleAll } from '/@/api/role';

// 引入组件
const UserDialog = defineAsyncComponent(() => import('/@/views/system/user/dialog.vue'));

// 定义变量内容
const userDialogRef = ref();
const state = reactive({
	depts: [] as DeptTree[],
	roles: [] as RoleList[],
	tableData: {
		data: [],
		total: 0,
	},
	loading: false,
	search: {
		keyword: '',
		role_id: null,
		dept_id: 0,
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
const deptsDefaultProps = {
	children: 'children',
	label: 'name',
	checkStrictly: true,
};

// 初始化表格数据
const getTableData = () => {
	state.loading = true;
	const data = [];
	for (let i = 0; i < 2; i++) {
		data.push({
			userName: i === 0 ? 'admin' : 'test',
			userNickname: i === 0 ? '我是管理员' : '我是普通用户',
			roleSign: i === 0 ? 'admin' : 'common',
			department: i === 0 ? ['vueNextAdmin', 'IT外包服务'] : ['vueNextAdmin', '资本控股'],
			phone: '12345678910',
			email: 'vueNextAdmin@123.com',
			sex: '女',
			password: '123456',
			overdueTime: new Date(),
			status: true,
			describe: i === 0 ? '不可删除' : '测试用户',
			createTime: new Date().toLocaleString(),
		});
	}
	state.tableData.data = data;
	state.tableData.total = state.tableData.data.length;
	setTimeout(() => {
		state.loading = false;
	}, 500);
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
	userDialogRef.value.onSubmit();
};
// 打开新增用户弹窗
const onOpenAddUser = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
};
// 打开修改用户弹窗
const onOpenEditUser = (row: RowUserType) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
};
// 删除用户
const onRowDel = (row: RowUserType) => {
	ElMessageBox.confirm(`此操作将永久删除账户名称：“${row.userName}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			getTableData();
			ElMessage.success('删除成功');
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
