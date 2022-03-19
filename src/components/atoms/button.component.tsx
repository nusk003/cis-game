import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { theme } from "@src/components/theme";
import React from "react";

type StyledProps = SpaceProps & { buttonStyle?: "primary" | "link" };
type ButtonType = "button" | "submit" | "reset" | undefined;

const SButton = styled.button<Props>`
  padding: ${({ buttonStyle = "primary" }) =>
    buttonStyle === "link" ? "0px" : "16px"};
  color: ${theme.colors.lightMainColor};
  display: grid;
  grid-auto-flow: column;
  font-weight: bold;
  align-items: center;
  justify-content: ${({ leftIcon }) => (leftIcon ? "start" : "center")};
  gap: 8px;
  border: ${({ buttonStyle }) =>
    buttonStyle === "link"
      ? "none"
      : `1px solid ${theme.colors.lightMainColor}`};

  border-radius: 8px;
  background-color: rgba(
    0,
    0,
    0,
    ${({ buttonStyle = "primary" }) => (buttonStyle === "link" ? "0" : "0.5")}
  );
  cursor: pointer;
  ${space}
  ${({ buttonStyle }) =>
    buttonStyle === "link"
      ? ""
      : `:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }`};
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement>, StyledProps {
  leftIcon?: React.ReactNode;
  type?: ButtonType;
}

export const Button: React.FC<Props> = ({ leftIcon, children, ...rest }) => {
  return (
    <SButton {...rest}>
      {leftIcon ? leftIcon : null}
      {children}
    </SButton>
  );
};
