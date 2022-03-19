import styled from "styled-components";
import { space, SpaceProps, typography, TypographyProps } from "styled-system";
import { theme } from "@src/components/theme";

type StyledProps = TypographyProps & SpaceProps;

const H1 = styled.h1<StyledProps>`
  margin: 0px;
  background: ${theme.colors.mainGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px ${theme.colors.lightMainColor};
  ${typography};
  ${space}
`;

const P = styled.p<StyledProps>`
  margin: 0px;
  background: ${theme.colors.mainGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1px ${theme.colors.lightMainColor};
  ${typography};
  ${space}
`;

export const Text = { H1, P };
