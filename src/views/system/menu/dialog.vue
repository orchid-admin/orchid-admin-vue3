<template>
	<el-form ref="menuDialogFormRef" :model="state.ruleForm" size="default" label-width="80px">
		<el-row :gutter="35">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="上级菜单" prop="parent_id">
					<el-cascader
						:options="state.menuData"
						:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'title' }"
						placeholder="请选择上级菜单"
						clearable
						class="w100"
						filterable
						v-model="state.ruleForm.parent_id"
					>
						<template #default="{ node, data }">
							<span>{{ data.title }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
					</el-cascader>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="菜单名称" prop="title" :rules="[{ required: true, message: '菜单名称不能为空' }]">
					<el-input v-model="state.ruleForm.title" placeholder="格式：message.router.xxx" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="菜单图标" prop="icon">
					<IconSelector placeholder="请输入菜单图标" v-model="state.ruleForm.icon" />
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="菜单类型" prop="type">
					<el-radio-group v-model="state.ruleForm.type">
						<el-radio :label="1">菜单</el-radio>
						<el-radio :label="2">目录</el-radio>
						<el-radio :label="3">外链</el-radio>
						<el-radio :label="4">内嵌</el-radio>
						<el-radio :label="5">权限</el-radio>
						<el-radio :label="6">API接口</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>

			<template v-if="[1].includes(state.ruleForm.type)">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="路由名称" prop="router_name">
						<el-input v-model="state.ruleForm.router_name" placeholder="路由中的 name 值" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="[1].includes(state.ruleForm.type)">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="组件路径" prop="router_component">
						<el-input v-model="state.ruleForm.router_component" placeholder="组件路径" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="路由路径" prop="router_path">
						<el-input v-model="state.ruleForm.router_path" placeholder="路由中的 path 值" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.type === 2">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="重定向" prop="redirect">
						<el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.type === 3">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="外链地址" prop="link">
						<el-input v-model="state.ruleForm.link" placeholder="请输入外链URL" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.type === 4">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="内嵌地址" prop="iframe">
						<el-input v-model="state.ruleForm.iframe" placeholder="请输入内嵌URL" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.type === 5">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="权限标识" prop="btn_auth">
						<el-input v-model="state.ruleForm.btn_auth" placeholder="请输入权限标识" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.type === 6">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="接口地址" prop="api_url">
						<el-input v-model="state.ruleForm.api_url" placeholder="请输入接口地址" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="请求方法" prop="api_method">
						<el-select v-model="state.ruleForm.api_method" placeholder="请选择请求方法" clearable>
							<el-option
								v-for="item in ['GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS', 'TRACE', 'PATCH']"
								:key="item"
								:label="item"
								:value="item"
							/>
						</el-select>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="[1, 2, 3, 4].includes(state.ruleForm.type)">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否隐藏" prop="is_hide">
						<el-radio-group v-model="state.ruleForm.is_hide">
							<el-radio :label="true">隐藏</el-radio>
							<el-radio :label="false">不隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="页面缓存" prop="is_keep_alive">
						<el-radio-group v-model="state.ruleForm.is_keep_alive">
							<el-radio :label="true">缓存</el-radio>
							<el-radio :label="false">不缓存</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否固定" prop="is_affix">
						<el-radio-group v-model="state.ruleForm.is_affix">
							<el-radio :label="true">固定</el-radio>
							<el-radio :label="false">不固定</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</template>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="菜单排序" prop="sort">
					<el-input-number v-model="state.ruleForm.sort" controls-position="right" placeholder="请输入排序" class="w100" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="systemMenuDialog">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { i18n } from '/@/i18n/index';
import { createMenu, updateMenu, getMenuInfo } from '/@/api/menu';
import { ElMessage } from 'element-plus';
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';
import { MenuCreateRequest } from '/@/types/bindings';

// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));

// 定义变量内容
const menuDialogFormRef = ref();
const state = reactive({
	// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
	ruleForm: {
		parent_id: 0, // 上级菜单
		type: 1, // 菜单类型
		title: '', // 菜单名称
		icon: '', // 菜单图标
		router_name: '', // 路由名称
		router_component: '', // 组件路径
		router_path: '', // 路由路径
		redirect: '', // 路由重定向，有子集 children 时
		link: '', // 外链地址
		iframe: '', // 内嵌路径
		btn_auth: '', // 菜单类型为按钮时，权限标识
		api_url: '', // 接口地址
		api_method: '', // 接口请求方法
		is_hide: false, // 是否隐藏
		is_keep_alive: false, // 是否缓存
		is_affix: false, // 是否固定
		sort: 0, // 菜单排序
	} as MenuCreateRequest,
	menuData: [] as RouteItems, // 上级菜单数据
});

// 获取 pinia 中的路由
const getMenuData = (routes: RouteItems) => {
	const arr: RouteItems = [];
	routes.map((val: RouteItem) => {
		val['title'] = i18n.global.t(val.title as string);
		arr.push({ ...val });
		if (val.children) getMenuData(val.children);
	});
	return arr;
};

// 提交
const onSubmit = () => {
	if (props.id) {
		updateMenu(props.id, state.ruleForm).then(() => {
			ElMessage.success('更新成功');
			emit('refresh');
			setBackEndControlRefreshRoutes(); // 刷新菜单，未进行后端接口测试
		});
	} else {
		createMenu(state.ruleForm).then(() => {
			ElMessage.success('新增成功');
			emit('refresh');
			setBackEndControlRefreshRoutes(); // 刷新菜单，未进行后端接口测试
		});
	}
};
// 页面加载时
onMounted(() => {
	state.menuData = getMenuData(props.menuData);
	if (props.id) {
		getMenuInfo(props.id).then((res) => {
			state.ruleForm = res;
		});
	}
	if (props.parent_id) {
		state.ruleForm.parent_id = props.parent_id;
	}
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const props = defineProps({
	menuData: {
		type: Array,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	},
	parent_id: {
		type: Number,
		required: true,
	},
});
defineExpose({ onSubmit });
</script>
