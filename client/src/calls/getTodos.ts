import { axiosInstance } from '../utils/axios-instance';
import { Todo } from '../types';

export const getTodos = async () => {
  const { data } = await axiosInstance.get<Todo[]>('/');
  return data;
};
