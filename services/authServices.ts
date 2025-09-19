import api from '@/utils/api';

export async function getUser() {
  const res = await api.get('/profile');
  return res.data.user;
}

export async function logoutUser() {
    const res = await api.post('/logout');
    return res.data;
}

export async function loginUser(username: string, password: string) {
  const res = await api.post('/login', { username, password });
  return res.data;
}

export async function registerUser(username: string, password: string, role: string) {
    const res = await api.post('/register', { username, password, role });
    return res.data;
}