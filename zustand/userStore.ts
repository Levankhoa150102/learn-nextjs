import { getUsers, removeUser } from '@/services/userServices';
import { User } from '@/types/userType';
import { create } from 'zustand';



interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  fetchUsers: async () => {
    const users = await getUsers();
    set({ users });
  },
  addUser: async (user) => {
    await fetch('/api/auth/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    await useUserStore.getState().fetchUsers();
  },
  deleteUser: async (id) => {
    await removeUser(id);
    await useUserStore.getState().fetchUsers();
  },
}));
