import { api } from 'src/boot/axios';
import {
  Poll,
  CreatePollPayload,
  PollUpdatePayload
} from './model';
import { ref } from 'vue';
export default function usePolls() {
  const poll = ref<Poll | any>({});
  const polls = ref<Poll[]>([]);
  const success = ref<boolean>();
  const error = ref<Error>();

  const list = async () => {
    try {
      const { data } = await api.get<Poll[]>('polls');
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
      error.value = undefined;
      poll.value = data;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const create = async (payload: CreatePollPayload) => {
    try {
      const { data } = await api.post<Poll>('polls', payload);
      success.value = true;
      error.value = undefined;
      poll.value = data;
      success.value = false;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const update = async (pollId: string, payload: PollUpdatePayload) => {
    try {
      const { data } = await api.put<Poll>(`polls/${pollId}`, payload);
      success.value = true;
      error.value = undefined;
      poll.value = data;
      success.value = false;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const deletePoll = async (pollId: string) => {
    try {
      await api.delete<Poll>(`polls/${pollId}`);
      success.value = true;
      error.value = undefined;
      success.value = false;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  return {
    list,
    single,
    create,
    update,
    deletePoll,
    success,
    error,
    polls,
    poll,
  };
}
