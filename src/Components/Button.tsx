import React from 'react';

type Props = {
  children: React.ReactNode;
  onClick?: () => void // or React.ReactElement
};

const Button: React.FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
};

export default Button;

