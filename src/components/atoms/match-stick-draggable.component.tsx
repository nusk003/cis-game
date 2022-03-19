import React, { useState } from "react";
import { useDrag, DragPreviewImage } from "react-dnd";
import { MatchStick, MatchStickProps } from ".";
import MatchStickVertical from "@src/assets/images/match_stick_small_vertical.png";
import MatchStickHorizontal from "@src/assets/images/match_stick_small_horizontal.png";
import { v4 } from "uuid";

interface Props extends MatchStickProps {
  matchStickPart: string;
  index: number;
}

export const MatchStickDraggable: React.FC<Props> = ({
  matchStickPart,
  index,
  ...rest
}) => {
  const [horizontal, setHorizontal] = useState<boolean>(
    rest.horizontal || false
  );
  const [{ opacity }, dragRef, preview] = useDrag(() => ({
    type: "MatchStick",
    item: {
      index,
      part: matchStickPart,
      horizontal: !!rest.horizontal,
      setStyle: (horizontal: boolean) => {
        console.log("horizontal", horizontal);
        setHorizontal(horizontal);
      },
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  }));

  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={horizontal ? MatchStickHorizontal : MatchStickVertical}
        key={v4()}
      />
      <div ref={dragRef} style={{ opacity, cursor: "pointer" }}>
        <MatchStick {...rest} />
      </div>
    </>
  );
};
