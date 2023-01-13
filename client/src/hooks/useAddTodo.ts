import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from "../calls/addTodo";
import { Todo } from "../types";

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Omit<Todo, "_id">) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    }
  });
}