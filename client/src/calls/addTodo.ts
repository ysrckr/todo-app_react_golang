import { Todo } from '../types';
import { axiosInstance } from '../utils/axios-instance';

export const addTodo = async (todo: Omit<Todo, '_id' | 'completed'>) => {
  const { data } = await axiosInstance.post('/', todo);
  return data;
};
