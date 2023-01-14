import { axiosInstance } from '../utils/axios-instance';
import { Todo } from '../types';

export const changeTodo = async (body: Todo) => {
  const { data } = await axiosInstance.patch<Todo>(`/${body._id}`, {
    completed: body.completed,
    title: body.title,
    body: body.body,
  });
  return data;
};
