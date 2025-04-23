import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Divider } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
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
  width: 220px;
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

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string; confirmPassword: string; email: string }) => {
    try {
      setLoading(true);
      // Make sure passwords match
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      await register(values.username, values.password, values.email);
      alert("Registration successful!");
      navigate("/login");
    } catch (error: unknown) {
      const err = error as Error;
      alert(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo src={logo} alt="Logo" />
        <Title>Register</Title>
        <Form name="register" onFinish={onFinish} autoComplete="off" layout="vertical" scrollToFirstError>
          <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <StyledInput prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <StyledPasswordInput prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match!"));
                },
              }),
            ]}
          >
            <StyledPasswordInput prefix={<LockOutlined />} placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <StyledInput prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" loading={loading} block>
              Register
            </StyledButton>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 5 }}>
            <StyledLink to="/login">Already have an account? Login</StyledLink>
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

export default Register;
