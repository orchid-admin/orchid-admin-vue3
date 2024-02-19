import { DictCreateRequest, DictInfo, DictSearchRequest, PaginateResponse } from '/@/types/bindings';
import request from '/@/utils/request';

export const getDictPaginate = (params?: DictSearchRequest) => {
	return request<any, PaginateResponse<DictInfo>>({
		url: '/dict',
		method: 'get',
		params,
	});
};
export const getDictInfo = (id: number) => {
	return request<any, DictInfo>({
		url: '/dict/' + id,
		method: 'get',
	});
};

export const createDict = (data: DictCreateRequest) => {
	return request<DictCreateRequest, any>({
		url: '/dict',
		method: 'post',
		data,
	});
};

export const updateDict = (id: number, data: DictCreateRequest) => {
	return request<DictCreateRequest, any>({
		url: '/dict/' + id,
		method: 'put',
		data,
	});
};

export const deleteDict = (id: number) => {
	return request<any, any>({
		url: '/dict/' + id,
		method: 'delete',
	});
};
