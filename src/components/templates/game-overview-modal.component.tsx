import { Button } from "@src/components/atoms";
import { GameScore, Modal } from "@src/components/molecules";
import { useGameEngine } from "@src/utils/hooks";
import React, { useCallback } from "react";
import { AiFillCloseCircle, AiFillPlayCircle } from "react-icons/ai";
import { GiMatchHead } from "react-icons/gi";
import { RiShutDownLine } from "react-icons/ri";
import styled from "styled-components";

const SHeader = styled.div`
  display: grid;
  justify-content: space-between;
  align-items: flex-start;
  grid-auto-flow: column;
`;

const SButtonsWrapper = styled.div`
  display: grid;
  gap: 16px;
  grid-auto-flow: row;
  margin-top: 40px;
`;

interface Props {
  visible: boolean;
  onClose: () => void;
  onNewGame: () => void;
}

export const GameOverviewModal: React.FC<Props> = ({
  visible,
  onClose,
  onNewGame,
}) => {
  const { resume, quitGame, startNewGame, score } = useGameEngine();

  const onCloseHandler = useCallback(() => {
    onClose();
    resume();
  }, [onClose, resume]);

  const onStartNewGame = useCallback(() => {
    onClose();
    onNewGame();
    startNewGame();
  }, [onClose, startNewGame, onNewGame]);

  return (
    <Modal visible={visible} onClose={onCloseHandler}>
      <SHeader>
        <GameScore score={score} />
        <Button buttonStyle="link" onClick={onCloseHandler}>
          <AiFillCloseCircle size="32px" />
        </Button>
      </SHeader>
      <SButtonsWrapper>
        <Button
          onClick={onCloseHandler}
          leftIcon={<AiFillPlayCircle size="32px" />}
        >
          Resume
        </Button>
        <Button onClick={onStartNewGame} leftIcon={<GiMatchHead size="32px" />}>
          Start a new game
        </Button>
        <Button onClick={quitGame} leftIcon={<RiShutDownLine size="32px" />}>
          Quit
        </Button>
      </SButtonsWrapper>
    </Modal>
  );
};
