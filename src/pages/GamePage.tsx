import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TicTacToe from "../components/TicTacToe";

const GamePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const turnFromParams = searchParams.get("turn") || "X";
  const modeFromParams = searchParams.get("mode") || "player";

  useEffect(() => {
    if (!searchParams.has("turn")) {
      setSearchParams({ turn: "X", mode: modeFromParams });
    }
    if (!searchParams.has("mode")) {
      setSearchParams({ mode: "player", turn: turnFromParams });
    }
  }, [searchParams, setSearchParams, turnFromParams, modeFromParams]);

  return <TicTacToe turn={turnFromParams} mode={modeFromParams} />;
};

export default GamePage;
