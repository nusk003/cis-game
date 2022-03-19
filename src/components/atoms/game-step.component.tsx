import styled from "styled-components";
import { Text } from ".";
import { theme } from "@src/components/theme";
import React from "react";
import { AiFillLock } from "react-icons/ai";

interface Props {
  active?: boolean;
  step: number;
  locked?: boolean;
}

interface GameStepProps {
  active?: boolean;
}

const SWrapper = styled.div<GameStepProps>`
  border: 1px solid ${theme.colors.lightMainColor};
  width: 50px;
  height: 50px;
  border-radius: 8px;
  position: relative;
  display: grid;
  justify-content: center;
  align-items: center;
  ${({ active }) => (active ? "background-color: rgba(0,0,0,0.4)" : "")};
`;

const SLockIcon = styled(AiFillLock)`
  position: absolute;
  top: -10px;
  right: -10px;
`;

export const GameStep: React.FC<Props> = ({ step, active, locked }) => {
  return (
    <SWrapper active={active}>
      {locked ? (
        <SLockIcon size="24px" color={theme.colors.lightMainColor} />
      ) : null}
      <Text.H1>{step}</Text.H1>
    </SWrapper>
  );
};
