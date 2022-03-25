import create from "zustand";

export type RootState = {
  loggedIn: boolean;
  setLoggedIn: (loggedId: RootState["loggedIn"]) => void;

  sound: boolean;
  setSound: (loggedId: RootState["sound"]) => void;

  gameStarted: boolean;
  setGameStarted: (loggedId: RootState["gameStarted"]) => void;
};

export const useStore = create<RootState>((set) => ({
  loggedIn: false,
  setLoggedIn: (loggedIn) => set({ loggedIn }),

  gameStarted: false,
  setGameStarted: (gameStarted) => set({ gameStarted }),

  sound: false,
  setSound: (sound) => set({ sound }),
}));
