import API from './api';

export const login = (credentials) => {
  return API.post(`/auth/tickets_d89e3cf948/login`, credentials);
};

export const register = (userData) => {
  return API.post(`/auth/tickets_d89e3cf948/signup-direct`, userData);
};

export const resetPassword = (email) => {
  return API.post(`/auth/tickets_d89e3cf948/forgot-password`, email);
};

export const logout = () => {
  return API.post(`/auth/tickets_d89e3cf948/logout`);
}