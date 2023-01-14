import { useMutation, useQueryClient, QueryCache } from '@tanstack/react-query';
import { changeTodo } from "../calls/changeTodo";
import { Todo } from "../types";
import { toast } from 'react-toastify';

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
}
  