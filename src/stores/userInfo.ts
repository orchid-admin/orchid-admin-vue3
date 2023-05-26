import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { getUserPermission } from '/@/api/user';
import { UserInfo, UserPermission } from '../types/bindings';
import { UserInfosState } from '../types/pinia';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			btn_auths: [],
			info: {} as UserInfo,
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				this.userInfos = <UserPermission>await getUserPermission();
			}
		},
	},
});
