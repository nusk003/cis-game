import { useCallback } from "react";
import "./App.css";
import { Account, Game, Home } from "./components/pages";
import { useStore } from "./store";
import { useSound } from "./utils/hooks";

function App() {
  useSound(
    "https://cis-game-assets.s3.amazonaws.com/Extreme-Sport-Trap-Music-PISTA.mp3"
  );

  const { loggedIn, gameStarted } = useStore(
    useCallback(({ loggedIn, gameStarted }) => ({ loggedIn, gameStarted }), [])
  );

  return loggedIn ? gameStarted ? <Game /> : <Home /> : <Account />;
}

export default App;
