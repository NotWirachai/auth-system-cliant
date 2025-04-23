import axios from "axios";

const API_URL = "http://localhost:5100/api";

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export const authApi = {
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  },

  register: async (username: string, password: string, email: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      email,
    });
  },

  forgotPassword: async (email: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/forgot-password`, { email });
  },

  resetPassword: async (email: string, verifyCode: string, newPassword: string): Promise<void> => {
    await axios.post(`${API_URL}/auth/reset-password`, {
      email,
      verifyCode,
      newPassword,
    });
  },
};
