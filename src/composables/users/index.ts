import { api } from 'src/boot/axios';
import {
  User,
} from '../auth/model';
import { ref } from 'vue';
export default function useUsers() {
  const user = ref<User>();
  const users = ref<User[]>([]);
  const success = ref<boolean>();
  const error = ref<Error>();

  const list = async (searchTerm = '') => {
    try {
      const { data } = await api.get<User[]>('users', { params: { term: searchTerm } });
      success.value = true;
      error.value = undefined;
      users.value = data;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const single = async (userId: string) => {
    try {
      const { data } = await api.get<User>(
        'users/' + userId
      );
      success.value = true;
      error.value = undefined;
      user.value = data;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  return {
    list,
    single,
    success,
    error,
    users,
    user,
  };
}
