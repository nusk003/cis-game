import styled from "styled-components";
import MatchStickVertical from "@src/assets/images/match_stick_vertical.png";
import MatchStickHorizontal from "@src/assets/images/match_stick_horizontal.png";
import { space, SpaceProps } from "styled-system";

export interface MatchStickProps extends SpaceProps {
  horizontal?: boolean;
}

const size = 100;

export const MatchStick = styled.img.attrs<MatchStickProps>(
  ({ horizontal }) => ({
    alt: "match_stick",
    src: horizontal ? MatchStickHorizontal : MatchStickVertical,
  })
)<MatchStickProps>`
  ${({ horizontal }) =>
    horizontal ? `width: ${size}px` : `height: ${size}px`};
  ${space}
`;
