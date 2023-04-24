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
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="菜单类型" prop="menuType">
					<el-radio-group v-model="state.ruleForm.menuType">
						<el-radio label="menu">菜单</el-radio>
						<el-radio label="btn">按钮</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="菜单名称" prop="meta.title" :rules="[{ required: true, message: '菜单名称不能为空' }]">
					<el-input v-model="state.ruleForm.meta.title" placeholder="格式：message.router.xxx" clearable></el-input>
				</el-form-item>
			</el-col>
			<template v-if="state.ruleForm.menuType === 'menu'">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="路由名称" prop="name">
						<el-input v-model="state.ruleForm.name" placeholder="路由中的 name 值" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="路由路径" prop="path">
						<el-input v-model="state.ruleForm.path" placeholder="路由中的 path 值" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="重定向" prop="redirect">
						<el-input v-model="state.ruleForm.redirect" placeholder="请输入路由重定向" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="菜单图标" prop="meta.icon">
						<IconSelector placeholder="请输入菜单图标" v-model="state.ruleForm.meta.icon" />
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="组件路径" prop="componentAlias">
						<el-input v-model="state.ruleForm.componentAlias" placeholder="组件路径" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="链接地址" prop="meta.isLink">
						<el-input
							v-model="state.ruleForm.meta.isLink"
							placeholder="外链/内嵌时链接地址（http:xxx.com）"
							clearable
							:disabled="!state.ruleForm.isLink"
						>
						</el-input>
					</el-form-item>
				</el-col>
			</template>
			<template v-if="state.ruleForm.menuType === 'btn'">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="权限标识" prop="btnPower">
						<el-input v-model="state.ruleForm.btnPower" placeholder="请输入权限标识" clearable></el-input>
					</el-form-item>
				</el-col>
			</template>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="菜单排序" prop="menuSort">
					<el-input-number v-model="state.ruleForm.menuSort" controls-position="right" placeholder="请输入排序" class="w100" />
				</el-form-item>
			</el-col>
			<template v-if="state.ruleForm.menuType === 'menu'">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否隐藏" prop="meta.isHide">
						<el-radio-group v-model="state.ruleForm.meta.isHide">
							<el-radio :label="true">隐藏</el-radio>
							<el-radio :label="false">不隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="页面缓存" prop="meta.isKeepAlive">
						<el-radio-group v-model="state.ruleForm.meta.isKeepAlive">
							<el-radio :label="true">缓存</el-radio>
							<el-radio :label="false">不缓存</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否固定" prop="meta.isAffix">
						<el-radio-group v-model="state.ruleForm.meta.isAffix">
							<el-radio :label="true">固定</el-radio>
							<el-radio :label="false">不固定</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否外链" prop="isLink">
						<el-radio-group v-model="state.ruleForm.isLink" :disabled="state.ruleForm.meta.isIframe">
							<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="是否内嵌" prop="meta.isIframe">
						<el-radio-group v-model="state.ruleForm.meta.isIframe" @change="onSelectIframeChange">
							<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</template>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="systemMenuDialog">
import { defineAsyncComponent, reactive, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoutesList } from '/@/stores/routesList';
import { i18n } from '/@/i18n/index';
import { useMenuApi } from '/@/api/menu';
import { ElMessage } from 'element-plus';
import { setBackEndControlRefreshRoutes } from '/@/router/backEnd';
import { MenuCreateRequest } from '/@/types/bindings';

// 引入组件
const IconSelector = defineAsyncComponent(() => import('/@/components/iconSelector/index.vue'));

// 定义变量内容
const menuDialogFormRef = ref();
const stores = useRoutesList();
const { routesList } = storeToRefs(stores);
const state = reactive({
	// 参数请参考 `/src/router/route.ts` 中的 `dynamicRoutes` 路由菜单格式
	ruleForm: {
		parent_id: 0, // 上级菜单
		menuType: 'menu', // 菜单类型
		name: '', // 路由名称
		component: '', // 组件路径
		componentAlias: '', // 组件路径别名
		isLink: false, // 是否外链
		menuSort: 0, // 菜单排序
		path: '', // 路由路径
		redirect: '', // 路由重定向，有子集 children 时
		meta: {
			title: '', // 菜单名称
			icon: '', // 菜单图标
			isHide: false, // 是否隐藏
			isKeepAlive: true, // 是否缓存
			isAffix: false, // 是否固定
			isLink: '', // 外链/内嵌时链接地址（http:xxx.com），开启外链条件，`1、isLink: 链接地址不为空`
			isIframe: false, // 是否内嵌，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
			roles: '', // 权限标识，取角色管理
		},
		btnPower: '', // 菜单类型为按钮时，权限标识
	} as MenuCreateRequest,
	menuData: [] as RouteItems, // 上级菜单数据
});

// 获取 pinia 中的路由
const getMenuData = (routes: RouteItems) => {
	const arr: RouteItems = [];
	routes.map((val: RouteItem) => {
		val['title'] = i18n.global.t(val.meta?.title as string);
		arr.push({ ...val });
		if (val.children) getMenuData(val.children);
	});
	return arr;
};

// 是否内嵌下拉改变
const onSelectIframeChange = () => {
	if (state.ruleForm.meta.isIframe) state.ruleForm.isLink = true;
	else state.ruleForm.isLink = false;
};
// 提交
const onSubmit = () => {
	useMenuApi()
		.create(state.ruleForm)
		.then(() => {
			ElMessage.success('新增成功');
			emit('refresh');
			setBackEndControlRefreshRoutes(); // 刷新菜单，未进行后端接口测试
		});
};
// 页面加载时
onMounted(() => {
	state.menuData = getMenuData(routesList.value);
	if (props.data) {
		state.ruleForm = props.data as MenuCreateRequest;
	}
});

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

const props = defineProps({
	data: {
		type: Object,
		required: true,
	},
});
defineExpose({ onSubmit });
</script>
