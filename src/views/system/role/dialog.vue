<template>
	<el-form ref="formRef" :rules="rules" :model="state.ruleForm" size="default" label-width="90px">
		<el-row :gutter="35">
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="角色名称" prop="name">
					<el-input v-model="state.ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="角色标识" prop="sign">
					<el-input v-model="state.ruleForm.sign" placeholder="请输入角色标识" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right"
						placeholder="请输入排序" class="w100" />
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="角色状态" prop="status">
					<el-switch v-model="state.ruleForm.status" inline-prompt active-text="开启" inactive-text="禁用"
						:active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="角色描述" prop="describe">
					<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入角色描述"
						maxlength="150"></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="菜单权限">
					<el-tree ref="treeRef" node-key="id" :data="state.menuData" :props="state.menuProps" show-checkbox
						class="menu-data-tree" />
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { onMounted, reactive, ref } from 'vue';
import { MenuTree, RoleCreateRequest } from '/@/types/bindings';
import { getTreeMenu } from '/@/api/menu';
import { createRole, getRoleInfo, updateRole } from '/@/api/role';
import { ElMessage, ElTree, FormInstance, FormRules } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['success', 'cancel']);

// 定义变量内容
const formRef = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const state = reactive({
	ruleForm: {
		name: '', // 角色名称
		sign: '', // 角色标识
		sort: 0, // 排序
		status: 1, // 角色状态
		describe: '', // 角色描述
		menu_ids: [],
	} as RoleCreateRequest,
	menuData: [] as MenuTree[],
	menuProps: {
		children: 'children',
		label: 'title',
	},
});
const rules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: '请输入角色名称',
		},
	],
	sign: [
		{
			required: true,
			message: '请输入角色标识',
		},
	],
	sort: [
		{
			required: true,
			message: '请输入排序',
		},
	],
	status: [
		{
			required: true,
			message: '请输入选择状态',
		},
	],
});

// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl!.validate(async (valid) => {
		if (valid) {
			let menu_ids = treeRef.value!.getCheckedKeys().concat(treeRef.value!.getHalfCheckedKeys()) as number[];
			state.ruleForm.menu_ids = menu_ids;
			if (props.id) {
				await updateRole(props.id, state.ruleForm);
				ElMessage.success('更新成功');
			} else {
				await createRole(state.ruleForm);
				ElMessage.success('新增成功');
			}
			emit('success');
		}
	});
};
// 页面加载时
onMounted(async () => {
	state.menuData = await getTreeMenu();
	if (props.id) {
		getRoleInfo(props.id)
			.then((res) => {
				state.ruleForm = res;
				state.ruleForm.menu_ids.forEach((v) => {
					treeRef.value!.setChecked(v, true, false);
				});
			})
			.catch(() => {
				emit('cancel');
			});
	}
});
const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
});
defineExpose({ onSubmit, formRef });
</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
