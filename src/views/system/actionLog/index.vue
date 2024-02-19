<template>
	<div class="system-dept-container layout-padding">
		<div class="layout-padding-auto layout-padding-view" style="padding: 15px;">
			<div class="system-dept-search mb15">
				<el-input v-model="state.search.keyword" size="default" placeholder="请输入IP地址、浏览器标识"
					style="max-width: 300px">
				</el-input>
				<el-button size="default" type="primary" class="ml10" @click="onSearchQuery">
					<el-icon>
						<ele-Search />
					</el-icon>
					查询
				</el-button>
			</div>
			<el-table :data="state.tableData.data" v-loading="state.loading" style="width: 100%">
				<el-table-column prop="id" label="ID" width="100" />
				<el-table-column prop="user.username" label="用户" width="150" show-overflow-tooltip></el-table-column>
				<el-table-column prop="ip_address" label="IP地址" width="200" show-overflow-tooltip></el-table-column>
				<el-table-column prop="menu_names" label="访问菜单" width="300" show-overflow-tooltip></el-table-column>
				<el-table-column prop="browser_agent" label="浏览器标识" show-overflow-tooltip></el-table-column>
				<el-table-column prop="created_at" label="登录时间" width="200" show-overflow-tooltip></el-table-column>
			</el-table>
			<el-pagination @size-change="onHandleSizeChange" @current-change="onHandleCurrentChange" class="mt15"
				:pager-count="5" :page-sizes="[10, 20, 30]" v-model:current-page="state.search.page" background
				v-model:page-size="state.search.limit" layout="total, sizes, prev, pager, next, jumper"
				:total="state.tableData.total">
			</el-pagination>
		</div>

	</div>
</template>

<script setup lang="ts" name="systemDept">
import { reactive, onMounted } from 'vue';
import { getActionLogPaginate } from '/@/api/actionLog';
import { ActionLogInfo, ActionLogSearchRequest } from '/@/types/bindings';

// 定义变量内容
const state = reactive({
	tableData: {
		data: [] as ActionLogInfo[],
		total: 0
	},
	loading: false,
	search: {
		keyword: '',
		status: null,
		page: 1,
		limit: 10,
	} as ActionLogSearchRequest,
	row: {
		id: 0,
		parent_id: 0,
	},
});

// 初始化表格数据
const getTableData = async () => {
	state.loading = true;
	getActionLogPaginate(state.search).then((res) => {
		state.tableData.data = res.data;
		state.tableData.total = res.total;
		state.loading = false;
	});
};
const onSearchQuery = () => {
	getTableData();
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
