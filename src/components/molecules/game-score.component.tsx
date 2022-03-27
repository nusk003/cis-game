import { FireAnimation, Text } from "@src/components/atoms";
import { useGameEngine } from "@src/utils/hooks";
import React from "react";
import styled from "styled-components";

const SWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const STextWrapper = styled.div``;
const SIconWrapper = styled.div``;

interface Props {
  score: number;
}

export const GameScore: React.FC<Props> = ({ score }) => {
  const { totalSteps } = useGameEngine();

  return (
    <SWrapper>
      <STextWrapper>
        <Text.P>Score</Text.P>
        <Text.H1>
          {score} / {totalSteps}
        </Text.H1>
      </STextWrapper>
      <SIconWrapper>
        <FireAnimation />
      </SIconWrapper>
    </SWrapper>
  );
};
