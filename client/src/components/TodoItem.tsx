import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { Todo } from '../types';
import { FC } from 'react';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useToggleTodoStatus } from '../hooks/useToggleTodoStatus';
import cn from 'classnames';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const deleteMutation = useDeleteTodo();
  const toggleCompleted = useToggleTodoStatus();

  return (
    <div className="grid grid-cols-6 text-center border-b">
      <div className="text-purple-700">
        <button
          className="p-4"
          onClick={() =>
            toggleCompleted.mutate({
              _id: todo._id,
              completed: !todo.completed,
              title: todo.title,
              body: todo.body,
            })
          }
        >
          {todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </button>
      </div>
      <div
        className={cn('col-span-2 p-4', {
          'line-through': todo.completed,
        })}
      >
        {todo.title}
      </div>
      <div
        className={cn('col-span-2 p-4', {
          'line-through': todo.completed,
        })}
      >
        {todo.body}
      </div>
      <div>
        <button
          className="p-4"
          onClick={() => deleteMutation.mutate(todo._id)}
        >
          <CloseIcon className="text-red-600" />
        </button>
      </div>
    </div>
  );
};
