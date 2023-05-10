import { MenuCreateRequest, MenuTree, UserMenuTree } from '/@/types/bindings';
import request from '/@/utils/request';

/**
 * 以下为模拟接口地址，gitee 的不通，就换自己的真实接口地址
 *
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 后端控制菜单模拟json，路径在 https://gitee.com/lyt-top/vue-next-admin-images/tree/master/menu
 * 后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
 * @method getAdminMenu 获取后端动态路由菜单(admin)
 * @method getTestMenu 获取后端动态路由菜单(test)
 */
export function useMenuApi() {
	return {
		create: (data?: Object) => {
			return request<MenuCreateRequest, any>({
				url: '/menu',
				method: 'post',
				data,
			});
		},
		update: (id: Number, data?: Object) => {
			return request<MenuCreateRequest, any>({
				url: '/menu/' + id,
				method: 'put',
				data,
			});
		},
		getUserMenu: (params?: object) => {
			return request<any, UserMenuTree[]>({
				url: '/user/get_menu',
				method: 'get',
				params,
			});
		},
		getTreeMenu: (params?: object) => {
			return request<any, MenuTree[]>({
				url: '/menu',
				method: 'get',
				params,
			});
		},
		getInfo: (id: Number) => {
			return request<any, MenuTree[]>({
				url: '/menu/' + id,
				method: 'get',
			});
		},
		getAdminMenu: (params?: object) => {
			return request({
				url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/adminMenu.json',
				method: 'get',
				params,
			});
		},
		getTestMenu: (params?: object) => {
			return request({
				url: '/gitee/lyt-top/vue-next-admin-images/raw/master/menu/testMenu.json',
				method: 'get',
				params,
			});
		},
	};
}
