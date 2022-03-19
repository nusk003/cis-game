import styled from "styled-components";
import { Button, Text, FireAnimation } from "@src/components/atoms";
import { GiMatchHead } from "react-icons/gi";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useCallback, useState } from "react";
import { useStore } from "@src/store";
import { HomeSettingsModal } from "@src/components/templates";

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
  const [visibleSettingsModal, setVisibleSettingsModal] =
    useState<boolean>(false);
  const { setGameStarted, setLoggedIn } = useStore(
    useCallback(
      ({ setGameStarted, setLoggedIn }) => ({ setGameStarted, setLoggedIn }),
      []
    )
  );

  const startGame = useCallback(() => {
    setGameStarted(true);
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
  }, []);

  const closeSettingsModal = useCallback(() => {
    setVisibleSettingsModal(false);
  }, [setVisibleSettingsModal]);

  const openSettingsModal = useCallback(() => {
    setVisibleSettingsModal(true);
  }, [setVisibleSettingsModal]);

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
              <Text.H1>Nusky</Text.H1>
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
          <Button onClick={logout} leftIcon={<BiLogOut size="24px" />}>
            Logout
          </Button>
        </SButtonsWrapper>
      </div>
    </SWrapper>
  );
};
