import { useStore } from "@src/store";
import { GameEngine } from "@src/utils/service";
import { useCallback, useMemo } from "react";

export const useGameEngine = () => {
  const gameEngine = GameEngine.instance;
  const { complexity, step, setStep } = useStore(
    useCallback(
      ({ complexity, step, setStep }) => ({ complexity, step, setStep }),
      []
    )
  );

  const equations = useMemo(
    () => gameEngine.generateEquations(complexity),
    [complexity]
  );

  const equation = useMemo(() => equations[step - 1], [equations, step]);

  const goToNextStep = useCallback(() => {
    console.log("Inside", step);
    setStep(step + 1);
  }, [setStep, step]);

  return {
    equation,
    currentStep: step,
    totalSteps: gameEngine._steps,
    checkEquation: gameEngine.checkEquation,
    goToNextStep,
  };
};
