export type User = {
  id: string;
  name?: string;
  email: string;
  emailVerified?: string;
  image?: string;
  accounts?: string[];
  sessions?: string[];
  Authenticator?: string[];
  createdAt?: string;
  updatedAt?: string;
  role: string;
};