import { useState } from "react"

export function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      history.pop();
      setHistory(prev => [...prev, newMode]);
    } 
    if (!replace) {
      setMode(newMode);
      setHistory(prev => [...prev, newMode])
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back }
}