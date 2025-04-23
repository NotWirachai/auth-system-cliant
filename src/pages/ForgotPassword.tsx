import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, LockOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
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

const Logo = styled.img`
  width: 200px;
  margin-bottom: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ContactInfo = styled.div`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #1890ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

interface ResetFormData {
  email: string;
  verifyCode?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword, resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "reset">("email");
  const [form] = Form.useForm();

  const handleSendToken = async (values: ResetFormData) => {
    try {
      setLoading(true);
      await forgotPassword(values.email);
      setEmail(values.email);
      // message.success("Reset code has been sent to your email!");
      setStep("reset");
    } catch (error: unknown) {
      const err = error as Error;
      // message.error(err.message || "Failed to send reset code");
      alert(err.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (values: ResetFormData) => {
    try {
      setLoading(true);
      if (values.newPassword !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      await resetPassword(email, values.verifyCode!, values.newPassword!);
      // message.success("Password has been reset successfully!");
      alert("Password has change!");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as Error;
      // message.error(err.message || "Failed to reset password");
      alert(err.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo src="/bluestone-logo.png" alt="Bluestone Logo" />
        <Title>Forgot Password</Title>

        <Form form={form} name="forgot-password" onFinish={handleSendToken} autoComplete="off" layout="vertical">
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Send Reset Token
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/login">Back to Login</Link>
          </Form.Item>
        </Form>
        {step !== "email" && (
          <Form form={form} name="reset-password" onFinish={handleResetPassword} autoComplete="off" layout="vertical">
            <Form.Item name="verifyCode" rules={[{ required: true, message: "Please input verification code!" }]}>
              <Input prefix={<SafetyCertificateOutlined />} placeholder="Verify Code" size="large" />
            </Form.Item>

            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please input new password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="New Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block size="large">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}

        <ContactInfo>
          <a href="http://www.bluestone.co.th" target="_blank" rel="noopener noreferrer">
            www.bluestone.co.th
          </a>
          <div>Contact Us</div>
        </ContactInfo>
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword;
