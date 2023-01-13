import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../calls/addTodo';
import { Todo } from '../types';
import { toast } from 'react-toastify';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Omit<Todo, '_id' | 'completed'>) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('Todo added!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
