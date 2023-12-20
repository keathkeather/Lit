import React, { useEffect } from "react";
import { useAccount } from "./AccountContext";

interface ScoreScreenProps {}

const ScoreScreen: React.FC<ScoreScreenProps> = () => {
  const { account } = useAccount(); // Accessing account details from context

  
  useEffect(() => {
    if (account) {
      console.log('Extracted accountId:', account.accountId);

      // Check if quizAnswered and quizScores exist before accessing accountScore
      if (account) {
        console.log('Account', account?.firstName??0);
      }
    }
  }, [account]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Score Screen</h1>
      <div className="bg-gray-200 rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-2">Your Score</h2>
        <p className="text-3xl font-bold">{account?.quizAnswered.quizScores[0].accountScore}</p>
      </div>
    </div>
  );
};

export default ScoreScreen;
