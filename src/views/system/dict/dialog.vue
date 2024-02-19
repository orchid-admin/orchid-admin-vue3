<template>
	<el-form ref="formRef" :rules="rules" :model="state.ruleForm" size="default" label-width="90px">
		<el-row :gutter="35">
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="字典名称" prop="name">
					<el-input v-model="state.ruleForm.name" placeholder="请输入字典名称" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="字典标识" prop="sign">
					<el-input v-model="state.ruleForm.sign" placeholder="请输入字典标识" clearable></el-input>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
				<el-form-item label="字典状态" prop="status">
					<el-switch v-model="state.ruleForm.status" inline-prompt active-text="开启" inactive-text="禁用"
						:active-value="1" :inactive-value="0"></el-switch>
				</el-form-item>
			</el-col>
			<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
				<el-form-item label="字典描述">
					<el-input v-model="state.ruleForm.remark" type="textarea" placeholder="请输入字典描述"
						maxlength="150"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
	</el-form>
</template>

<script setup lang="ts" name="systemRoleDialog">
import { onMounted, reactive, ref } from 'vue';
import { DictCreateRequest } from '/@/types/bindings';
import { createDict, getDictInfo, updateDict } from '/@/api/dict';
import { ElMessage, ElTree, FormInstance, FormRules } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['success', 'cancel']);

// 定义变量内容
const formRef = ref();
const treeRef = ref<InstanceType<typeof ElTree>>();
const state = reactive({
	ruleForm: {
		name: '',
		sign: '',
		remark: '',
		status: 1,
	} as DictCreateRequest,
});
const rules = reactive<FormRules>({
	name: [
		{
			required: true,
			message: '请输入字典名称',
		},
	],
	sign: [
		{
			required: true,
			message: '请输入字典标识',
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
			if (props.id) {
				await updateDict(props.id, state.ruleForm);
				ElMessage.success('更新成功');
			} else {
				await createDict(state.ruleForm);
				ElMessage.success('新增成功');
			}
			emit('success');
		}
	});
};
// 页面加载时
onMounted(async () => {
	if (props.id) {
		getDictInfo(props.id)
			.then((res) => {
				state.ruleForm = res;
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
