import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  email: string;
  password: string;
};
export declare type RegisterParamsType = LoginParamsType & {
  samePassword: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params
  });
}
export async function register(params: LoginParamsType) {
  return request('/api/login/register', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
