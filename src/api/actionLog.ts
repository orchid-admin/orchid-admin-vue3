import { ActionLogInfo, ActionLogSearchRequest, PaginateResponse } from '/@/types/bindings';
import request from '/@/utils/request';

export const getActionLogPaginate = (params?: ActionLogSearchRequest) => {
	return request<any, PaginateResponse<ActionLogInfo>>({
		url: '/action_log',
		method: 'get',
		params,
	});
};
export const getActionLogLogInfo = (id: number) => {
	return request<any, ActionLogInfo>({
		url: '/action_log/' + id,
		method: 'get',
	});
};
