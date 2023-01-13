import axios from 'axios';
import { Todo } from '../types';

const baseUrl = 'http://127.0.0.1:4000/api/v1/todos/';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { 
    'Content-Type': 'application/json',
  },
});

export const getTodos = async () => {
  const { data } = await instance.get<Todo[]>(baseUrl);
  return data;
}