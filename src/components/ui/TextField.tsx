interface TextFieldProps
  extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "className" | "id" | "name" | "placeholder" | "maxLength"> {
  type?: "text" | "password";
}

export default function TextField({ className, ...props }: TextFieldProps) {
  return <input className={"border px-2 py-1 outline-none" + (className && ` ${className}`)} {...props} />;
}
