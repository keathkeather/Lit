import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
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
    <header className="bg-white fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center mb-0 ml-20">
        <button onClick={handleLogoClick}>
          <img src="litimg/litlogo2.svg" alt="Lit Logo 2" className="w-16 lg:w-20 mr-2 lg:mr-3" />
        </button>
        <Link to="/landing" className="text-lg lg:text-base font-bold text-gray mr-5 md:mr-7">
                    Home
                </Link>
                <Link to="/features" className="text-lg lg:text-base font-bold text-gray mr-5 md:mr-7">
                    Features
                </Link>
                <Link to="/pricing" className="text-lg lg:text-base font-bold text-gray mr-5 md:mr-7">
                    Pricing
                </Link>
                <Link to="/aboutus" className="text-lg lg:text-base font-bold text-gray mr-5 md:mr-7">
                    About Us
                </Link>
                <Link to="/contactus" className="text-lg lg:text-base font-bold text-gray mr-5 md:mr-7">
                    Contact Us
                </Link>
      </div>
      <div className="flex items-center mr-14">
        <button onClick={handleLogin}>
          <img src="litimg/login.svg" alt="loginbtn" className="w-20 lg:w-40 mr-2 lg:mr-3" />
        </button>
        <button onClick={handleSignup}>
          <img src="litimg/signup_forfree.svg" alt="signupbtn" className="w-20 lg:w-40 mr-2 lg:mr-3" />
        </button>
      </div>
    </header>
  );
};

export default Header;