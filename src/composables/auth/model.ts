import User from 'app/backend/models/userModel';
import {
  Poll,
} from '../polls/model';
import { object as zobject, string as zstring, infer as zinfer } from 'zod';

export const PasswordSchema = zstring({
  required_error: 'Password is required',
}).min(8, {
  message: 'Password should be minimum 8 characters',
});

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
}

export interface LoginResponse extends User {
  token: string;
  _id: string;
}

export const UserCreatePayloadSchema = zobject({
  username: zstring({
    required_error: 'User Name is required',
  }),
  firstName: zstring({
    required_error: 'First Name is required',
  }),
  lastName: zstring({
    required_error: 'Last Name is required',
  }),
  email: zstring({
    required_error: 'Email is required',
  }),
  password: PasswordSchema,
});

export const LoginPayloadSchema = UserCreatePayloadSchema.pick({
  email: true,
  password: true,
});

export const UserUpdatePayloadSchema = UserCreatePayloadSchema.partial();

export type LoginPayload = zinfer<typeof LoginPayloadSchema>;
export type UserCreatePayload = zinfer<typeof UserCreatePayloadSchema>;
export type UserUpdatePayload = zinfer<typeof UserUpdatePayloadSchema>;
