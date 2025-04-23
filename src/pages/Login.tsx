import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #1890ff;
`;

const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.username, values.password);
      alert("Login successful!");
    } catch (error: any) {
      // message.error(error.response?.data?.message || "Login failed");
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <Form name="login" onFinish={onFinish} autoComplete="off" layout="vertical">
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input prefix={<UserOutlined />} placeholder="Username" size="large" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Login
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/forgot-password">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Link to="/register">Don't have an account? Register</Link>
          </Form.Item>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login;
