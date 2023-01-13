import { useAddTodo } from '../hooks/useAddTodo';
import { useState } from 'react';
import { TextInput, Textarea, Modal, Group, Button } from '@mantine/core';
import { isOpen } from '../App';


export const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addTodoMutation = useAddTodo();

  const handleAddTodo = () => {
    addTodoMutation.mutate({ title, body });
    isOpen.value = false;
    setTitle('');
    setBody('');
  };

  return (
    <Modal
      opened={isOpen.value}
      onClose={() => isOpen.value = false}
      title="Add a new todo"
      centered
      size={400}
    >
      <TextInput
        placeholder="What would you like to do?"
        label="Title"
        withAsterisk
        required
        value={title}
        onChange={e => setTitle(e.currentTarget.value)}
      />

      <Textarea
        placeholder="Tell me more about it..."
        label="Body"
        withAsterisk
        required
        value={body}
        onChange={e => setBody(e.currentTarget.value)}
      />

      <Group
        position="center"
        style={{ marginTop: 60 }}
      >
        <Button
          onClick={handleAddTodo}
          color="violet"
          radius="md"
          size="lg"
          variant="outline"
        >
          Add Todo!
        </Button>
      </Group>
    </Modal>
  );
};
