import { useQuery } from '@tanstack/react-query';
import { Todo } from '../types';
import { getTodos } from '../calls/getTodos';

export const useGetTodos = () => {
  return useQuery<Todo[]>(['todos'], getTodos);
};
