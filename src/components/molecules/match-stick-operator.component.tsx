import React from "react";
import styled from "styled-components";
import { MatchStick } from "@src/components/atoms";

const SPlusOperator = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 150px;
  position: relative;
`;

const SStickWrapper = styled.div`
  width: 100%;
  position: absolute;
  display: grid;
  justify-content: center;
  align-items: center;
`;

export enum MatchStickOperationType {
  Plus = "Plus",
  Minus = "Minus",
  Equal = "Equal",
}

interface Props {
  type: MatchStickOperationType;
}

export const MatchStickOperator: React.FC<Props> = ({ type }) => {
  return (
    <SPlusOperator>
      {type === MatchStickOperationType.Plus ? (
        <SStickWrapper>
          <MatchStick />
        </SStickWrapper>
      ) : null}
      <SStickWrapper>
        {type === MatchStickOperationType.Equal ? (
          <>
            <MatchStick horizontal />
            <MatchStick mt="16px" horizontal />
          </>
        ) : (
          <MatchStick horizontal />
        )}
      </SStickWrapper>
    </SPlusOperator>
  );
};
