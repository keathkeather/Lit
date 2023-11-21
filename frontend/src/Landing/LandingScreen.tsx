import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LandingScreenProps {}

const LandingScreen: React.FC<LandingScreenProps> = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleGetstarted = () => {
        navigate('/signup');
    };

    const handleLogoClick = () => {
        navigate('/');
      };

    return (
        <div className="overflow-y-auto">
            <header className="bg-white fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between">
                <div className="flex items-center mb-0 ml-20">
                    <button
                        onClick={handleLogoClick}
                    >
                        <img src="litimg/litlogo2.png" alt="Lit Logo 2" className="w-20 lg:w-28 mr-3 lg:mr-5" />
                    </button>
                    <Link to="/landing" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                        Home
                    </Link>
                    <Link to="/features" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                        Features
                    </Link>
                    <Link to="/pricing" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                        Pricing
                    </Link>
                    <Link to="/aboutus" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                        About Us
                    </Link>
                    <Link to="/contactus" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                        Contact Us
                    </Link>
                </div>
                <div className="flex items-center mr-20">
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="px-3 py-1 lg:px-4 lg:py-2 rounded bg-bgc1 text-white font-semibold cursor-pointer mb-0 lg:text-lg"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={handleSignup}
                        className="px-3 py-1 ml-2 lg:ml-5 lg:px-4 lg:py-2 rounded bg-bgc2 text-white font-semibold cursor-pointer mb-0 lg:text-lg"
                    >
                        Sign up for Free
                    </button>
                </div>
            </header>

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
