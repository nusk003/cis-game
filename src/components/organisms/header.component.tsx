import { Text } from "@src/components/atoms";
import { GameScore } from "@src/components/molecules";
import { theme } from "@src/components/theme";
import { useStore } from "@src/store";
import { useGameEngine } from "@src/utils/hooks";
import React, { useCallback } from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { BsFillPauseBtnFill } from "react-icons/bs";
import styled from "styled-components";

const SWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;

const SPauseIcon = styled(BsFillPauseBtnFill)`
  cursor: pointer;
  margin-left: 24px;
`;

const SSoundIcon = styled(BiVolumeFull)`
  cursor: pointer;
`;

const SMuteIcon = styled(BiVolumeMute)`
  cursor: pointer;
`;

const SIcons = styled.div``;

interface Props {
  onPauseClick: () => void;
}

export const Header: React.FC<Props> = ({ onPauseClick }) => {
  const { sound, setSound } = useStore(
    useCallback(
      ({ sound, setSound }) => ({
        sound,
        setSound,
      }),
      []
    )
  );

  const { pause, score } = useGameEngine();

  const pauseClickHandler = useCallback(() => {
    pause();
    onPauseClick();
  }, [pause, onPauseClick]);

  const SoundIcon = sound ? SSoundIcon : SMuteIcon;

  const onSoundChange = useCallback(() => {
    setSound(!sound);
  }, [setSound, sound]);

  return (
    <SWrapper>
      <Text.H1>Math Stick</Text.H1>
      <GameScore score={score} />
      <SIcons>
        <SoundIcon
          color={theme.colors.lightMainColor}
          size="36px"
          onClick={onSoundChange}
        />
        <SPauseIcon
          onClick={pauseClickHandler}
          size="36px"
          color={theme.colors.lightMainColor}
        />
      </SIcons>
    </SWrapper>
  );
};
