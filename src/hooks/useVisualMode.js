import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory((prev) => [...prev]);
    }
  };

  // if history length less or = 1, theres no history. if length >1, set history to the second last mode.
  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    } else {
      return;
    }
  };

  return { mode, transition, back };
}
