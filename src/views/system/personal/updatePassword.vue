<template>
	<div class="system-user-dialog-container">
		<el-form ref="formRef" :rules="rules" :model="state.ruleForm" size="default" label-width="90px">
			<el-row :gutter="35">
				<el-form-item label="旧密码" prop="old_password" label-width="120">
					<el-input v-model="state.ruleForm.old_password" placeholder="请输入旧密码" clearable></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="new_password" label-width="120">
					<el-input v-model="state.ruleForm.new_password" placeholder="请输入新密码" clearable></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="confirm_password" label-width="120">
					<el-input v-model="state.ruleForm.confirm_password" placeholder="请输入确认新密码" clearable></el-input>
				</el-form-item>
			</el-row>
		</el-form>
	</div>
</template>
<script setup lang="ts" name="updatePasswordDialog">
import { reactive, ref } from 'vue';
import { updatePassword } from '/@/api/user';
import { UpdatePasswordRequest } from '/@/types/bindings';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['success']);

// 定义变量内容
const formRef = ref();
const state = reactive({
	ruleForm: {
		old_password: '',
		new_password: '',
		confirm_password: '',
	} as UpdatePasswordRequest,
});

const validatePasswordConfirm = (rule: any, value: any, callback: any) => {
	if (state.ruleForm.new_password != value) {
		callback(new Error('确认新密码与新密码不一致'));
	} else {
		callback();
	}
};
const rules = reactive<FormRules>({
	old_password: [
		{
			required: true,
			message: '请输入旧密码',
			trigger: 'blur',
		},
		{
			min: 6,
			message: '旧密码至少六位字符',
		},
	],
	new_password: [
		{
			required: true,
			message: '请输入新密码',
			trigger: 'blur',
		},
		{
			min: 6,
			message: '新密码至少六位字符',
		},
	],
	confirm_password: [
		{
			required: true,
			message: '请输入确认新密码',
			trigger: 'blur',
		},
		{
			min: 6,
			message: '确认新密码至少六位字符',
		},
		{ validator: validatePasswordConfirm },
	],
});

// 提交
const onSubmit = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	await formEl.validate(async (valid) => {
		if (valid) {
			updatePassword(state.ruleForm).then(() => {
				ElMessage.success('修改成功');
				emit('success');
			});
		} else {
			return false;
		}
	});
};
// 暴露变量
defineExpose({
	onSubmit,
	formRef,
});
</script>
