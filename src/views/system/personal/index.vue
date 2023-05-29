<template>
	<div class="personal layout-pd">
		<el-row>
			<!-- 个人信息 -->
			<el-col :xs="24" :sm="16">
				<el-card shadow="hover" header="个人信息">
					<div class="personal-user">
						<div class="personal-user-left">
							<el-upload class="h100 personal-user-left-upload" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="1">
								<img src="https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500" />
							</el-upload>
						</div>
						<div class="personal-user-right">
							<el-row>
								<el-col :span="24" class="personal-title mb18"
									>{{ currentTime }}，{{ userInfos.info.username }}，生活变的再糟糕，也不妨碍我变得更好！
								</el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="8" class="personal-item mb6">
											<div class="personal-item-label">昵称：</div>
											<div class="personal-item-value">{{ userInfos.info.nickname }}</div>
										</el-col>
										<el-col :xs="24" :sm="16" class="personal-item mb6">
											<div class="personal-item-label">身份：</div>
											<div class="personal-item-value">{{ userInfos.info.dept!.name }}</div>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="24">
									<el-row>
										<el-col :xs="24" :sm="8" class="personal-item mb6">
											<div class="personal-item-label">登录IP：</div>
											<div class="personal-item-value">{{ userInfos.info.last_login_ip }}</div>
										</el-col>
										<el-col :xs="24" :sm="16" class="personal-item mb6">
											<div class="personal-item-label">登录时间：</div>
											<div class="personal-item-value">{{ userInfos.info.last_login_time }}</div>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
			</el-col>

			<!-- 消息通知 -->
			<el-col :xs="24" :sm="8" class="pl15 personal-info">
				<el-card shadow="hover">
					<template #header>
						<span>消息通知</span>
						<span class="personal-info-more">更多</span>
					</template>
					<div class="personal-info-box">
						<ul class="personal-info-ul">
							<li v-for="(v, k) in state.newsInfoList" :key="k" class="personal-info-li">
								<a :href="v.link" target="_block" class="personal-info-li-title">{{ v.title }}</a>
							</li>
						</ul>
					</div>
				</el-card>
			</el-col>

			<!-- 更新信息 -->
			<el-col :span="24">
				<el-card shadow="hover" class="mt15 personal-edit" header="更新信息">
					<div class="personal-edit-title mb15">账号安全</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">账户密码</div>
								<!-- <div class="personal-edit-safe-item-left-value">当前密码强度：强</div> -->
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary" @click="onUpdatePassword">立即修改</el-button>
							</div>
						</div>
					</div>
					<!-- <div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">密保手机</div>
								<div class="personal-edit-safe-item-left-value">已绑定手机：132****4108</div>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary">立即修改</el-button>
							</div>
						</div>
					</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">密保问题</div>
								<div class="personal-edit-safe-item-left-value">已设置密保问题，账号安全大幅度提升</div>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary">立即设置</el-button>
							</div>
						</div>
					</div>
					<div class="personal-edit-safe-box">
						<div class="personal-edit-safe-item">
							<div class="personal-edit-safe-item-left">
								<div class="personal-edit-safe-item-left-label">绑定QQ</div>
								<div class="personal-edit-safe-item-left-value">已绑定QQ：110****566</div>
							</div>
							<div class="personal-edit-safe-item-right">
								<el-button text type="primary">立即设置</el-button>
							</div>
						</div>
					</div> -->
				</el-card>
			</el-col>
		</el-row>
		<el-dialog :title="state.updatePasswordDialog.title" v-model="state.updatePasswordDialog.isShowDialog" width="400px" destroy-on-close>
			<updatePasswordDialog ref="updatePasswordDialogRef" @success="onUpdatePasswordCancel" />
			<template #footer>
				<span class="dialog-footer">
					<el-button size="default" @click="onUpdatePasswordCancel">取 消</el-button>
					<el-button type="primary" size="default" @click="onUpdatePasswordSubmit">提交</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="personal">
import { reactive, computed, ref, defineAsyncComponent } from 'vue';
import { formatAxis } from '/@/utils/formatTime';
import { newsInfoList, recommendList } from './mock';
import { useUserInfo } from '/@/stores/userInfo';
import { storeToRefs } from 'pinia';
const stores = useUserInfo();
const { userInfos } = storeToRefs(stores);

