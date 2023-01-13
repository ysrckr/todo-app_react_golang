import { deleteTodo } from "../calls/deleteTodo";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';



export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(["todos"]);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
}