import { axiosInstance } from '../utils/axios-instance';

export const deleteTodo = async (id: string) => {
  await axiosInstance.delete(`/${id}`);
};
