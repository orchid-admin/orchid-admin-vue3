import { PaginateResponse, RoleSearchRequest, RoleList, RoleInfo, RoleCreateRequest } from '/@/types/bindings';
import request from '/@/utils/request';

export const getRolePaginate = (params?: RoleSearchRequest) => {
	return request<any, PaginateResponse<RoleList>>({
		url: '/role',
		method: 'get',
		params,
	});
};

export const getRoleAll = () => {
	return request<any, RoleList[]>({
		url: '/role/all',
		method: 'get',
	});
};

export const getRoleInfo = (id: number) => {
	return request<any, RoleInfo>({
		url: '/role/' + id,
		method: 'get',
	});
};

export const createRole = (data: RoleCreateRequest) => {
	return request<RoleCreateRequest, any>({
		url: '/role',
		method: 'post',
		data,
	});
};

export const updateRole = (id: number, data: RoleCreateRequest) => {
	return request<RoleCreateRequest, any>({
		url: '/role/' + id,
		method: 'put',
		data,
	});
};

export const deleteRole = (id: number) => {
	return request<any, any>({
		url: '/role/' + id,
		method: 'delete',
	});
};
