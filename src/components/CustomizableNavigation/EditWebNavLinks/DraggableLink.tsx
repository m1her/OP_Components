import React, { useCallback, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";
import { NavLinkType } from "../data";
import { useDispatch } from "react-redux";
import { updateLinkTitle } from "../linksSlice";

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

  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const saveTitle = useCallback(() => {
    const newValue = inputRef.current?.value.trim();
    if (newValue)
      dispatch(updateLinkTitle({ id: linkData.id, newTitle: newValue }));
    setIsEditing(false);
  }, [dispatch, linkData.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        saveTitle();
        inputRef.current?.blur();
      }
    },
    [saveTitle]
  );

  return (
    <div
      ref={ref}
      onDoubleClick={() => setIsEditing(true)}
      className="select-none min-w-20 text-center rounded h-fit shadow-md bg-indigo-700 px-4 py-1 transition-opacity cursor-move"
      style={{ opacity: !isDragging ? 1 : 0.1 }}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          autoFocus
          defaultValue={linkData.title}
          className="bg-transparent border-b border-transparent focus:border-white focus:outline-none w-20"
          onKeyDown={handleKeyDown}
          onBlur={saveTitle}
          onDoubleClick={(e) => {
            e.stopPropagation();
            if (inputRef.current) {
              inputRef.current.select();
            }
          }}
        />
      ) : (
        linkData.title
      )}
    </div>
  );
};
