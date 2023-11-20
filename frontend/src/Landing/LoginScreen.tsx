import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // Add logic to handle user registration
    console.log('Login button clicked');
  };

  const handleLogoClick = () => {
    navigate('/landing');
  };

  return (
    <div className="bg-bgc1 relative">
      <button onClick={handleLogoClick} className="absolute top-5 left-5 md:top-10 md:left-10 lg:top-15 lg:left-44">
        <img src="litimg/litlogo3.png" alt="LitLogo3" className="w-30 h-15" />
      </button>
      <img src="litimg/loginbg.png" alt="Login Background" className="w-full h-full object-cover"/>

      <div className="absolute top-32 mt-80 right-1/4 mr-40 transform translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md max-w-3xl w-full">
        <form>
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray text-2xl font-bold mb-4 mt-4">
              Email or Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-md py-4 px-3 mb-6 text-xl"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray text-2xl font-bold mb-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md py-4 px-3 mb-6 text-xl"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-dblue text-white text-2xl font-semibold py-4 px-40 rounded-md hover:bg-dblue mb-4"
              onClick={handleLogin}
            >
              Log in
            </button>
            <div className="block text-dblue text-xl font-normal mb-10">
              Don't have an Account?&nbsp;
                <Link to="/signup" className="text-xl font-bold text-dblue">
                  Click Here
                </Link>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default LoginScreen;
