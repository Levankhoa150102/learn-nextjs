export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export function isAdmin(role: string) {
  return role === ROLES.ADMIN;
}

export function isUser(role: string) {
  return role === ROLES.USER;
}
