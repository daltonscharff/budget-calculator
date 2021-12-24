import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  footer: JSX.Element;
}>;

function StickyFooterLayout({ children, footer }: Props) {
  return (
    <div className="flex flex-col max-h-screen">
      <div className="overflow-auto">{children}</div>
      <div>{footer}</div>
    </div>
  );
}

export default StickyFooterLayout;
