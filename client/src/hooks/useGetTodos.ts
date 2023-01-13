import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../calls/getTodos';
import { toast } from 'react-toastify';

export const useGetTodos = () => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
