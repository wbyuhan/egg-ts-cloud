import React, { useState, useEffect } from 'react';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
import { Spin } from 'antd';
import type { StateType } from '@/models/login';
import type { LoginParamsType, RegisterParamsType } from '@/services/login';
import type { ConnectState } from '@/models/connect';
import LoginForm from './component/LoginForm';
import Register from './component/register';

import styles from './index.less';

export type LoginProps = {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
  rejectting?: boolean;
};

const Login: React.FC<LoginProps> = (props) => {
  const { submitting = false, rejectting = false, userLogin, dispatch } = props;
  const { registerStatus } = userLogin;
  const [type, setType] = useState<string>('register'); // login,register
  const [loginData, setLoginData] = useState<any | undefined>(undefined);
  const onLogin = (val: LoginParamsType) => {
    const { email, password } = val as any;
    const params = {
      userName: email,
      password,
    };
    dispatch({
      type: 'login/login',
      payload: { ...params, type },
    });
  };
  const onRegister = (val: RegisterParamsType) => {
    const { email, password } = val as any;
    setLoginData({ email, password });
    const params = {
      userName: email,
      password,
    };
    dispatch({
      type: 'login/register',
      payload: { ...params, type },
    });
  };
  useEffect(() => {
    setType(registerStatus ? 'login' : 'register');
    return () => {};
  }, [registerStatus]);
  return (
    <div className={styles.main}>
      <Spin tip="Loading..." spinning={submitting || rejectting}>
        {type === 'register' && <Register onSubmit={onRegister} />}
        {(type === 'login' || registerStatus) && (
          <LoginForm onSubmit={onLogin} loginData={rejectting ? loginData : undefined} />
        )}
        {type === 'register' && (
          <p className={styles.loginTap} onClick={() => setType('login')}>
            已有帐号，去登陆
          </p>
        )}
        {type === 'login' && (
          <p className={styles.registerTap} onClick={() => setType('register')}>
            未注册，去注册ba1啊啊啊啊
          </p>
        )}
      </Spin>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
  rejectting: loading.effects['login/register'],
}))(Login);
