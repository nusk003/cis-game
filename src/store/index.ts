import create from "zustand";

export type RootState = {
  loggedIn: boolean;
  setLoggedIn: (loggedId: RootState["loggedIn"]) => void;

  gameStarted: boolean;
  setGameStarted: (loggedId: RootState["gameStarted"]) => void;
};

export const useStore = create<RootState>((set) => ({
  loggedIn: true,
  setLoggedIn: (loggedIn) => set({ loggedIn }),

  gameStarted: true,
  setGameStarted: (gameStarted) => set({ gameStarted }),
}));
