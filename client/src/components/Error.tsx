import { Button } from '@mantine/core';
import { useGetTodos } from '../hooks/useGetTodos';
import { useState } from 'react';

export const Error = () => {
  const { refetch } = useGetTodos();
  const [count, setCount] = useState(0);

  return (
    <div>
      <p className="italic text-red-700">Error fetching todos</p>
      <Button
        onClick={() => {
          if (count > 3) {
            return;
          }

          refetch();
          setCount(prevCount => prevCount + 1);
        }}
      >
        Retry
      </Button>
    </div>
  );
};
