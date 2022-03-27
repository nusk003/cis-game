import { Timer, TimerRef } from "@src/components/atoms";
import {
  GameSteps,
  Header,
  MatchStickEquation,
} from "@src/components/organisms";
import { GameOverModal, GameOverviewModal } from "@src/components/templates";
import { useGameEngine } from "@src/utils/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const SEquationWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
`;

const SContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  align-items: start;
  height: 100vh;
`;

export const Game = () => {
  const {
    question,
    currentStep,
    timeout,
    goToNextStep,
    totalSteps,
    checkEquation,
    addScore,
    paused,
    updateQuestions,
    quitGame,
  } = useGameEngine();

  const timerRef = useRef<TimerRef>(null);

  useEffect(() => {
    timerRef.current?.reset();
  }, [currentStep]);

  const [visibleOverviewModal, setVisibleOverviewModal] = useState<boolean>(
    false
  );

  const [visibleOverModal, setVisibleOverModal] = useState<boolean>(false);

  const closeOverviewModal = useCallback(() => {
    setVisibleOverviewModal(false);
  }, [setVisibleOverviewModal]);

  const openOverviewModal = useCallback(() => {
    setVisibleOverviewModal(true);
  }, [setVisibleOverviewModal]);

  const closeOverModal = useCallback(() => {
    setVisibleOverModal(false);
  }, [setVisibleOverModal]);

  const openOverModal = useCallback(() => {
    if (currentStep >= totalSteps) {
      timerRef.current?.stop();
      setVisibleOverModal(true);
    }
  }, [setVisibleOverModal, currentStep, totalSteps, timerRef]);

  const handleOnNext = useCallback(() => {
    addScore();
    updateQuestions(question);
    openOverModal();
    goToNextStep();
  }, [addScore, goToNextStep, question, updateQuestions, openOverModal]);

  const onGoToHome = useCallback(() => {
    closeOverModal();
    quitGame();
  }, [closeOverModal, quitGame]);

  return (
    <>
      <GameOverviewModal
        visible={visibleOverviewModal}
        onNewGame={() => timerRef.current?.reset()}
        onClose={closeOverviewModal}
      />
      <GameOverModal onGoToHome={onGoToHome} visible={visibleOverModal} />
      <SContainer>
        <Header onPauseClick={openOverviewModal} />
        <Timer
          onEnd={() => {
            openOverModal();
            goToNextStep();
          }}
          paused={paused}
          ref={timerRef}
          time={timeout}
          mt="24px"
        />
        <SEquationWrapper>
          {question ? (
            <MatchStickEquation
              onNext={handleOnNext}
              checkEquation={checkEquation}
              question={question}
            />
          ) : null}
        </SEquationWrapper>
        <GameSteps />
      </SContainer>
    </>
  );
};
