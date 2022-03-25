import { Text } from "@src/components/atoms";
import styled from "styled-components";
import { GameScore } from "@src/components/molecules";
import { BsFillPauseBtnFill } from "react-icons/bs";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import { theme } from "@src/components/theme";
import React, { useCallback, useState } from "react";
import { useStore } from "@src/store";

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

  const SoundIcon = sound ? SSoundIcon : SMuteIcon;

  const onSoundChange = useCallback(() => {
    setSound(!sound);
  }, [setSound, sound]);

  return (
    <SWrapper>
      <Text.H1>Math Stick</Text.H1>
      <GameScore />
      <SIcons>
        <SoundIcon
          color={theme.colors.lightMainColor}
          size="36px"
          onClick={onSoundChange}
        />
        <SPauseIcon
          onClick={onPauseClick}
          size="36px"
          color={theme.colors.lightMainColor}
        />
      </SIcons>
    </SWrapper>
  );
};
