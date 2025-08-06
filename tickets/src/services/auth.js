import API from './api';

const VITE_PROJECT_ID = import.meta.env.VITE_PROJECT_ID

export const login = (credentials) => {
  return API.post(`/auth/${VITE_PROJECT_ID}/login`, credentials);
};

export const register = (userData) => {
  return API.post(`/auth/${VITE_PROJECT_ID}/signup-direct`, userData);
};

export const resetPassword = (email) => {
  return API.post(`/auth/${VITE_PROJECT_ID}/forgot-password`, email);
};

export const logout = () => {
  return API.post(`/auth/${VITE_PROJECT_ID}/logout`);
}