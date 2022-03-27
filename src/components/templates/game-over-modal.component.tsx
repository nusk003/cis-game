import { Button, Text } from "@src/components/atoms";
import {
  GameScore,
  MatchStickOperationType,
  Modal,
} from "@src/components/molecules";
import { Equation } from "@src/components/organisms";
import { theme } from "@src/components/theme";
import { useGameEngine } from "@src/utils/hooks";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { SiVerizon } from "react-icons/si";
import styled from "styled-components";

interface Props {
  visible: boolean;
  onGoToHome: () => void;
}

const SWrapper = styled.div`
  display: grid;
  align-items: center;
`;

const SHead = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
`;

const STable = styled.table`
  margin-top: 16px;
`;
const STRow = styled.tr``;
const STHead = styled.thead``;
const STHeadCell = styled.th`
  color: ${theme.colors.lightMainColor};
  padding: 8px;
`;
const STCell = styled.td`
  color: ${theme.colors.lightMainColor};
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
`;
const STBody = styled.tbody``;

const getEquationAsString = (equation: Equation) => {
  let equationStr = "";
  equation.inputs.forEach((input, index) => {
    if (index === 0) {
      equationStr += input;
    } else {
      const symbol =
        equation.operators[index - 1] === MatchStickOperationType.Plus
          ? "+"
          : "-";
      equationStr += " " + symbol + " " + input;
    }
  });

  equationStr += " = " + equation.output;

  return equationStr;
};

export const GameOverModal: React.FC<Props> = ({ visible, onGoToHome }) => {
  const { score, questions } = useGameEngine();

  return (
    <Modal onClose={() => undefined} visible={visible}>
      <SWrapper>
        <SHead>
          <Text.H1>Game Over</Text.H1>
          <GameScore score={score} />
        </SHead>
        <STable>
          <STHead>
            <STRow>
              <STHeadCell>Question</STHeadCell>
              <STHeadCell>Correct Answer</STHeadCell>
              <STHeadCell>Your answer</STHeadCell>
            </STRow>
          </STHead>
          <STBody>
            {questions?.map(({ wrong, correct, answered, id }) => (
              <STRow key={id}>
                <STCell>{getEquationAsString(wrong)}</STCell>
                <STCell>{getEquationAsString(correct)}</STCell>
                <STCell>
                  {answered ? (
                    <SiVerizon color="#33b864" />
                  ) : (
                    <AiOutlineClose color="red" />
                  )}
                </STCell>
              </STRow>
            ))}
          </STBody>
        </STable>
        <Button onClick={onGoToHome} mt="24px">
          Go to home
        </Button>
      </SWrapper>
    </Modal>
  );
};
