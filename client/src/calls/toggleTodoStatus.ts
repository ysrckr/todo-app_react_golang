import { Todo } from '../types';
import { axiosInstance } from '../utils/axios-instance';

export const toggleTodoStatus = async (body: Todo) => {
  const { data } = await axiosInstance.patch<Todo>(`/${body._id}`, {
    completed: body.completed,
    title: body.title,
    body: body.body,
  });
  return data;
};
