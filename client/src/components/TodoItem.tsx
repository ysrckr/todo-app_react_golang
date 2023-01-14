import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useChangeTodo } from '../hooks/useChangeTodo';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import CloseIcon from '@mui/icons-material/Close';
import { useGetTodo } from '../hooks/useGetTodo';
import { TostifyError } from './TostifyError';
import { FC, useRef, useState } from 'react';
import { TodoColumn } from './TodoColumn';
import { toast } from 'react-toastify';
import { z } from 'zod';

interface TodoItemProps {
  id: string;
}

export const TodoItem: FC<TodoItemProps> = ({ id }) => {
  const deleteMutation = useDeleteTodo();
  const changeTodoMutation = useChangeTodo();
  const { data: todo, isError, isLoading } = useGetTodo(id);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isEditing, setIsEditing] = useState({
    title: false,
    body: false,
  });

  if (isLoading || isError) {
    return null;
  }

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
    if (titleRef.current !== null) {
      titleRef.current.focus();
    }

    setIsEditing(prev => ({
      ...prev,
      title: true,
    }));
  };

  const onBodyFocus = () => {
    if (bodyRef.current !== null) {
      bodyRef.current.focus();
    }

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

    if (
      (title === null || body === null) &&
      titleRef.current !== null &&
      bodyRef.current !== null
    ) {
      titleRef.current.innerText = todo.title;
      bodyRef.current.innerText = todo.body;
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
      <TodoColumn
        id={todo._id}
        type="title"
        htmlRef={titleRef}
        isEditing={isEditing.title}
        onFocus={onTitleFocus}
        onBlur={onBlur}
      />
      <TodoColumn
        id={todo._id}
        type="body"
        htmlRef={bodyRef}
        isEditing={isEditing.body}
        onFocus={onBodyFocus}
        onBlur={onBlur}
      />
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
