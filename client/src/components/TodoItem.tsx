import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';

export const TodoItem = () => {
  return (
    <div className='grid grid-cols-6 text-center'>
      <div className='text-purple-700'>
        <button className='p-4'>
          <CheckCircleOutlineIcon />
          <CheckCircleIcon />
        </button>
      </div>
      <div className='col-span-2 p-4'>Title</div>
      <div className='col-span-2 p-4'>Body</div>
      <div>
        <button className='p-4'>
          <CloseIcon className='text-red-600' />
        </button>
      </div>
    </div>
  );
};
