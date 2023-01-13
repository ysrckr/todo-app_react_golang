import { Todo } from '../types';
import { axiosInstance } from '../utils/axios-instance';

export const getTodos = async () => {
  const { data } = await axiosInstance.get<Todo[]>('/');
  return data;
};
