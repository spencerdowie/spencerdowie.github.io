import { PropsWithChildren } from "react";

interface BubbleProps extends PropsWithChildren {
  selected?: boolean;
  onClick?: () => void;
}

export default function Bubble({ children, selected, onClick }: BubbleProps) {
  const colour = selected ? "bg-blue-900 border-2" : "bg-blue-950";
  return (
    <div
      className={"py-1 px-3 rounded-4xl shrink hover:bg-blue-800 " + colour}
      onClick={onClick}>
      {children}
    </div>
  );
}
