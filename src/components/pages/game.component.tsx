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
import { useCallback, useState } from "react";

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
  const [visibleOverviewModal, setVisibleOverviewModal] =
    useState<boolean>(false);

  const closeOverviewModal = useCallback(() => {
    setVisibleOverviewModal(false);
  }, [setVisibleOverviewModal]);

  const openOverviewModal = useCallback(() => {
    setVisibleOverviewModal(true);
  }, [setVisibleOverviewModal]);

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
          <MatchStickEquation
            equation={{
              inputs: [1, 6, 1],
              operators: [
                MatchStickOperationType.Plus,
                MatchStickOperationType.Minus,
              ],
              output: 8,
            }}
          />
        </SEquationWrapper>
        <GameSteps />
      </SContainer>
    </>
  );
};
