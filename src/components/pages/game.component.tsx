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

  // useEffect(() => {
  //   const questions = [];
  //   const randomNumber1 = Math.random() * 10;
  //   const randomNumber2 = Math.random() * 10;
  //   if (randomNumber1 >= 10 || randomNumber2 >= 10) {
  //     // loop
  //   }

  //   const realOutput =
  //     (Math.random() * 10) % 2 === 0
  //       ? randomNumber1 + randomNumber2
  //       : randomNumber1 - randomNumber2;

  //   if (realOutput >= 10 || realOutput < 0) {
  //     // loop
  //   }

  //   const randomNumber1Parts = getMatchStickParts(randomNumber1);
  //   const randomNumber2Parts = getMatchStickParts(randomNumber2);
  //   const realOutputParts = getMatchStickParts(realOutput);

  //   const breakIdentifier = Math.random() * 10;

  //   let lossDigit: DigitBuildProps;
  //   let addDigit: DigitBuildProps;

  //   if (breakIdentifier > 5) {
  //     lossDigit = randomNumber1Parts;
  //     addDigit = randomNumber2Parts;
  //   } else if (breakIdentifier === 5) {
  //     lossDigit = randomNumber1Parts;
  //     addDigit = realOutputParts;
  //   } else {
  //     lossDigit = randomNumber2Parts;
  //     addDigit = realOutputParts;
  //   }

  //   Object.keys(lossDigit).map((key) => {
  //     if ((lossDigit as any)[key]) {
  //     }
  //   });
  // }, []);

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
              inputs: [1, 6],
              operators: [MatchStickOperationType.Plus],
              output: 8,
            }}
          />
        </SEquationWrapper>
        <GameSteps />
      </SContainer>
    </>
  );
};
