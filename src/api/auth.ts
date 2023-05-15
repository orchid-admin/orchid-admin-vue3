import { GetCaptchaReponse, LoginByAccountRequest, LoginReponse } from '/@/types/bindings';
import request from '/@/utils/request';

export const getCaptcha =  (params?: object) => {
    return request<any, GetCaptchaReponse>({
        url: '/get_captcha',
        method: 'get',
        params,
    });
};
export const loginByAccount = (data: object) => {
    return request<LoginByAccountRequest, LoginReponse>({
        url: '/login_by_account',
        method: 'post',
        data,
    });
};
export const signIn = (data: object) => {
    return request({
        url: '/user/signIn',
        method: 'post',
        data,
    });
};
export const signOut = (data: object) => {
    return request({
        url: '/user/signOut',
        method: 'post',
        data,
    });
};