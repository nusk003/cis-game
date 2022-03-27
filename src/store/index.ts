import { GameComplexity } from "@src/components/templates/home-settings-modal-general.component";
import { GameQuestion } from "@src/utils/service";
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

  questions: GameQuestion[];
  setQuestions: (questions: RootState["questions"]) => void;

  gamePaused: boolean;
  setGamePaused: (gamePaused: RootState["gamePaused"]) => void;

  step: number;
  setStep: (step: RootState["step"]) => void;

  score: number;
  setScore: (score: RootState["score"]) => void;
};

export const useStore = create<RootState>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn) => set({ loggedIn }),

  gameStarted: false,
  setGameStarted: (gameStarted) => set({ gameStarted }),

  gamePaused: false,
  setGamePaused: (gamePaused) => set({ gamePaused }),

  questions: [],
  setQuestions: (questions) => set({ questions }),

  score: 0,
  setScore: (score) => set({ score }),

  sound: false,
  setSound: (sound) => set({ sound }),

  complexity: GameComplexity.Normal,
  setComplexity: (complexity) => set({ complexity }),

  step: 1,
  setStep: (step) => set({ step }),
}));
