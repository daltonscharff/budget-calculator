import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
  disabled?: boolean;
}>;

function Button({ className, disabled, children }: Props) {
  return (
    <button
      // tailwind CSS can make for long classNames, but is great for quick prototyping
      className={`w-full text-center font-bold text-white bg-emerald-600 rounded-lg cursor-pointer px-4 py-2 uppercase disabled:bg-gray-300 disabled:cursor-default ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
