import { useStore } from "@src/store";
import { GameEngine, GameQuestion } from "@src/utils/service";
import { useCallback, useEffect, useMemo } from "react";

export const useGameEngine = () => {
  const gameEngine = GameEngine.instance;
  const {
    complexity,
    step,
    setStep,
    gamePaused,
    setGamePaused,
    setGameStarted,
    gameStarted,
    score,
    setScore,
    setQuestions,
    questions,
  } = useStore(
    useCallback(
      ({
        complexity,
        step,
        setStep,
        gamePaused,
        setGamePaused,
        gameStarted,
        score,
        setScore,
        setGameStarted,
        setQuestions,
        questions,
      }) => ({
        complexity,
        step,
        setStep,
        gamePaused,
        setGamePaused,
        setGameStarted,
        gameStarted,
        setQuestions,
        questions,
        score,
        setScore,
      }),
      []
    )
  );

  useEffect(() => {
    if (gameStarted) {
      setQuestions(gameEngine.generateEquations(complexity));
    }
  }, [gameStarted]);

  const updateQuestions = useCallback(
    (gameQuestion: GameQuestion) => {
      const newSummary = [...questions];
      const index = questions.findIndex(({ id }) => id === gameQuestion.id);
      if (index > -1) newSummary[index] = { ...gameQuestion, answered: true };

      setQuestions(newSummary);
    },
    [questions, setQuestions]
  );

  const question = useMemo(() => questions[step - 1], [questions, step]);

  const goToNextStep = useCallback(() => {
    setStep(step + 1);
  }, [setStep, step]);

  const quitGame = useCallback(() => {
    setScore(0);
    setStep(1);
    setGameStarted(false);
    setGamePaused(false);
    setQuestions([]);
  }, [setScore, setGameStarted, setGamePaused, setStep, setQuestions]);

  const startNewGame = useCallback(() => {
    setScore(0);
    setStep(1);
    setGamePaused(false);
    const newQuestions = gameEngine.generateEquations(complexity);
    setQuestions(newQuestions);
  }, [
    complexity,
    setQuestions,
    setScore,
    setStep,
    setGameStarted,
    setGamePaused,
  ]);

  return {
    question,
    currentStep: step,
    totalSteps: gameEngine._steps,
    checkEquation: useCallback(gameEngine.checkEquation, []),
    goToNextStep,
    timeout: 20,
    questions,
    paused: useMemo(() => gamePaused, [gamePaused]),
    pause: useCallback(() => setGamePaused(true), [setGamePaused]),
    resume: useCallback(() => setGamePaused(false), [setGamePaused]),
    score,
    addScore: useCallback(() => setScore(score + 1), [score, setScore]),
    quitGame,
    updateQuestions,
    startNewGame,
  };
};
