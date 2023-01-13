import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleTodoStatus } from "../calls/toggleTodoStatus";
import { Todo } from "../types";

export const useToggleTodoStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: Todo) => toggleTodoStatus(body),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['todos']);
    },
  });
}
  