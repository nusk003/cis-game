import {
  MatchStickDraggable,
  MatchStickPlaceholderDroppable,
} from "@src/components/atoms";
import { getMatchStickParts } from "@src/utils/helper";
import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import { grid, GridProps } from "styled-system";
import { DraggedItem } from "@src/components/atoms";

export type DigitPart = "a" | "b" | "c" | "d" | "e" | "f" | "g";

interface Props {
  number: number;
  index: number;
  onDrop: (part: DigitPart, item: DraggedItem) => void;
}

const size = 100;

const SWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  width: ${size}px;
  height: ${size * 2 + 15}px;
`;

const SRowStickWrapper = styled.div<GridProps>`
  display: grid;
  grid-auto-flow: row;
  ${grid};
`;

export const MatchStickDigit: React.FC<Props> = memo(
  ({ index, number, onDrop }) => {
    const digitBuild = useMemo(() => {
      return getMatchStickParts(number);
    }, [number]);

    const renderStick = useCallback(
      (part: DigitPart, horizontal = false) => {
        let RenderComponent;
        if (digitBuild[part]) {
          RenderComponent = MatchStickDraggable;
        } else {
          RenderComponent = MatchStickPlaceholderDroppable;
        }

        return (
          <RenderComponent
            index={index}
            onChange={onDrop}
            matchStickPart={part}
            horizontal={horizontal}
          />
        );
      },
      [digitBuild, index]
    );

    return (
      <SWrapper>
        <SRowStickWrapper>
          {renderStick("f")}
          {renderStick("e")}
        </SRowStickWrapper>
        <SRowStickWrapper gridGap={`${size - 15}px`}>
          {renderStick("a", true)}
          {renderStick("g", true)}
          {renderStick("d", true)}
        </SRowStickWrapper>
        <SRowStickWrapper>
          {renderStick("b")}
          {renderStick("c")}
        </SRowStickWrapper>
      </SWrapper>
    );
  }
);
