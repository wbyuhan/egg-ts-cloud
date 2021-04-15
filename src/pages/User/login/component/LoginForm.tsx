import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import type { LoginParamsType } from '@/services/login';

interface LoginProps {
  loginData?: LoginParamsType;
  onSubmit: (val: any) => void;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const LoginForm: React.FC<LoginProps> = (props) => {
  const { loginData, onSubmit } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (loginData) {
      form.setFieldsValue({
        email: loginData?.email,
        password: loginData?.password,
      });
    }
    return () => {};
  }, [form, loginData]);

  // 登陆
  const onFinish = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };
  return (
    <div style={{ marginBottom: '137px' }}>
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '15px',
        }}
      >
        <img
          style={{
            height: '44px',
            marginRight: 16,
          }}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        登陆
      </h1>
      <Form form={form} onFinish={onFinish} {...formItemLayout}>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '邮箱格式错误!',
            },
            {
              required: true,
              message: '请输入你的邮箱!',
            },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item label="" wrapperCol={{ span: 14, offset: 5 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            style={{ width: '100%', marginLeft: '20px' }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
