import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeTodo } from '../calls/changeTodo';
import { toast } from 'react-toastify';
import { Todo } from '../types';

export const useChangeTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Todo) => changeTodo(body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['todos']);
      toast.success('Todo change is successful!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
