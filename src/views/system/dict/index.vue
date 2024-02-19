<template>
	<div class="system-dic-container layout-padding">
		<el-card shadow="hover" class="layout-padding-auto">
			<div class="system-user-search mb15">
				<el-input v-model="state.search.keyword" size="default" placeholder="请输入字典名称" style="max-width: 180px">
				</el-input>
				<el-select v-model="state.search.status" class="m-2" placeholder="状态" size="default" clearable>
					<el-option label="开启" :value="1" />
					<el-option label="禁用" :value="0" />
				</el-select>
				<el-button size="default" type="primary" class="ml10" @click="onSearchQuery">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
				<el-button size="default" type="success" class="ml10" @click="onOpenAddDict()">
					<el-icon>
						<ele-FolderAdd />
					</el-icon>
					新增字典
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.tableData.loading" style="width: 100%">
				<el-table-column prop="id" label="ID" width="50" />
				<el-table-column prop="name" label="字典名称" show-overflow-tooltip></el-table-column>
				<el-table-column prop="sign" label="标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="字典状态" show-overflow-tooltip>
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag type="info" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="字典描述" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="创建时间" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" width="100">
					<template #default="scope">
						<el-button size="small" text type="primary" @click="onOpenEditDict(scope.row)">修改</el-button>
						<el-button size="small" text type="primary" @click="onRowDel(scope.row)">删除</el-button>
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
			<DictDialog ref="dictDialogRef" @success="onSuccess" :id="state.row.id" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="systemDic">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { deleteDict, getDictPaginate } from '/@/api/dict';
import { PaginateResponse, DictSearchRequest, DictInfo } from '/@/types/bindings';

// 引入组件
const DictDialog = defineAsyncComponent(() => import('/@/views/system/dict/dialog.vue'));

// 定义变量内容
const dictDialogRef = ref();
const state = reactive({
	loading: false,
	tableData: {
		data: [],
		total: 0,
	} as PaginateResponse<DictInfo>,
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
	getDictPaginate(state.search).then((res) => {
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
	console.log(111);
	dictDialogRef.value.onSubmit(dictDialogRef.value.formRef);
};
// 打开新增角色弹窗
const onOpenAddDict = () => {
	state.dialog.isShowDialog = true;
	state.row.id = 0;
};
// 打开修改角色弹窗
const onOpenEditDict = (row: DictInfo) => {
	state.dialog.isShowDialog = true;
	state.row.id = row.id;
};
// 删除角色
const onRowDel = (row: DictInfo) => {
	ElMessageBox.confirm(`此操作将永久删除字典名称：“${row.name}”，是否继续?`, '提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			deleteDict(row.id).then(() => {
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
	getTableData();
});
</script>
