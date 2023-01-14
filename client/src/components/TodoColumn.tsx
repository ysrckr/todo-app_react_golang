import BorderColorIcon from '@mui/icons-material/BorderColor';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { useGetTodo } from '../hooks/useGetTodo';
import cn from 'classnames';
import { FC } from 'react';

type TodoColumnProps = {
  id: string;
  htmlRef:
    | React.RefObject<HTMLHeadingElement>
    | React.RefObject<HTMLParagraphElement>;
  type: 'title' | 'body';
  onBlur: () => void;
  onFocus: () => void;
  isEditing: boolean;
};

export const TodoColumn: FC<TodoColumnProps> = ({
  id,
  htmlRef,
  type,
  onBlur,
  onFocus,
  isEditing,
}) => {
  const { data: todo, isError, isLoading } = useGetTodo(id);

  return (
    <div
      className={cn('col-span-2 p-4 flex justify-around items-center', {
        'line-through': todo?.completed,
      })}
    >
      {type === 'title' ? (
        <h5
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={onBlur}
          ref={htmlRef}
          className="w-3/4 font-medium"
          onFocus={onFocus}
        >
          {!isLoading && !isError && todo.title}
        </h5>
      ) : (
        <p
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={onBlur}
          ref={htmlRef}
          className="w-3/4"
          onFocus={onFocus}
        >
          {!isLoading && !isError && todo.body}
        </p>
      )}
      {isEditing ? (
        <button onClick={onBlur}>
          <BorderColorIcon className="text-purple-700" />
        </button>
      ) : (
        <button onClick={onFocus}>
          <ModeEditIcon className="text-purple-700" />
        </button>
      )}
    </div>
  );
};
