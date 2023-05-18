import { PaginateResponse, UserCreateRequest, UserInfo, UserList, UserPermission } from '/@/types/bindings';
import request from '/@/utils/request';

export const getUserPermission = (params?: object) => {
	return request<any, UserPermission>({
		url: '/user/get_user_permission',
		method: 'get',
		params,
	});
};
export const getUserPaginate = (params?: Object) => {
	return request<any, PaginateResponse<UserList>>({
		url: '/user/get_user_permission',
		method: 'get',
		params,
	});
};
export const getUserInfo = (id: number) => {
	return request<any, UserInfo>({
		url: '/user/' + id,
		method: 'get',
	});
};
export const createUser = (data: UserCreateRequest) => {
	return request<any, any>({
		url: '/user',
		method: 'post',
		data,
	});
};
export const updateUser = (id: number, data: UserCreateRequest) => {
	return request<any, any>({
		url: '/user/' + id,
		method: 'put',
		data,
	});
};
export const deleteUser = (id: number) => {
	return request<any, any>({
		url: '/user/' + id,
		method: 'put',
	});
};
