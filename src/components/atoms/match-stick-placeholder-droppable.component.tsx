import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { MatchStickPlaceholder, MatchStickPlaceholderProps } from ".";
import { DigitPart } from "@src/components/molecules";

export interface DraggedItem {
  index: number;
  part: DigitPart;
  setStyle: (horizontal: boolean) => void;
  horizontal: boolean;
}

interface Props extends MatchStickPlaceholderProps {
  matchStickPart: DigitPart;
  onChange?: (part: DigitPart, item: DraggedItem) => void;
}

export const MatchStickPlaceholderDroppable: React.FC<Props> = ({
  matchStickPart,
  onChange,
  ...rest
}) => {
  const [{ isActive, item }, dropRef] = useDrop(() => ({
    accept: "MatchStick",
    drop: (item: DraggedItem) => onChange?.(matchStickPart, item),
    collect: (monitor) => ({
      item: monitor.getItem(),
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (item) {
      if (isActive) {
        item.setStyle(!!rest.horizontal);
      } else {
        item.setStyle(item.horizontal);
      }
    }
  }, [isActive]);

  return (
    <div ref={dropRef}>
      <MatchStickPlaceholder isActive={isActive} {...rest} />
    </div>
  );
};
