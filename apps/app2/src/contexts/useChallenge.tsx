/* eslint-disable react/jsx-no-constructed-context-values */
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type ChallengeContextProps = {
  challengeLevel: number;
  setChallengeLevel: Dispatch<SetStateAction<number>>;
};

const ChallengeContext = createContext<ChallengeContextProps | null>(null);

export type ChallengeProviderProps = {
  children: ReactNode;
};

export function ChallengeProvider({ children }: ChallengeProviderProps) {
  const [challengeLevel, setChallengeLevel] = useState<number>(1);

  return (
    <ChallengeContext.Provider
      value={{
        challengeLevel,
        setChallengeLevel,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
}

export const useChallenge = () => {
  const context = useContext(ChallengeContext);

  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }

  return context;
};
