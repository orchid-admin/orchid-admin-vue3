import { LoginLogInfo, LoginLogSearchRequest, PaginateResponse } from '/@/types/bindings';
import request from '/@/utils/request';

export const getLoginLogPaginate = (params?: LoginLogSearchRequest) => {
	return request<any, PaginateResponse<LoginLogInfo>>({
		url: '/login_log',
		method: 'get',
		params,
	});
};
export const getLoginLogInfo = (id: number) => {
	return request<any, LoginLogInfo>({
		url: '/login_log/' + id,
		method: 'get',
	});
};
