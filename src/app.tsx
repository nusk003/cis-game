import { useCallback } from "react";
import "./App.css";
import { Game, Account, Home } from "./components/pages";
import { useStore } from "./store";

function App() {
  const { loggedIn, gameStarted } = useStore(
    useCallback(({ loggedIn, gameStarted }) => ({ loggedIn, gameStarted }), [])
  );

  return loggedIn ? gameStarted ? <Game /> : <Home /> : <Account />;
}

export default App;