// 引入组件
const updatePasswordDialog = defineAsyncComponent(() => import('/@/views/system/personal/updatePassword.vue'));

// 定义变量内容
const updatePasswordDialogRef = ref();
const state = reactive({
	newsInfoList,
	recommendList,
	personalForm: {
		name: '',
		email: '',
		autograph: '',
		occupation: '',
		phone: '',
		sex: '',
	},
	updatePasswordDialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 当前时间提示语
const currentTime = computed(() => {
	return formatAxis(new Date());
});

const onUpdatePassword = () => {
	state.updatePasswordDialog.isShowDialog = true;
};
const onUpdatePasswordCancel = () => {
	state.updatePasswordDialog.isShowDialog = false;
};
const onUpdatePasswordSubmit = () => {
	updatePasswordDialogRef.value.onSubmit(updatePasswordDialogRef.value.formRef);
};
</script>

<style scoped lang="scss">
@import '../../../theme/mixins/index.scss';
.personal {
	.personal-user {
		height: 130px;
		display: flex;
		align-items: center;
		.personal-user-left {
			width: 100px;
			height: 130px;
			border-radius: 3px;
			:deep(.el-upload) {
				height: 100%;
			}
			.personal-user-left-upload {
				img {
					width: 100%;
					height: 100%;
					border-radius: 3px;
				}
				&:hover {
					img {
						animation: logoAnimation 0.3s ease-in-out;
					}
				}
			}
		}
		.personal-user-right {
			flex: 1;
			padding: 0 15px;
			.personal-title {
				font-size: 18px;
				@include text-ellipsis(1);
			}
			.personal-item {
				display: flex;
				align-items: center;
				font-size: 13px;
				.personal-item-label {
					color: var(--el-text-color-secondary);
					@include text-ellipsis(1);
				}
				.personal-item-value {
					@include text-ellipsis(1);
				}
			}
		}
	}
	.personal-info {
		.personal-info-more {
			float: right;
			color: var(--el-text-color-secondary);
			font-size: 13px;
			&:hover {
				color: var(--el-color-primary);
				cursor: pointer;
			}
		}
		.personal-info-box {
			height: 130px;
			overflow: hidden;
			.personal-info-ul {
				list-style: none;
				.personal-info-li {
					font-size: 13px;
					padding-bottom: 10px;
					.personal-info-li-title {
						display: inline-block;
						@include text-ellipsis(1);
						color: var(--el-text-color-secondary);
						text-decoration: none;
					}
					& a:hover {
						color: var(--el-color-primary);
						cursor: pointer;
					}
				}
			}
		}
	}
	.personal-recommend-row {
		.personal-recommend-col {
			.personal-recommend {
				position: relative;
				height: 100px;
				border-radius: 3px;
				overflow: hidden;
				cursor: pointer;
				&:hover {
					i {
						right: 0px !important;
						bottom: 0px !important;
						transition: all ease 0.3s;
					}
				}
				i {
					position: absolute;
					right: -10px;
					bottom: -10px;
					font-size: 70px;
					transform: rotate(-30deg);
					transition: all ease 0.3s;
				}
				.personal-recommend-auto {
					padding: 15px;
					position: absolute;
					left: 0;
					top: 5%;
					color: var(--next-color-white);
					.personal-recommend-msg {
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.personal-edit {
		.personal-edit-title {
			position: relative;
			padding-left: 10px;
			color: var(--el-text-color-regular);
			&::after {
				content: '';
				width: 2px;
				height: 10px;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				background: var(--el-color-primary);
			}
		}
		.personal-edit-safe-box {
			border-bottom: 1px solid var(--el-border-color-light, #ebeef5);
			padding: 15px 0;
			.personal-edit-safe-item {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.personal-edit-safe-item-left {
					flex: 1;
					overflow: hidden;
					.personal-edit-safe-item-left-label {
						color: var(--el-text-color-regular);
						margin-bottom: 5px;
					}
					.personal-edit-safe-item-left-value {
						color: var(--el-text-color-secondary);
						@include text-ellipsis(1);
						margin-right: 15px;
					}
				}
			}
			&:last-of-type {
				padding-bottom: 0;
				border-bottom: none;
			}
		}
	}
}
</style>
