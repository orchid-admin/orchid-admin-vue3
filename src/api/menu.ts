import { MenuCreateRequest, MenuInfo, MenuTree, UserMenuTree, MenuSearchRequest } from '/@/types/bindings';
import request from '/@/utils/request';

export const createMenu = (data?: Object) => {
	return request<MenuCreateRequest, any>({
		url: '/menu',
		method: 'post',
		data,
	});
};
export const updateMenu = (id: Number, data?: Object) => {
	return request<MenuCreateRequest, any>({
		url: '/menu/' + id,
		method: 'put',
		data,
	});
};
export const deleteMenu = (id: number) => {
	return request<any, any>({
		url: '/menu' + id,
		method: 'delete',
	});
};
export const getUserMenu = (params?: object) => {
	return request<any, UserMenuTree[]>({
		url: '/user/get_menu',
		method: 'get',
		params,
	});
};
export const getTreeMenu = (params?: MenuSearchRequest) => {
	return request<any, MenuTree[]>({
		url: '/menu',
		method: 'get',
		params,
	});
};
export const getMenuInfo = (id: number) => {
	return request<any, MenuInfo>({
		url: '/menu/' + id,
		method: 'get',
	});
};
