import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { theme } from "@src/components/theme";

export const Input = styled.input<SpaceProps>`
  padding: 8px;
  border: 1px solid ${theme.colors.lightMainColor};
  border-radius: 8px;
  color: ${theme.colors.lightMainColor};
  background-color: rgba(0, 0, 0, 0.4);
  :focus {
    border: 2px solid ${theme.colors.lightMainColor};
    outline: none;
  }
  ${space}
`;
