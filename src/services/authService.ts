import { fetchAPI } from "./api";

export const authService = {
  login: async (email: string, password: string) => {
    return await fetchAPI('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  register: async (data: { nombre_completo: string; email: string; password: string }) => {
    return await fetchAPI('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getProfile: async () => {
    return await fetchAPI('/auth/profile');
  },
  logout: async () => {
    return await fetchAPI('/auth/logout', { method: 'POST' });
  },
};
