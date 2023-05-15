import { UserPermission } from '/@/types/bindings';
import request from '/@/utils/request';

export const getUserPermission =  (params?: object) => {
    return request<any, UserPermission>({
        url: '/user/get_user_permission',
        method: 'get',
        params,
    });
};