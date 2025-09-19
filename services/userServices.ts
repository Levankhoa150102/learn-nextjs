import api from '@/utils/api';

export async function getUsers() {
  const res = await api.get('/users');
  return res.data.users;
}

export async function removeUser(id: number) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}