import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

function Button({ children }: Props) {
  return (
    <button className="w-full text-center font-bold text-white bg-emerald-600 rounded-full px-8 py-4 mt-12 cursor-pointer">
      {children}
    </button>
  );
}

export default Button;
