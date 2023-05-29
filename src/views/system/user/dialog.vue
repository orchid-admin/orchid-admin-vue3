<template>
	<div class="system-user-dialog-container">
		<el-form ref="formRef" :rules="rules" :model="state.ruleForm" size="default" label-width="90px">
			<el-row :gutter="35">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户名称" prop="username">
						<el-input v-model="state.ruleForm.username" placeholder="请输入账户名称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="用户昵称" prop="nickname">
						<el-input v-model="state.ruleForm.nickname" placeholder="请输入用户昵称" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="关联角色" prop="role_id">
						<el-select v-model="state.ruleForm.role_id" placeholder="请选择" clearable class="w100">
							<el-option v-for="item in state.roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="部门" prop="dept_id">
						<el-cascader
							:options="state.depts"
							:props="{ checkStrictly: true, emitPath: false, value: 'id', label: 'name' }"
							placeholder="请选择部门"
							clearable
							filterable
							class="w100"
							v-model="state.ruleForm.dept_id"
						>
							<template #default="{ node, data }">
								<span>{{ data.name }}</span>
								<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
							</template>
						</el-cascader>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="state.ruleForm.phone" placeholder="请输入手机号" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="state.ruleForm.email" placeholder="请输入" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="性别" prop="sex">
						<el-radio-group v-model="state.ruleForm.sex" class="ml-4">
							<el-radio :label="1">男</el-radio>
							<el-radio :label="2">女</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户密码" prop="password">
						<el-input v-model="state.ruleForm.password" placeholder="请输入" type="password" clearable></el-input>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="账户过期" prop="expire_time">
						<el-date-picker v-model="state.ruleForm.expire_time" type="date" placeholder="请选择" class="w100"> </el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
					<el-form-item label="用户状态" prop="status">
						<el-switch v-model="state.ruleForm.status" inline-prompt active-text="启" inactive-text="禁"></el-switch>
					</el-form-item>
				</el-col>
				<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="mb20">
					<el-form-item label="用户描述" prop="describe">
						<el-input v-model="state.ruleForm.describe" type="textarea" placeholder="请输入用户描述" maxlength="150"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
	</div>
</template>

<script setup lang="ts" name="systemUserDialog">
import { onMounted, reactive, ref } from 'vue';
import { DeptTree, RoleList } from '/@/types/bindings';
import { getTreeDept } from '/@/api/dept';
import { getRoleAll } from '/@/api/role';
import { createUser, getUserInfo, updateUser } from '/@/api/user';
import { UserCreateRequest } from '/@/types/bindings';
import { ElMessage, FormInstance, FormRules } from 'element-plus';

// 定义子组件向父组件传值/事件
const emit = defineEmits(['success']);

// 定义变量内容
const formRef = ref();
const state = reactive({
	ruleForm: {
		username: '', // 账户名称
		nickname: '', // 用户昵称
		role_id: null, // 关联角色
		dept_id: null, // 部门
		phone: '', // 手机号
		email: '', // 邮箱
		sex: null, // 性别
		password: '', // 账户密码
		expire_time: '', // 账户过期
		status: true, // 用户状态
		describe: '', // 用户描述
	} as UserCreateRequest,
	depts: [] as DeptTree[], // 部门数据
	roles: [] as RoleList[], // 角色数据
});
const rules = reactive<FormRules>({
	username: [
		{
			required: true,
			message: '请输入用户名',
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
			let params = {
				username: state.ruleForm.username,
				nickname: state.ruleForm.nickname,
				phone: state.ruleForm.phone,
				email: state.ruleForm.email,
				password: state.ruleForm.password,
				expire_time: state.ruleForm.expire_time,
				status: state.ruleForm.status,
				describe: state.ruleForm.describe,
			} as UserCreateRequest;
			params.role_id = !state.ruleForm.role_id ? 0 : state.ruleForm.role_id;
			params.dept_id = !state.ruleForm.dept_id ? 0 : state.ruleForm.dept_id;
			params.sex = !state.ruleForm.sex ? 0 : state.ruleForm.sex;
			if (props.id) {
				updateUser(props.id, params).then(() => {
					ElMessage.success('更新成功');
					emit('success');
				});
			} else {
				createUser(params).then(() => {
					ElMessage.success('新增成功');
					emit('success');
				});
			}
		}
	});
};

// 页面加载时
onMounted(() => {
	getTreeDept().then((res) => {
		state.depts = res;
	});
	getRoleAll().then((res) => {
		state.roles = res;
	});
	if (props.id) {
		getUserInfo(props.id).then((res) => {
			state.ruleForm = res;
		});
	}
});
const props = defineProps({
	id: {
		type: Number,
		required: true,
	},
});
// 暴露变量
defineExpose({
	onSubmit,
	formRef,
});
</script>
