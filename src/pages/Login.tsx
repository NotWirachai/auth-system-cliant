import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined, CheckOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo2.png";
import iconsFacebook from "../assets/icons-facebook.png";
import iconsIG from "../assets/icons-ig.png";
import iconsLine from "../assets/icons-line.png";
import iconsYoutube from "../assets/icons-youtube.png";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
`;

const Logo = styled.img`
  display: block;
  width: 100%;
  margin: 0 auto 1rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 24px;
  font-weight: 500;
  color: #333;
`;

const StyledLink = styled(Link)`
  color: #1e59a8;
  &:hover {
    text-decoration: underline;
    color: #1a4f96;
  }
`;

const StyledButton = styled(Button)`
  background-color: #1e59a8;
  border-color: #1e59a8;
  border-radius: 8px;
  height: 44px;
  &:hover {
    background-color: #1a4f96;
    border-color: #1a4f96;
  }
  &:focus {
    background-color: #1e59a8;
    border-color: #1e59a8;
  }
`;

const CustomCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const CheckboxSquare = styled.div<{ checked: boolean }>`
  width: 24px;
  height: 24px;
  background-color: #444;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .check-icon {
    color: #3b82f6;
    font-size: 14px;
    display: ${(props) => (props.checked ? "block" : "none")};
  }
`;

const CheckboxLabel = styled.span`
  font-size: 14px;
`;

const SocialContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SocialIcon = styled.img`
  width: 52px;
  height: 52px;
`;

const ContactInfo = styled.div`
  text-align: center;
  margin-top: 10px;
  font-size: 14px;

  a {
    color: #1e59a8;
    text-decoration: none;
    display: block;
    margin-top: 5px;

    &:hover {
      text-decoration: underline;
      color: #1a4f96;
    }
  }
`;

const StyledDivider = styled(Divider)`
  margin: 15px 0;
`;

const StyledInput = styled(Input)`
  border-radius: 4px;
  padding: 10px;
  height: 44px;
`;

const StyledPasswordInput = styled(Input.Password)`
  border-radius: 4px;
  padding: 10px;
  height: 44px;
`;

const Login = () => {
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.username, values.password);
      const lastLoginMessage = user?.lastLogin ? `\nLast login: ${new Date(user?.lastLogin).toLocaleString()}` : "";
      // If rememberMe is checked, store credentials (in a real app, use a more secure method)
      if (rememberMe) {
        localStorage.setItem("rememberedUsername", values.username);
      } else {
        localStorage.removeItem("rememberedUsername");
      }

      alert(`Login successful!${lastLoginMessage}`);
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo src={logo} alt="Logo" />
        <Title>Login</Title>
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            username: localStorage.getItem("rememberedUsername") || "",
            remember: !!localStorage.getItem("rememberedUsername"),
          }}
        >
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <StyledInput prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <StyledPasswordInput prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <CustomCheckbox onClick={() => setRememberMe(!rememberMe)}>
            <CheckboxSquare checked={rememberMe}>
              <CheckOutlined className="check-icon" />
            </CheckboxSquare>
            <CheckboxLabel>Remember Me</CheckboxLabel>
          </CustomCheckbox>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading} block>
              Login
            </StyledButton>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 5 }}>
            <StyledLink to="/forgot-password">Forgotten password?</StyledLink>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 5 }}>
            <StyledLink to="/register">Don't have an account? Register</StyledLink>
          </Form.Item>
        </Form>

        <StyledDivider />

        <ContactInfo>
          <div>Contact Us</div>
          <SocialContainer>
            <a href="https://www.facebook.com/Bluestone.co.th/" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={iconsFacebook} alt="Facebook" />
            </a>
            <a href="https://www.instagram.com/bluestonethailand/" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={iconsIG} alt="Instagram" />
            </a>
            <a href="https://line.me/ti/p/~@bluestonethailand" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={iconsLine} alt="Line" />
            </a>
            <a href="https://www.youtube.com/channel/UCQ3mRpetmm5Ek-LLdTjwaNQ" target="_blank" rel="noopener noreferrer">
              <SocialIcon src={iconsYoutube} alt="YouTube" />
            </a>
          </SocialContainer>
          <a href="http://www.bluestone.co.th" target="_blank" rel="noopener noreferrer">
            www.bluestone.co.th
          </a>
        </ContactInfo>
      </FormContainer>
    </Container>
  );
};

export default Login;
