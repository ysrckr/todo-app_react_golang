import { useMutation, useQueryClient, QueryCache } from '@tanstack/react-query';
import { toggleTodoStatus } from "../calls/toggleTodoStatus";
import { Todo } from "../types";
import { toast } from 'react-toastify';

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Todo) => toggleTodoStatus(body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['todos']);
      toast.success('Todo status toggled!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}
  