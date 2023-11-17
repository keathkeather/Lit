import React, { useState, useEffect } from 'react';
import LandingScreen from './Landing/LandingScreen';

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-bgc1 h-screen flex flex-col justify-center items-center">
      {loading ? (
        <img src="litimg/litlogo1.png" alt="Lit Logo" className="w-1/4 mb-10" />
      ) : (
        <LandingScreen />
      )}
    </div>
  );
};

export default LoadingScreen;
