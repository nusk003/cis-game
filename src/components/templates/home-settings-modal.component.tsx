import { Text, Button } from "@src/components/atoms";
import { Modal } from "@src/components/molecules";
import { theme } from "@src/components/theme";
import React, { useCallback, useMemo, useState } from "react";
import { AiFillCloseCircle, AiFillSetting } from "react-icons/ai";
import styled from "styled-components";
import { HomeSettingsModalGeneral } from "./home-settings-modal-general.component";
import { HomeSettingsModalProfile } from "./home-settings-modal-profile.component";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const SWrapper = styled.div`
  margin-top: 16px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: flex-start;
  gap: 24px;
`;
const SSidebar = styled.div``;
const SSettings = styled.div`
  width: 100%;
  padding: 16px;
`;
const SGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
`;

interface OptionProps {
  active?: boolean;
}

const SSidebarMenuItem = styled.div<OptionProps>`
  padding: 8px;
  color: ${theme.colors.lightMainColor};
  align-items: center;
  ${({ active }) => (active ? "font-weight: bold;" : "")}
  display: grid;
  cursor: pointer;
`;

enum GameSettings {
  General = "General",
  Profile = "Profile",
}

export const HomeSettingsModal: React.FC<Props> = ({ visible, onClose }) => {
  const [settings, setSettings] = useState<GameSettings>(GameSettings.General);

  const settingMenuItems = [GameSettings.General, GameSettings.Profile];

  const onSettingChange = useCallback(
    (settings: GameSettings) => {
      setSettings(settings);
    },
    [setSettings]
  );

  const RenderSettings = useMemo(() => {
    if (settings === GameSettings.General) {
      return HomeSettingsModalGeneral;
    } else if (settings === GameSettings.Profile) {
      return HomeSettingsModalProfile;
    } else {
      return () => null;
    }
  }, [settings]);

  return (
    <Modal visible={visible} onClose={onClose}>
      <SGrid>
        <AiFillSetting color={theme.colors.lightMainColor} size="24px" />
        <Text.H1>Settings</Text.H1>
        <Button buttonStyle="link" onClick={onClose}>
          <AiFillCloseCircle size="32px" />
        </Button>
      </SGrid>
      <SWrapper>
        <SSidebar>
          {settingMenuItems.map((menuItem) => (
            <SSidebarMenuItem
              onClick={() => onSettingChange(menuItem)}
              active={menuItem === settings}
            >
              {menuItem}
            </SSidebarMenuItem>
          ))}
        </SSidebar>
        <SSettings>
          <RenderSettings />
        </SSettings>
      </SWrapper>
    </Modal>
  );
};
