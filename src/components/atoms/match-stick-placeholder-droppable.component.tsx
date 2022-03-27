import { DigitPart } from "@src/components/molecules";
import React, { memo } from "react";
import { useDrop } from "react-dnd";
import { MatchStickPlaceholder, MatchStickPlaceholderProps } from ".";

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

export const MatchStickPlaceholderDroppable: React.FC<Props> = memo(
  ({ matchStickPart, onChange, ...rest }) => {
    const [{ isActive }, dropRef] = useDrop(() => ({
      accept: "MatchStick",
      drop: (item: DraggedItem) => onChange?.(matchStickPart, item),
      collect: (monitor) => ({
        item: monitor.getItem(),
        isActive: monitor.canDrop() && monitor.isOver(),
      }),
    }));

    return (
      <div ref={dropRef}>
        <MatchStickPlaceholder isActive={isActive} {...rest} />
      </div>
    );
  }
);
