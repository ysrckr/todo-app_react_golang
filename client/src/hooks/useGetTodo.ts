import { useQuery } from '@tanstack/react-query';
import { getTodo } from '../calls/getTodo';
import { toast } from 'react-toastify';

export const useGetTodo = (id: string) => {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
