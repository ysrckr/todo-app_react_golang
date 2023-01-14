import { Container } from '@mantine/core';
import { TodoItem } from './TodoItem';
import { useGetTodos } from '../hooks/useGetTodos';
import { Loader } from '@mantine/core';
import { Error } from './Error';

export const TodoList = () => {
  const { data: todos, isLoading, isError } = useGetTodos();
  if (isError) {
    return <Error />;
  }

  return (
    <div>
      <h1 className="text-purple-500 text-center text-3xl font-bold mb-10 mt-5">
        Todo List
      </h1>

      <Container
        size="md"
        px="xs"
      >
        <div className="grid grid-cols-6 text-center border-black shadow">
          <div className="text-purple-700 border">Completed</div>
          <div className="border col-span-2">Title</div>
          <div className="border col-span-2">Content</div>
          <div className="border">Delete</div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo._id}
              todo={todo}
            />
          ))
        )}
      </Container>
    </div>
  );
};
