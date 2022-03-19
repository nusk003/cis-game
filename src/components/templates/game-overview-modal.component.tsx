import { Button } from "@src/components/atoms";
import { GameScore, Modal } from "@src/components/molecules";
import { useStore } from "@src/store";
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
}

export const GameOverviewModal: React.FC<Props> = ({ visible, onClose }) => {
  const { setGameStarted } = useStore(
    useCallback(({ setGameStarted }) => ({ setGameStarted }), [])
  );

  const quitGame = useCallback(() => {
    setGameStarted(false);
  }, []);

  return (
    <Modal visible={visible} onClose={onClose}>
      <SHeader>
        <GameScore type="High Score" />
        <Button buttonStyle="link" onClick={onClose}>
          <AiFillCloseCircle size="32px" />
        </Button>
      </SHeader>
      <SButtonsWrapper>
        <Button onClick={onClose} leftIcon={<AiFillPlayCircle size="32px" />}>
          Resume
        </Button>
        <Button onClick={onClose} leftIcon={<GiMatchHead size="32px" />}>
          Start a new game
        </Button>
        <Button onClick={quitGame} leftIcon={<RiShutDownLine size="32px" />}>
          Quit
        </Button>
      </SButtonsWrapper>
    </Modal>
  );
};
