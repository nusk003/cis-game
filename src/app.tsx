import Amplify from "aws-amplify";
import { useCallback } from "react";
import "./App.css";
import awsExports from "./aws-exports";
import { Account, Game, Home } from "./components/pages";
import { useStore } from "./store";
import { useAuth, useSound } from "./utils/hooks";
Amplify.configure(awsExports);

function App() {
  useSound(
    "https://cis-game-assets.s3.amazonaws.com/Extreme-Sport-Trap-Music-PISTA.mp3"
  );

  const { gameStarted } = useStore(
    useCallback(({ gameStarted }) => ({ gameStarted }), [])
  );

  const { loggedIn } = useAuth();

  console.log(loggedIn);

  return loggedIn ? gameStarted ? <Game /> : <Home /> : <Account />;
}

export default App;
