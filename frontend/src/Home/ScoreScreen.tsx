import React, { useEffect } from "react";
import { useAccount } from "./AccountContext";
import { useNavigate, useParams } from "react-router-dom";
import { useBook } from "./BookContext";

interface ScoreScreenProps {}

const ScoreScreen: React.FC<ScoreScreenProps> = () => {
  const { account } = useAccount(); // Accessing account details from context
  const navigate = useNavigate();
  const { score, perfectScore } = useParams();

  const handleBackButton = () => {
    navigate("/questlist"); // Navigate to the QuestList screen
  };
  
  useEffect(() => {
    if (account) {
      console.log('Extracted accountId:', account.accountId);

      // Check if quizAnswered and quizScores exist before accessing accountScore
      if (account) {
        console.log('Account', account?.firstName ?? 0);
      }
    }
    console.log('Extracted score:', score);
  }, [account, score]);

  return (
    <div className="flex items-center justify-center h-screen bg-bgc1 relative">
      <div className="relative z-10">
        <div className="flex flex-col items-center justify-center bg-white rounded-md p-8 relative w-[400px]">
          <h1 className="text-4xl font-bold mb-4 mt-12">Congratulations</h1>
          <p className="text-6xl font-bold p-4 text-bgc2">
            {score || <p className="text-center">'Score not available'</p>}/{perfectScore}
          </p>
          <p className="text-center">
            You did a great job! You’re one <br />step closer to reaching your<br /> goal!
          </p>
          <div className="bg-gray-200 rounded-lg mt-4">
            <button
              className="bg-[#253864ee] hover:bg-bgc1 text-white font-bold py-2 px-4 rounded mt-4 w-[300px] mb-10"
              onClick={handleBackButton}
            >
              Finish
            </button>
          </div>
        </div>
        <img
          src="/litimg/yey.png"
          className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          style={{ width: '150px', height: 'auto' }}
          alt="Partial Image"
        />
      </div>
    </div>
  );
  
};

export default ScoreScreen;
