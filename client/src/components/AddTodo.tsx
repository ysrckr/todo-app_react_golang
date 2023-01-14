import { Button, Group, Modal, TextInput, Textarea } from '@mantine/core';
import { useAddTodo } from '../hooks/useAddTodo';
import { TostifyError } from './TostifyError';
import { ModalTitle } from './ModalTitle';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { isOpen } from '../App';

export const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(false);

  const addTodoMutation = useAddTodo();

  const handleAddTodo = () => {
    if (!title) {
      toast.error(
        <TostifyError errorMessage="Please fill in the Title field" />,
      );
      setError(true);
      return;
    }

    if (!body) {
      toast.error(
        <TostifyError errorMessage="Please fill in the Body field" />,
      );
      setError(true);
      return;
    }

    addTodoMutation.mutate({ title, body });
    isOpen.value = false;
    setTitle('');
    setBody('');
    setError(false);
  };

  return (
    <Modal
      opened={isOpen.value}
      onClose={() => {
        isOpen.value = false;
        setTitle('');
        setBody('');
        setError(false);
      }}
      title={<ModalTitle />}
      centered
      size={600}
    >
      <TextInput
        placeholder="What would you like to do?"
        label="Title"
        error={error && !title && 'Please fill in the title field'}
        withAsterisk
        required
        value={title}
        onChange={e => {
          setTitle(e.currentTarget.value);
          setError(false);
        }}
        sx={{ marginBottom: 40 }}
      />

      <Textarea
        placeholder="Tell me more about it..."
        label="Body"
        error={error && !body && 'Please fill in the body field'}
        withAsterisk
        required
        value={body}
        onChange={e => {
          setBody(e.currentTarget.value);
          setError(false);
        }}
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
