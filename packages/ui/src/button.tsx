"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick: ()=>void;
}

export const Button = ({ children, onClick,className }: ButtonProps) => {
  return (
    <button
    type="button"
    className="text-white bg-blue-600 rounded-md px-3 py-1 font-semibold"
    onClick={onClick}
    >
      {children}
    </button>
  );
};
