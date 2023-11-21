import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface FeaturesScreenProps {}

const FeaturesScreen: React.FC<FeaturesScreenProps> = () => {
  const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    const handleLogoClick = () => {
        navigate('/');
      };

  return (
    <div className="relative overflow-y-auto">
    <style>
      {`
        body {
          background-color: #0C2647;
        }
      `}
    </style>
        <header className="bg-white fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between">
            <div className="flex items-center mb-0 ml-20">
                <button
                    onClick={handleLogoClick}
                >
                    <img src="litimg/litlogo2.png" alt="Lit Logo 2" className="w-20 lg:w-28 mr-3 lg:mr-5" />
                </button>
                <Link to="/features" className="text-lg lg:text-xl font-bold text-gray mr-5 md:mr-7">
                    Features
                </Link>
                <Link to="/pricing" className="text-lg lg:text-xl font-bold text-gray">
                    Pricing
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
                    className="mx-10 px-3 py-1 ml-2 lg:ml-5 lg:px-4 lg:py-2 rounded bg-bgc2 text-white font-semibold cursor-pointer mb-0 lg:text-lg"
                >
                    Sign up for Free
                </button>
            </div>
        </header>

        <div className=" mt-16 p-4 text-center">
      {/* Add your headings here */}
      <h1 className="text-5xl font-bold mt-20 text-white">Gamify Your Filipino Literature Journey</h1>

      {/* The rest of your content goes here */}

       {/* Rows and Columns */}
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-20">
    {/* Column 1 */}
    <div className="text-center">
        {/* Image */}
    <div className="flex items-center justify-center -mb-3">
        <img src="learn1.png" alt="learn" className="w-44 h-44" />
    </div>

      {/* Text */}
        <div>
            <h2 className="text-3xl text-white font-semibold mb-10">Learn with<br />Interactivity</h2>
            <p className="text-white leading-8">Immerse yourself in captivating visual<br />novels on Lit for a fun way to enhance<br />reading comprehension effortlessly.</p>
        </div>
    </div>

    {/* Column 2 */}
    <div className="text-center">
    <div className="flex items-center justify-center -mb-8">
        <img src="learn2.png" alt="learn" className="w-48 h-48" />
    </div>
    
        <div>
            <h2 className="text-3xl text-white font-semibold mb-10">List Your Favorite<br/>Books</h2>
            <p className="text-white leading-8">Explore narratives on Lit that go<br/>beyond entertainment, fostering<br/>personal growth through diverse<br/>stories and character journeys.</p>
        </div>
    </div>

    {/* Column 3 */}
    <div className="text-center">
        <div className="flex items-center justify-center mb-4">
            <img src="learn3.png" alt="learn" className="w-36 h-36" />
            </div>
    
                <div>
                    <h2 className="text-3xl text-white font-semibold mb-10">Earn Rewards for<br/>Your Hardwork</h2>
                    <p className="text-white leading-8 mb-30">Transform your literature journey with<br/>Lit's gamified learning, making reading<br/>both informative and enjoyable for<br/>personal development.</p>
                </div>
            </div>
        </div>
    </div>

    {/* Fixed bottom image */}
      <img id="bottomImage" src="bgfeatures.png" alt="Image Description" className="w-[1550px] h-[350px] object-cover" />

</div>
);
};

export default FeaturesScreen;