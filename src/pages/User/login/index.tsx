import React, { useState } from 'react';
import { connect } from 'umi';
import type { Dispatch } from 'umi';
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
};

const Login: React.FC<LoginProps> = () => {
  const [type, setType] = useState<string>('register'); // login,register

  // const handleSubmit = (values: LoginParamsType) => {

  //   dispatch({
  //     type: 'login/login',
  //     payload: { ...values, type },
  //   });
  // };
  const onLogin = (val: LoginParamsType) => {
    console.log('%c 🧀 val: ', 'font-size:20px;background-color: #465975;color:#fff;', val);
  };
  const onRegister = (val: RegisterParamsType) => {
    console.log('%c 🥥 val: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', val);
  };
  return (
    <div className={styles.main}>
      {type === 'register' && <Register onSubmit={onRegister} />}
      {type === 'login' && <LoginForm onSubmit={onLogin} />}
      {type === 'register' && (
        <p className={styles.loginTap} onClick={() => setType('login')}>
          已有帐号，去登陆
        </p>
      )}
      {type === 'login' && (
        <p className={styles.registerTap} onClick={() => setType('register')}>
          未注册，去注册
        </p>
      )}
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
