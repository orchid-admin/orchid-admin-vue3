<template>
	<el-form ref="deptDialogFormRef" :rules="rules" :model="state.ruleForm" size="default" label-width="90px">
		<el-row :gutter="35">
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="上级部门" prop="parent_id">
					<el-cascader
						:options="state.deptData"
						:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name' }"
						placeholder="请选择部门"
						clearable
						filterable
						class="w100"
						v-model="state.ruleForm.parent_id"
					>
						<template #default="{ node, data }">
							<span>{{ data.name }}</span>
							<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
						</template>
						<template #empty>暂无数据</template>
					</el-cascader>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="state.ruleForm.name" placeholder="请输入部门名称" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="负责人" prop="person_name">
					<el-input v-model="state.ruleForm.person_name" placeholder="请输入负责人" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="手机号" prop="person_phone">
					<el-input v-model="state.ruleForm.person_phone" placeholder="请输入手机号" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="邮箱" prop="person_email">
					<el-input v-model="state.ruleForm.person_email" placeholder="请输入" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="排序" prop="sort">
					<el-input-number v-model="state.ruleForm.sort" :min="0" :max="999" controls-position="right" placeholder="请输入排序" class="w100" />
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="部门状态" prop="status">
					<el-switch v-model="state.ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="部门描述" prop="describe">
					<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入部门描述" maxlength="150"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="systemDeptDialog">
import { onMounted, reactive, ref } from 'vue';
import { DeptCreateRequest, DeptTree } from '/@/types/bindings';
import { createDept, getDeptInfo, getTreeDept, updateDept } from '/@/api/dept';
import { ElMessage, FormRules } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['success']);

// 定义变量内容
const deptDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		parent_id: 0, // 上级部门
		name: '', // 部门名称
		person_name: '', // 负责人
		person_phone: '', // 手机号
		person_email: '', // 邮箱
		sort: 0, // 排序
		status: true, // 部门状态
		describe: '', // 部门描述
	} as DeptCreateRequest,
	deptData: [] as DeptTree[], // 部门数据
});
const rules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: '请输入部门名称',
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
const onSubmit = async () => {
	if (props.id) {
		await updateDept(props.id, state.ruleForm);
		ElMessage.success('更新成功');
	} else {
		await createDept(state.ruleForm);
		ElMessage.success('新增成功');
	}
	emit('success');
};
// 页面加载时
onMounted(async () => {
	state.deptData = await getTreeDept();
	if (props.id) {
		state.ruleForm = await getDeptInfo(props.id);
	}
	if (props.parent_id) {
		state.ruleForm.parent_id = props.parent_id;
	}
});

const props = defineProps({
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
