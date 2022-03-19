import { FireAnimation, Text } from "@src/components/atoms";
import React from "react";
import styled from "styled-components";

const SWrapper = styled.div`
  display: flex;
  flex-direction: rowflex;
  align-items: centerflex;
`;

const STextWrapper = styled.div``;
const SIconWrapper = styled.div``;

interface Props {
  type?: string;
}

export const GameScore: React.FC<Props> = ({ type = "Score" }) => {
  return (
    <SWrapper>
      <STextWrapper>
        <Text.P>{type}</Text.P>
        <Text.H1>1 / 10</Text.H1>
      </STextWrapper>
      <SIconWrapper>
        <FireAnimation />
      </SIconWrapper>
    </SWrapper>
  );
};
