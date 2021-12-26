import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  container?: boolean;
  className?: string;
}>;

function Layout({ children, className, container }: Props) {
  return (
    <div className={`${container ? "container" : ""} mx-auto p-4 ${className}`}>
      {children}
    </div>
  );
}

export default Layout;
