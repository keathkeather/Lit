import React from "react";

interface ScoreScreenProps {}
  
  const ScoreScreen: React.FC<ScoreScreenProps> = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Score Screen</h1>
        <div className="bg-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-2">Your Score</h2>
          <p className="text-3xl font-bold">1/1</p>
        </div>
      </div>
    );
  };
  
  export default ScoreScreen;