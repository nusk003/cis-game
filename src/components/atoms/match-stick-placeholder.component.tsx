import styled from "styled-components";

export interface MatchStickPlaceholderProps {
  horizontal?: boolean;
  isActive?: boolean;
}

const size = 100;

export const MatchStickPlaceholder = styled.div<MatchStickPlaceholderProps>`
  height: ${({ horizontal, isActive }) =>
    horizontal ? (isActive ? "30px" : "5px") : `${size}px`};
  width: ${({ horizontal, isActive }) =>
    horizontal ? `${size}px` : isActive ? "30px" : "5px"};
  background-color: rgba(
    0,
    0,
    0,
    ${({ isActive }) => (isActive ? "0.5" : "0")}
  );
`;
