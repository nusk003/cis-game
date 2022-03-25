import { GameComplexity } from "@src/components/templates/home-settings-modal-general.component";
import create from "zustand";

export type RootState = {
  loggedIn: boolean;
  setLoggedIn: (loggedId: RootState["loggedIn"]) => void;

  sound: boolean;
  setSound: (loggedId: RootState["sound"]) => void;

  complexity: GameComplexity;
  setComplexity: (complexity: RootState["complexity"]) => void;

  gameStarted: boolean;
  setGameStarted: (loggedId: RootState["gameStarted"]) => void;

  step: number;
  setStep: (step: RootState["step"]) => void;
};

export const useStore = create<RootState>((set) => ({
  loggedIn: true,
  setLoggedIn: (loggedIn) => set({ loggedIn }),

  gameStarted: true,
  setGameStarted: (gameStarted) => set({ gameStarted }),

  sound: false,
  setSound: (sound) => set({ sound }),

  complexity: GameComplexity.Normal,
  setComplexity: (complexity) => set({ complexity }),

  step: 1,
  setStep: (step) => set({ step }),
}));
