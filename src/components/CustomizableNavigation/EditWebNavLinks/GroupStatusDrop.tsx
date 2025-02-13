import React, { ReactNode, useRef } from "react";
import { useDrop } from "react-dnd";

export const GroupStatusDrop = ({
  children,
  isActiveEffect,
  filteringFunction,
}: {
  children: ReactNode;
  isActiveEffect: boolean;
  filteringFunction: (id: number) => void;
}) => {
  const [{ isOver }, dropRef] = useDrop({
    accept: "item",
    drop: (item: { index: number; id: number; isActive: boolean }) => {
      if (isActiveEffect != item.isActive) {
        filteringFunction(item.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  dropRef(ref);
  return (
    <div
      ref={ref}
      className={`flex w-full gap-6 items-center justify-center border rounded p-4
        ${
          isOver
            ? isActiveEffect
              ? "bg-green-500/10 hover:bg-transparent"
              : "bg-red-500/10 hover:bg-transparent"
            : ""
        }
        ${isActiveEffect ? "border-green-500" : "border-red-500"}
        `}
    >
      {children}
    </div>
  );
};
