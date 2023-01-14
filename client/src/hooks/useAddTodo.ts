import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../calls/addTodo';
import { toast } from 'react-toastify';
import { Todo } from '../types';

export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (todo: Omit<Todo, '_id' | 'completed'>) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      queryClient.invalidateQueries(['todo']);
      toast.success('Todo added!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
