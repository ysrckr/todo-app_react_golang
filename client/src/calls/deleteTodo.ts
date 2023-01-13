import axios from 'axios';

const baseUrl = 'http://localhost:4000/api/v1/todos/';

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
});

export const deleteTodo = async (id: string) => {
  await instance.delete(`${baseUrl}/${id}`);
}