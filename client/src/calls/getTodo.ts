import { axiosInstance } from '../utils/axios-instance';
import { Todo } from '../types';

export const getTodo = async (id: string) => {
  const { data } = await axiosInstance.get<Todo>(`/${id}`);
  return data;
};
