import { createContext, ReactNode, useContext, useState } from 'react';

type Mode = 'user' | 'owner';

type AppModeContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

const AppModeContext = createContext<AppModeContextType | null>(null);

export function AppModeProvider({ children }: { children: ReactNode }) {
  // Default mode = OWNER (because visitor is likely an owner)
  const [mode, setMode] = useState<Mode>('owner');

  return (
    <AppModeContext.Provider value={{ mode, setMode }}>
      {children}
    </AppModeContext.Provider>
  );
}



export function useAppMode() {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used inside AppModeProvider');
  }
  return context;
}
