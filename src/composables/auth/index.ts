import { createGlobalState, useStorage } from '@vueuse/core';
import {
  LoginPayload,
  LoginResponse,
  UserCreatePayload,
} from './model';
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { Notify } from 'quasar';

export const useAccessToken = createGlobalState(() => {
  return useStorage<LoginResponse | null>('accessToken', <LoginResponse>{});
});

const accessToken = useAccessToken();

export default function useAuth() {
  const success = ref<boolean>(false);
  const userId = ref<string>();
  const token = ref<string>();

  const login = async (payload: LoginPayload) => {
    try {
      const { data } = await api.post<LoginResponse>('auth/login', payload);
      if (data) {
        Notify.create({
          type: 'positive',
          position: 'top',
          message: 'Logged in successfully',
        });
      }
      userId.value = data._id;
      token.value = data.token;
      success.value = true;
      accessToken.value = data;
    } catch (err: any) {
      success.value = false;
    }
  };

  const register = async (payload: UserCreatePayload) => {
    try {
      const { data } = await api.post<LoginResponse>('auth/register', payload);
      if (data) {
        Notify.create({
          type: 'positive',
          position: 'top',
          message: 'Registered successfully',
        });
      }
      userId.value = data._id;
      success.value = true;
    } catch (err: any) {
      success.value = false;
    }
  };

  const logout = () => {
    try {
      accessToken.value = null;
      Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Logged out successfully',
      });
    } catch (err: any) {
      success.value = false;
    }
  };

  return {
    userId,
    token,
    login,
    register,
    logout,
    success,
  };
}
