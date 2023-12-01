import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameScreenProps {}

const GameScreen: React.FC<GameScreenProps> = () => {
  const localFilePath = process.env.PUBLIC_URL + '/Monogatari-v2.0.2/index.html';

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/userhome');
  };

  return (
    <div className="bg-bgc1 w-full h-screen flex flex-col justify-center relative">
        <div className="ml-2">
            <button onClick={handleLogoClick} className="mt-2 mb-2">
                <img src="litimg/litlogo3.png" alt="LitLogo3" className="w-20 h-15" />
            </button>
        </div>
        {/* <p>
            Click the link below to open the local file:
            <a href={localFilePath} target="_blank" rel="noopener noreferrer">
            BOOK
            </a>
        </p> */}
        <div className="flex-grow w-full h-full">
            <iframe title="Local Content" src={localFilePath} width="100%" height="100%" />
        </div>
    </div>
  );
};

export default GameScreen;
