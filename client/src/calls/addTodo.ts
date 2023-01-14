import { axiosInstance } from '../utils/axios-instance';
import { Todo } from '../types';

export const addTodo = async (todo: Omit<Todo, '_id' | 'completed'>) => {
  const { data } = await axiosInstance.post('/', todo);
  return data;
};
