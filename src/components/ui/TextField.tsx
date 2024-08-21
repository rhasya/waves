import React from "react";

interface TextFieldProps {
  className?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  type?: "text" | "password";
}

export default function TextField({ className, ...props }: TextFieldProps) {
  return <input className={"border px-2 py-1 outline-none" + (className && ` ${className}`)} {...props} />;
}
