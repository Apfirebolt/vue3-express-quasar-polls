import { api } from 'src/boot/axios';
import {
  Poll,
  CreatePollPayload,
  PollUpdatePayload
} from './model';


export const getPolls = async (searchTerm = '') => {
  console.log('Calling list');
  const { data } = await api.get<{ results: Poll[]; rowsNumber: number }>('polls', { params: { term: searchTerm } });
  return data;
};

export const createPoll = async (payload: CreatePollPayload) => {
  const { data } = await api.post<Poll>('polls', payload);
  return data;
}

export const updatePoll = async (pollId: string, payload: PollUpdatePayload) => {
  const { data } = await api.post<Poll>(`polls/${pollId}`, payload);
  return data;
}

export const deletePoll = async (pollId: string) => {
  const { data } = await api.delete<Poll>(`polls/${pollId}`);
  return data;
};

export const getSinglePoll = async (pollId: string) => {
  const { data } = await api.get<Poll>(`polls/${pollId}`);
  return data;
};

// export default function usePolls() {
//   const poll = ref<Poll | any>(null);
//   const polls = ref<Poll[]>([]);
//   const success = ref<boolean>();
//   const error = ref<Error>();

//   const addVote = async (pollId: string, choice: string) => {
//     try {
//       await api.put<Poll>(`polls/${pollId}/add_vote`, {
//         choice
//       });
//       success.value = true;
//       Notify.create({
//         type: 'positive',
//         position: 'top',
//         message: 'Voted on poll successfully',
//       });
//       error.value = undefined;
//     } catch (err: any) {
//       success.value = false;
//       error.value = err;
//     }
//   };

//   const removeVote = async (pollId: string) => {
//     try {
//       await api.put<Poll>(`polls/${pollId}/remove_vote`);
//       success.value = true;
//       Notify.create({
//         type: 'positive',
//         position: 'top',
//         message: 'Vote removed from the poll successfully',
//       });
//       error.value = undefined;
//     } catch (err: any) {
//       success.value = false;
//       error.value = err;
//     }
//   };

//   const userPolls = async (userId: string) => {
//     try {
//       const { data } = await api.get<Poll[]>(`${userId}/polls`);
//       success.value = true;
//       error.value = undefined;
//       polls.value = data;
//     } catch (err: any) {
//       success.value = false;
//       error.value = err;
//     }
//   }; 

//   return {
//     list,
//     single,
//     create,
//     update,
//     deletePoll,
//     removeVote,
//     userPolls,
//     addVote,
//     success,
//     error,
//     polls,
//     poll,
//   };
// }
