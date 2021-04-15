import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

interface RegisterProps {
  onSubmit: (val: any) => void;
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const Register: React.FC<RegisterProps> = (props) => {
  const { onSubmit } = props;
  const [form] = Form.useForm();
  const [error, setError] = useState<null | string>(null);

  // 注册
  const onFinish = (values: any) => {
    const { password, samePassword } = values;
    if (password !== samePassword) {
      setError('两次密码不一致,请重新输入');
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <div style={{ marginBottom: '71px' }}>
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
        注册
      </h1>
      {error && (
        <span style={{ color: '#ff4d4f', display: 'block', textAlign: 'center' }}>{error}</span>
      )}
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
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <Form.Item
          name="samePassword"
          label="确认密码"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="再次输入密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 5 }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            size="large"
            style={{ width: '100%', marginLeft: '20px' }}
          >
            注册
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
