import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface CheckpointScreenProps {}

const CheckpointScreen: React.FC<CheckpointScreenProps> = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    //Logic here
  };

  return (
    <div className="bg-bgc1 w-full relative">
        <img src="litimg/checkpointbg.png" alt="Checkpoint Background" className="w-full h-screen" />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgc1 p-10 flex flex-col items-center">
            <div>
                <img src="litimg/litlogo4.png" alt="Lit Logo" className="w-sm" />
            </div>
            <div className="text-8xl font-bold mb-10 text-white flex flex-col items-center">
                NOICE!
            </div>
            <div className="text-2xl font-light text-white mb-12">
                Your account was successfully created.
            </div>
            <button
                type="button"
                onClick={handleStartClick}
                className="px-6 md:px-12 lg:px-20 py-2 md:py-3 lg:py-4 rounded bg-bgc2 text-white font-semibold cursor-pointer text-sm md:text-xl lg:text-3xl"
            >
                Start Reading
            </button>
            <div className="block text-white text-2xl font-light mt-10">
              Back to&nbsp;
                <Link to="/login" className="text-2xl font-normal text-white">
                  Login
                </Link>
            </div>
        </div>
    </div>
  );
};

export default CheckpointScreen;
