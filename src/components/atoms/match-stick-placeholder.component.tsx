import styled from "styled-components";

export interface MatchStickPlaceholderProps {
  horizontal?: boolean;
  isActive?: boolean;
}

export const MatchStickPlaceholder = styled.div<MatchStickPlaceholderProps>`
  height: ${({ horizontal, isActive }) =>
    horizontal ? (isActive ? "30px" : "10px") : "150px"};
  width: ${({ horizontal, isActive }) =>
    horizontal ? "150px" : isActive ? "30px" : "10px"};
`;
