import { TodoList } from './components/TodoList';
import { Group, Button } from '@mantine/core';
import { ToastContainer } from 'react-toastify';
import { signal } from '@preact/signals-react';
import { AddTodo } from './components/AddTodo';

export const isOpen = signal(false);

export const App = () => {
  return (
    <div>
      <TodoList />

      <AddTodo />

      <Group
        position="center"
        style={{ marginTop: 60 }}
      >
        <Button
          onClick={() => (isOpen.value = true)}
          color="violet"
          radius="md"
          size="lg"
          variant="outline"
        >
          Add New Todo
        </Button>
      </Group>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
