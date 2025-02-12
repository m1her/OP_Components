import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { NavLinkType } from "../data";

interface DragItem {
  index: number;
  id: number;
  isActive: boolean;
}

interface DraggableLinkProps {
  linkData: NavLinkType;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
  index: number;
}

export const DraggableLink: React.FC<DraggableLinkProps> = ({
  linkData,
  moveLink,
  index,
}) => {
  const [, dropRef] = useDrop({
    accept: "item",
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverActualX = (clientOffset as XYCoord).x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverActualX < hoverMiddleX) return;
      if (dragIndex > hoverIndex && hoverActualX > hoverMiddleX) return;

      if (monitor.isOver() && item.isActive) {
        moveLink(dragIndex, hoverIndex);
      }

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, dragRef] = useDrag({
    type: "item",
    item: { index, id: linkData.id, isActive: linkData.isActive },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const ref = useRef<HTMLDivElement>(null);
  dragRef(dropRef(ref));

  return (
    <div
      ref={ref}
      className="select-none min-w-20 text-center rounded h-fit shadow-md bg-indigo-700 px-4 py-1 transition-opacity cursor-move"
      style={{ opacity: !isDragging ? 1 : 0.1 }}
    >
      {linkData.title}
    </div>
  );
};
