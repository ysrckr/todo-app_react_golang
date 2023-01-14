import { FC } from 'react';

type TostifyErrorProps = {
  errorMessage: string;
};

export const TostifyError: FC<TostifyErrorProps> = ({ errorMessage }) => {
  return <p className="italic text-red-700">{errorMessage}</p>;
};
