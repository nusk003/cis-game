import { Text } from "@src/components/atoms";
import { theme } from "@src/components/theme";
import { useStore } from "@src/store";
import { useCallback } from "react";
import { BiVolumeFull, BiVolumeMute } from "react-icons/bi";
import styled from "styled-components";

const SOptionsWrapper = styled.div`
  margin-top: 16px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 8px;
`;

interface OptionProps {
  active?: boolean;
}

const SOption = styled.div<OptionProps>`
  padding: 8px;
  color: ${theme.colors.lightMainColor};
  border: ${({ active }) => (active ? "2px" : "1px")} solid
    ${theme.colors.lightMainColor};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  ${({ active }) => (active ? "font-weight: bold;" : "")}
  display: grid;
  cursor: pointer;
`;

const SSoundIcon = styled(BiVolumeFull)`
  cursor: pointer;
`;

const SMuteIcon = styled(BiVolumeMute)`
  cursor: pointer;
`;

export enum GameComplexity {
  Normal = "Normal",
  Intermediate = "Intermediate",
}

export const HomeSettingsModalGeneral = () => {
  const { sound, setSound, complexity, setComplexity } = useStore(
    useCallback(
      ({ setSound, sound, complexity, setComplexity }) => ({
        setSound,
        sound,
        complexity,
        setComplexity,
      }),
      []
    )
  );

  const SoundIcon = sound ? SSoundIcon : SMuteIcon;

  const toggleSound = useCallback(() => {
    setSound(!sound);
  }, [sound, setSound]);

  const onComplexityChange = useCallback(
    (complexity: GameComplexity) => {
      setComplexity(complexity);
    },
    [setComplexity]
  );

  const complexityOptions = [
    GameComplexity.Normal,
    GameComplexity.Intermediate,
  ];

  return (
    <>
      <Text.P mb="8px">Sound</Text.P>
      <SoundIcon
        onClick={toggleSound}
        color={theme.colors.lightMainColor}
        size="32px"
      />

      <Text.P mb="8px" mt="24px">
        Complexity
      </Text.P>
      <SOptionsWrapper>
        {complexityOptions.map((complexityOption) => (
          <SOption
            onClick={() => onComplexityChange(complexityOption)}
            active={complexity === complexityOption}
          >
            {complexityOption}
          </SOption>
        ))}
      </SOptionsWrapper>
    </>
  );
};
