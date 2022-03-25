import { Timer, Text } from "@src/components/atoms";
import { MatchStickOperationType } from "@src/components/molecules";
import {
  Header,
  MatchStickEquation,
  GameSteps,
} from "@src/components/organisms";
import styled from "styled-components";
import { theme } from "@src/components/theme";
import { GameOverviewModal } from "@src/components/templates";
import { useCallback, useEffect, useState } from "react";
import { DigitBuildProps, getMatchStickParts } from "@src/utils/helper";
import { useGameEngine } from "@src/utils/hooks";

interface GameStepProps {
  active?: boolean;
}

const SGameStep = styled.div<GameStepProps>`
  border: 1px solid ${theme.colors.lightMainColor};
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: grid;
  justify-content: center;
  align-items: center;
  ${({ active }) => (active ? "background-color: rgba(0,0,0,0.4)" : "")};
`;

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
  const { equation } = useGameEngine();

  const [visibleOverviewModal, setVisibleOverviewModal] =
    useState<boolean>(false);

  const closeOverviewModal = useCallback(() => {
    setVisibleOverviewModal(false);
  }, [setVisibleOverviewModal]);

  const openOverviewModal = useCallback(() => {
    setVisibleOverviewModal(true);
  }, [setVisibleOverviewModal]);

  useEffect(() => {
    console.log(equation.correct);
  }, [equation]);

  return (
    <>
      <GameOverviewModal
        visible={visibleOverviewModal}
        onClose={closeOverviewModal}
      />
      <SContainer>
        <Header onPauseClick={openOverviewModal} />
        <Timer time={20} mt="24px" />
        <SEquationWrapper>
          <MatchStickEquation equation={equation.wrong} />
        </SEquationWrapper>
        <GameSteps />
      </SContainer>
    </>
  );
};
