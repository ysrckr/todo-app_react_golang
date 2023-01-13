import axios from 'axios';
import { Todo } from '../types';

const baseUrl = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const toggleTodoStatus = async (body: Todo) => {
  await instance.patch<Todo>(`/${body._id}`, {
    completed: body.completed,
    title: body.title,
    body: body.body,
  });
};
