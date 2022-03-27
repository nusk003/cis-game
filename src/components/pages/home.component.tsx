import { Button, FireAnimation, Text } from "@src/components/atoms";
import { HomeSettingsModal } from "@src/components/templates";
import { useStore } from "@src/store";
import { useAuth } from "@src/utils/hooks";
import { useCallback, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GiMatchHead } from "react-icons/gi";
import styled from "styled-components";

const SWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SButtonsWrapper = styled.div`
  width: 500px;
  display: grid;
  gap: 24px;
  margin-top: 32px;
`;

const SProfile = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
`;

const SHello = styled.div``;
const SRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Home = () => {
  const [visibleSettingsModal, setVisibleSettingsModal] = useState<boolean>(
    false
  );
  const { setGameStarted } = useStore(
    useCallback(({ setGameStarted }) => ({ setGameStarted }), [])
  );

  const { logout, currentUser } = useAuth();

  const name = currentUser?.attributes?.name;

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const closeSettingsModal = useCallback(() => {
    setVisibleSettingsModal(false);
  }, [setVisibleSettingsModal]);

  const openSettingsModal = useCallback(() => {
    setVisibleSettingsModal(true);
  }, [setVisibleSettingsModal]);

  const onLogout = useCallback(async () => {
    await logout();
  }, [logout]);

  return (
    <SWrapper>
      <HomeSettingsModal
        visible={visibleSettingsModal}
        onClose={closeSettingsModal}
      />
      <div>
        <SRow>
          <SProfile>
            <FireAnimation />
            <SHello>
              <Text.P>Hello,</Text.P>
              <Text.H1>{name}</Text.H1>
            </SHello>
          </SProfile>
          <Text.H1>Math Stick</Text.H1>
        </SRow>
        <SButtonsWrapper>
          <Button onClick={startGame} leftIcon={<GiMatchHead size="24px" />}>
            Start Game
          </Button>
          <Button
            onClick={openSettingsModal}
            leftIcon={<AiFillSetting size="24px" />}
          >
            Settings
          </Button>
          <Button onClick={onLogout} leftIcon={<BiLogOut size="24px" />}>
            Logout
          </Button>
        </SButtonsWrapper>
      </div>
    </SWrapper>
  );
};
