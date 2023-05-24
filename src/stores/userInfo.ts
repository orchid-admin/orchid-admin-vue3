import { defineStore } from 'pinia';
import { Session } from '/@/utils/storage';
import { getUserPermission } from '/@/api/user';
import { UserPermission } from '../types/bindings';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			photo: '',
			time: 0,
			authBtnList: [],
		},
	}),
	actions: {
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			if (Session.get('userInfo')) {
				this.userInfos = Session.get('userInfo');
			} else {
				const userInfos = <UserPermission>await getUserPermission();
				this.userInfos = {
					userName: userInfos.username,
					photo: userInfos.photo,
					time: userInfos.time,
					authBtnList: userInfos.btn_auths,
				};
			}
		},
	},
});
