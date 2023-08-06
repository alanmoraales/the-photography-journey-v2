import { ReactNode } from "react";

interface IWhenProps {
  children: ReactNode;
  condition: boolean;
}

const When = ({ children, condition }: IWhenProps) => {
  if (condition) {
    return <>{children}</>;
  }

  return null;
};

export default When;
