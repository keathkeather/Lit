import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'

interface LandingScreenProps {}

const LandingScreen: React.FC<LandingScreenProps> = () => {
    const navigate = useNavigate();

    const handleGetstarted = () => {
        navigate('/signup');
    };

    return (
        <div className="overflow-y-auto">

            <Header/>
            
            <div className="flex flex-col items-center justify-center mt-10">
                
                <div className="bg-bgc1 p-10 flex items-center justify-center w-full h-screen">
                    <img src="litimg/litsy.png" alt="Litsy" className="w-30 mb-8" />
                    <div className="flex flex-col items-center ml-8">
                        <div className="text-6xl font-semibold text-white mb-12">Your launchpad into the world of literature</div>
                        <div className="text-2xl font-light text-white mb-12">Lits learn Literature</div>
                        <button
                            type="button"
                            onClick={handleGetstarted}
                            className="px-12 py-3 rounded bg-white text-dblue font-semibold cursor-pointer text-3xl"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

                <div className="bg-white w-full">
                    <img src="litimg/land1.png" alt="Land 1" className="h-full" />
                </div>

                <div className="bg-bgc1 w-full relative">
                    <img src="litimg/land2.png" alt="Land 2" className="w-full h-full" />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-bgc1 p-10 flex flex-col items-center">
                        <button
                            type="button"
                            onClick={handleGetstarted}
                            className="px-4 md:px-8 lg:px-10 py-1 md:py-2 lg:py-3 rounded bg-bgc2 text-white font-semibold cursor-pointer text-sm md:text-xl lg:text-3xl"
                        >
                            Get Started
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LandingScreen;
