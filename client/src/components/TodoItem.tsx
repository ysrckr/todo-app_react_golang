import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CloseIcon from '@mui/icons-material/Close';
import { Todo } from '../types';
import { FC, useRef, useState } from 'react';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useChangeTodo } from '../hooks/useChangeTodo';
import cn from 'classnames';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { TostifyError } from './TostifyError';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const deleteMutation = useDeleteTodo();
  const changeTodoMutation = useChangeTodo();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState({
    title: false,
    body: false,
  });

  const validation = () => {
    const titleSchema = z.string().min(1).max(50);
    const bodySchema = z.string().min(1).max(500);
    let title: string | null = null;
    let body: string | null = null;

    if (titleSchema.safeParse(titleRef.current?.innerText.trim()).success) {
      title = titleRef.current?.innerText.trim() || null;
    } else {
      title = null;
    }

    if (bodySchema.safeParse(bodyRef.current?.innerText.trim()).success) {
      body = bodyRef.current?.innerText.trim() || null;
    } else {
      body = null;
    }

    return { title, body };
  };

  const onTitleFocus = () => {
    setIsEditing(prev => ({
      ...prev,
      title: true,
      }));
  };

  const onBodyFocus = () => {
    setIsEditing(prev => ({
      ...prev,
      body: true,
    }));
  };

  const onBlur = () => {
    const { title, body } = validation();

    setIsEditing({
      title: false,
      body: false,
    });

    if (title === null || body === null) {
      titleRef.current!.innerText = todo.title;
      bodyRef.current!.innerText = todo.body;
      toast.error(
        <TostifyError errorMessage="Please do not leave the title or body empty." />,
      );
      return;
    }

    if (title === todo.title && body === todo.body) {
      return;
    }

    changeTodoMutation.mutate({
      _id: todo._id,
      completed: todo.completed,
      title: title ?? todo.title,
      body: body ?? todo.body,
    });
  };

  const onToggle = () => {
    const { title, body } = validation();

    if (title === null || body === null) {
      return;
    }

    changeTodoMutation.mutate({
      _id: todo._id,
      completed: !todo.completed,
      title: title ?? todo.title,
      body: body ?? todo.body,
    });
  };

  return (
    <div className="grid grid-cols-6 text-center border-b">
      <div className="text-purple-700">
        <button
          className="p-4"
          onClick={onToggle}
        >
          {todo.completed ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </button>
      </div>
      <div
        className={cn('col-span-2 p-4 flex justify-around items-center', {
          'line-through': todo.completed,
        })}
      >
        <h5
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={onBlur}
          ref={titleRef}
          className="w-3/4"
          onFocus={onTitleFocus}
        >
          {todo.title}
        </h5>
        {isEditing.title ? (
          <button
            onClick={() => {
              titleRef.current!.blur();

              setIsEditing(prev => ({
                ...prev,
                title: false,
              }));
            }}
          >
            <BorderColorIcon className="text-purple-700" />
          </button>
        ) : (
          <button
            onClick={() => {
              titleRef.current!.focus();
              setIsEditing(prev => ({
                ...prev,
                title: true,
              }));
            }}
          >
            <ModeEditIcon className="text-purple-700" />
          </button>
        )}
      </div>
      <div
        className={cn('col-span-2 p-4 flex justify-around items-center', {
          'line-through': todo.completed,
        })}
      >
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={onBlur}
          ref={bodyRef}
          className="w-3/4"
          onFocus={onBodyFocus}
        >
          {todo.body}
        </p>
        {isEditing.body ? (
          <button
            onClick={() => {
              bodyRef.current!.blur();

              setIsEditing(prev => ({
                ...prev,
                body: false,
              }));
            }}
          >
            <BorderColorIcon className="text-purple-700" />
          </button>
        ) : (
          <button
            onClick={() => {
              bodyRef.current!.focus();
              setIsEditing(prev => ({
                ...prev,
                body: true,
              }));
            }}
          >
            <ModeEditIcon className="text-purple-700" />
          </button>
        )}
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
