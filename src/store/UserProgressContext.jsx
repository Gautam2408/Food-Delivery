import { createContext, useState } from "react";

export const ProgressContext = createContext({
  progress: "", // Cart Checkout
  showProgress: (name) => {},
  hideProgress: () => {},
});
export function UserProgressContext({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showProgress(name) {
    setUserProgress(name);
  }

  function hideProgress() {
    setUserProgress("");
  }

  const progeressCtx = {
    progress: userProgress,
    showProgress,
    hideProgress,
  };

  return (
    <ProgressContext.Provider value={progeressCtx}>
      {children}
    </ProgressContext.Provider>
  );
}
