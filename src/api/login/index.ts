import { GetCaptchaReponse, LoginByAccountRequest, LoginReponse } from '/@/types/bindings';
import request from '/@/utils/request';

/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 * @method getCaptcha 获取验证码
 * @method login_by_account 账号登录
 */
export function useLoginApi() {
	return {
		getCaptcha: (params?: object) => {
			return request<any, GetCaptchaReponse>({
				url: '/get_captcha',
				method: 'get',
				params,
			});
		},
		loginByAccount: (data: object) => {
			return request<LoginByAccountRequest, LoginReponse>({
				url: '/login_by_account',
				method: 'post',
				data,
			});
		},
		signIn: (data: object) => {
			return request({
				url: '/user/signIn',
				method: 'post',
				data,
			});
		},
		signOut: (data: object) => {
			return request({
				url: '/user/signOut',
				method: 'post',
				data,
			});
		},
	};
}
