import { deleteTodo } from "../calls/deleteTodo";
import { useMutation, useQueryClient } from '@tanstack/react-query';



export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
    }
  });
}