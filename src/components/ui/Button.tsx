"use client";

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button className="h-9 rounded border px-3 hover:bg-slate-100 disabled:pointer-events-none" onClick={onClick}>
      {children}
    </button>
  );
}
