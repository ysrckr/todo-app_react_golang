import { Container } from '@mantine/core';
import { TodoItem } from './TodoItem';



export const TodoList = () => {
  return (
    <div>
      <h1 className='text-purple-500 text-center text-bold text-xl mb-10 mt-5'>
        Todo List
      </h1>

      <Container size='md' px='xs'>
        <div className='grid grid-cols-6 text-center border border-black'>
          <div className='text-purple-700'>Completed</div>
          <div className='border border-black col-span-2'>Title</div>
          <div className='border border-black col-span-2'>Body</div>
          <div></div>
        </div>
        <TodoItem />
      </Container>
    </div>
  );
};
