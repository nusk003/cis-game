import React from "react";
import styled from "styled-components";
import { GameStep } from "@src/components//atoms";

const SWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const GameSteps = () => {
  return (
    <SWrapper>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
        <GameStep step={step} active={step === 1} locked={step !== 1} />
      ))}
    </SWrapper>
  );
};
