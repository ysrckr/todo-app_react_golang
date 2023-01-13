import axios from 'axios';
import { Todo } from '../types';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const addTodo = async (todo: Omit<Todo, '_id' | 'completed'>) => {
  const { data } = await axiosInstance.post('', todo);
  return data;
};
