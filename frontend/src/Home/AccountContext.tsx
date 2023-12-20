import React, { createContext, useContext, ReactNode } from 'react';

interface Account {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  role : Role;
  quizAnswered : quizAnswered;
  // Add other properties as needed
}

interface Role{
  role_id: number;
}

interface quizAnswered {
  quizScores: quizScores[];
}

interface quizScores {
  quizScoreId: number;
  accountScore: number;
}

interface AccountContextProps {
  account: Account | null;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
}

const AccountContext = createContext<AccountContextProps | undefined>(undefined);

export const AccountProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = React.useState<Account | null>(null);

  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};
