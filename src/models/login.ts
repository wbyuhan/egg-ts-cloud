import { stringify } from 'querystring';
import type { Reducer, Effect } from 'umi';
import { history } from 'umi';

import { fakeAccountLogin, register } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery, setToken } from '@/utils/utils';
import { message, notification } from 'antd';

export type StateType = {
  status?: 'ok' | 'file' | 'succeed';
  type?: string;
  registerStatus?: boolean;
  currentAuthority?: 'user' | 'guest' | 'admin';
};

export type LoginModelType = {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    logout: Effect;
    register: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
    changeRegisterStatus: Reducer<StateType>;
  };
};

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      console.log('%c 🍱 response: ', 'font-size:20px;background-color: #93C0A4;color:#fff;', response);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        setToken(response.token);
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  登录成功！');
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (window.routerBase !== '/') {
              redirect = redirect.replace(window.routerBase, '/');
            }
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
        history.replace(redirect || '/');
      } else if (response.status === 'faile') {
        notification.error({
          message: '登陆失败',
          description: `${response.errorMsg}`,
        });
      }
    },

    *register({ payload }, { call, put }) {
      const response = yield call(register, payload);
      yield put({
        type: 'changeRegisterStatus',
        payload: response,
      });
      if (response.status === 'faile') {
        message.error(`${response.errorMsg}`);
      }
      if (response.status === 'succeed') {
        message.success(`${response.succeed}`);
      }
    },

    logout() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        registerStatus: payload.code === 200,
      };
    },
    changeRegisterStatus(state, { payload }) {
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        registerStatus: payload.code === 200,
      };
    },
  },
};

export default Model;
