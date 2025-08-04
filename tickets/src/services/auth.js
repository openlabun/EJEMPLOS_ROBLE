import API from './api';

export const login = (credentials) => {
  return API.post(`/auth/tickets_d89e3cf948/login`, credentials);
};

export const register = (userData) => {
  return API.post(`/auth/tickets_d89e3cf948/signup-direct`, userData);
};

export const resetPassword = (data) => {
  return API.post(`/auth/tickets_d89e3cf948/reset-password`, data);
};

export const logout = () => {
  return API.post(`/auth/tickets_d89e3cf948/logout`);
}