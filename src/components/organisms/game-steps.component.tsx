import styled from "styled-components";
import { GameStep } from "@src/components//atoms";
import { useGameEngine } from "@src/utils/hooks";
import { useMemo } from "react";

const SWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const GameSteps = () => {
  const { currentStep, totalSteps } = useGameEngine();

  const steps = useMemo(() => {
    const steps = [];
    for (let i = 0; i < totalSteps; i++) {
      const step = i + 1;
      steps.push(
        <GameStep
          step={step}
          active={step === currentStep}
          locked={step > currentStep}
        />
      );
    }
    return steps;
  }, [totalSteps, currentStep]);

  return <SWrapper>{steps}</SWrapper>;
};
