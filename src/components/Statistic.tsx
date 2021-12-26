import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  label: string;
  className?: string;
}>;

function Statistic({ label, className, children }: Props) {
  return (
    <div className={`text-center p-4 ${className}`}>
      <div className="uppercase font-extrabold">{label}</div>
      <div className="text-2xl">{children}</div>
    </div>
  );
}

export default Statistic;
