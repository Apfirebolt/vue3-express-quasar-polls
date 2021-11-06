import { api } from 'src/boot/axios';
import {
  Poll,
} from './model';
import { ref } from 'vue';
export default function usePolls() {
  const poll = ref<Poll>();
  const polls = ref<Poll[]>();
  const success = ref<boolean>();
  const error = ref<Error>();

  const list = async () => {
    try {
      const { data } = await api.get<Poll[]>('polls');
      success.value = true;
      error.value = undefined;
      polls.value = data;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const single = async (pollId: string) => {
    try {
      const { data } = await api.get<Poll>(
        'polls/' + pollId
      );
      success.value = true;
      error.value = undefined;
      poll.value = data;
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
    polls,
    poll,
  };
}
