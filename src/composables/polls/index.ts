import { api } from 'src/boot/axios';
import { Notify } from 'quasar';
import {
  Poll,
  CreatePollPayload,
  PollUpdatePayload
} from './model';
import { ref } from 'vue';
export default function usePolls() {
  const poll = ref<Poll | any>(null);
  const polls = ref<Poll[]>([]);
  const success = ref<boolean>();
  const error = ref<Error>();

  const list = async (searchTerm = '') => {
    try {
      const { data } = await api.get<Poll[]>('polls', { params: { term: searchTerm } });
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
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const addVote = async (pollId: string, choice: string) => {
    try {
      await api.put<Poll>(`polls/${pollId}/add_vote`, {
        choice
      });
      success.value = true;
      Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Voted on poll successfully',
      });
      error.value = undefined;
    } catch (err: any) {
      success.value = false;
      error.value = err;
    }
  };

  const removeVote = async (pollId: string) => {
    try {
      await api.put<Poll>(`polls/${pollId}/remove_vote`);
      success.value = true;
      Notify.create({
        type: 'positive',
        position: 'top',
        message: 'Vote removed from the poll successfully',
      });
      error.value = undefined;
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
    removeVote,
    addVote,
    success,
    error,
    polls,
    poll,
  };
}
