import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
}>;

function Button({ className, disabled, children }: Props) {
  return (
    <button
      className={`w-full text-center font-bold text-white bg-emerald-600 rounded-full cursor-pointer px-4 py-2 disabled:bg-gray-300 disabled:cursor-default ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
