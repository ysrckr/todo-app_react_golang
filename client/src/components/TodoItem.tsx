import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Todo } from '../types';
import { FC } from 'react';
import { useDeleteTodo } from '../hooks/useDeleteTodo';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const mutation = useDeleteTodo();
  return (
    <div className="grid grid-cols-6 text-center">
      <div className="text-purple-700">
        <button className="p-4">
          {todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </button>
      </div>
      <div className="col-span-2 p-4">{todo.title}</div>
      <div className="col-span-2 p-4">{todo.body}</div>
      <div>
        <button
          className="p-4"
          onClick={() => mutation.mutate(todo._id)}
        >
          <CloseIcon className="text-red-600" />
        </button>
      </div>
    </div>
  );
};
