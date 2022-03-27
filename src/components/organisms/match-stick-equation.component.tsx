import styled from "styled-components";
import {
  MatchStickDigit,
  MatchStickOperationType,
  MatchStickOperator,
  DigitPart,
} from "@src/components/molecules";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import React, { memo, useCallback, useEffect, useState } from "react";
import { getMatchStickParts, getNumberFromParts } from "@src/utils/helper";
import { v4 as uuid } from "uuid";
import { DraggedItem } from "@src/components/atoms";
import { useGameEngine } from "@src/utils/hooks";
import { GameQuestion } from "@src/utils/service";

const SWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 64px;
  width: fit-content;
`;

export type Equation = {
  inputs: Array<number>;
  operators: Array<
    MatchStickOperationType.Minus | MatchStickOperationType.Plus
  >;
  output: number;
};

interface Props {
  question: GameQuestion;
  onNext: () => void;
  checkEquation: (equation: Equation) => boolean;
}

export const MatchStickEquation: React.FC<Props> = memo(
  ({ question, onNext, checkEquation }) => {
    const [equation, setEquation] = useState<Equation>(question.wrong);

    useEffect(() => {
      setEquation(question.wrong);
    }, [question.wrong]);

    const onDrop = useCallback(
      (part: DigitPart, index = -1, item: DraggedItem) => {
        // if drag and drop are same digit

        let newEquation: Equation | undefined;

        if (index === item.index) {
          const number =
            index > -1 ? equation.inputs?.[index] : equation.output;
          const matchStickParts = getMatchStickParts(number);
          const newNumber = getNumberFromParts({
            ...matchStickParts,
            ...{ [part]: true, [item.part]: false },
          });
          if (newNumber || newNumber === 0) {
            if (index > -1) {
              const newInputs = [...equation.inputs];
              newInputs[index] = newNumber;
              newEquation = { ...equation, ...{ inputs: newInputs } };
            } else {
              newEquation = { ...equation, ...{ output: newNumber } };
            }
          }
        } else {
          const dropNumber =
            index > -1 ? equation.inputs[index] : equation.output;
          const dropMatchStickParts = getMatchStickParts(dropNumber);
          const newDropNumber = getNumberFromParts({
            ...dropMatchStickParts,
            ...{ [part]: true },
          });

          const dragNumber =
            item.index > -1 ? equation.inputs[item.index] : equation.output;
          const dragMatchStickParts = getMatchStickParts(dragNumber);
          const newDragMatchStickParts = {
            ...dragMatchStickParts,
            ...{ [item.part]: false },
          };
          const newDragNumber = getNumberFromParts(newDragMatchStickParts);
          if (
            (newDragNumber || newDragNumber === 0) &&
            (newDropNumber || newDropNumber === 0)
          ) {
            newEquation = { ...equation };
            const newInputs = [...newEquation.inputs];
            if (index > -1) {
              newInputs[index] = newDropNumber;
            } else {
              newEquation.output = newDropNumber;
            }
            if (item.index > -1) {
              newInputs[item.index] = newDragNumber;
            } else {
              newEquation.output = newDragNumber;
            }

            newEquation.inputs = newInputs;
          }
        }

        if (newEquation && checkEquation(newEquation)) {
          setEquation(newEquation);
          onNext();
        }
      },
      [equation, setEquation, checkEquation, onNext]
    );

    return (
      <DndProvider backend={HTML5Backend}>
        <SWrapper>
          {equation.inputs.map((input, index) => {
            const operator = equation.operators?.[index];
            return (
              <React.Fragment key={uuid()}>
                <MatchStickDigit
                  key={index}
                  index={index}
                  onDrop={(part, item) => onDrop(part, index, item)}
                  number={input}
                />
                {operator ? (
                  <MatchStickOperator
                    key={`${operator}-${index}-${uuid()}`}
                    type={operator}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
          <MatchStickOperator
            key={`equal-${uuid()}`}
            type={MatchStickOperationType.Equal}
          />
          <MatchStickDigit
            key={`output-${uuid()}`}
            index={-1}
            onDrop={(part, item) => onDrop(part, -1, item)}
            number={equation.output}
          />
        </SWrapper>
      </DndProvider>
    );
  }
);
