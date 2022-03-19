import styled from "styled-components";
import { theme } from "@src/components/theme";
import React from "react";

interface ModalBackDropProps {
  visible: boolean;
}

const SModalBackDrop = styled.div<ModalBackDropProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: grid;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 20;
  transition: 0.2s all;
  visibility: ${(props): string => (props.visible ? "visible" : "hidden")};
  opacity: ${(props): number => (props.visible ? 1 : 0)};
`;

const SModalContent = styled.div`
  width: 600px;
  border: 1px solid ${theme.colors.lightMainColor};
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  padding: 16px;
`;

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const Modal: React.FC<Props> = ({ visible, onClose, children }) => {
  const handleWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <SModalBackDrop visible={visible} onClick={onClose}>
      <SModalContent onClick={handleWrapperClick}>{children}</SModalContent>
    </SModalBackDrop>
  );
};
