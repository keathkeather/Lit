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
      <div className="flex items-center lg:ml-0">
        <button onClick={handleLogoClick}>
          <img src="litimg/litlogo2.svg" alt="Lit Logo 2" className="w-12 lg:w-20 md:w-40 mr-2 lg:ml-20" />
        </button>
          <ul className="flex">
            <li>
              <Link
                to="/landing"
                className="text-base lg:text-lg font-bold text-dblue mr-3 md:mr-4 hover:text-bgc2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/features"
                className="text-base lg:text-lg font-bold text-dblue mr-3 md:mr-4 hover:text-bgc2"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className="text-base lg:text-lg font-bold text-dblue mr-3 md:mr-4 hover:text-bgc2"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="text-base lg:text-lg font-bold text-dblue mr-3 md:mr-4 hover:text-bgc2"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contactus"
                className="text-base lg:text-lg font-bold text-dblue hover:text-bgc2"
              >
                Contact Us
              </Link>
            </li>
          </ul>
      </div>
      <div className="flex items-center">
        <button onClick={handleLogin}>
          <img src="litimg/loginbtn.svg" alt="loginbtn" className="w-12 lg:w-40 mr-2 lg:mr-3" />
        </button>
        <button onClick={handleSignup}>
          <img src="litimg/signup_forfreebtn.svg" alt="signupbtn" className="w-12 lg:w-40 mr-2 lg:mr-20" />
        </button>
      </div>
    </header>
  );
};

export default Header;
