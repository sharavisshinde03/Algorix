import api from "./api";

export interface AuthResponse {
  token: string;
  tokenType: string;
  id: string;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  const response = await api.post<AuthResponse>("/auth/register", data);
  localStorage.setItem("algorix_token", response.data.token);
  localStorage.setItem("algorix_user", JSON.stringify(response.data));
  return response.data;
};

export const loginUser = async (data: LoginData) => {
  const response = await api.post<AuthResponse>("/auth/login", data);
  localStorage.setItem("algorix_token", response.data.token);
  localStorage.setItem("algorix_user", JSON.stringify(response.data));
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get<AuthResponse>("/auth/me");
  localStorage.setItem("algorix_user", JSON.stringify(response.data));
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("algorix_token");
  localStorage.removeItem("algorix_user");
};
