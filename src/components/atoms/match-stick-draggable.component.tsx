import React, { memo } from "react";
import { useDrag } from "react-dnd";
import { MatchStick, MatchStickProps } from ".";

interface Props extends MatchStickProps {
  matchStickPart: string;
  index: number;
}

export const MatchStickDraggable: React.FC<Props> = memo(
  ({ matchStickPart, index, ...rest }) => {
    const [{ opacity }, dragRef] = useDrag(() => ({
      type: "MatchStick",
      item: {
        index,
        part: matchStickPart,
        horizontal: !!rest.horizontal,
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0 : 1,
      }),
    }));

    return (
      <div ref={dragRef} style={{ opacity, cursor: "pointer" }}>
        <MatchStick {...rest} />
      </div>
    );
  }
);
