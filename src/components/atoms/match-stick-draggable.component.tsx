import React, { memo, useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { MatchStick, MatchStickProps } from ".";
import MatchStickVertical from "@src/assets/images/match_stick_small_vertical.png";
import MatchStickHorizontal from "@src/assets/images/match_stick_small_horizontal.png";
import { v4 } from "uuid";

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
