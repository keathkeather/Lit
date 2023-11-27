import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = () => {
    // Add logic to handle user registration
    console.log('Signup succesful');
    navigate('/checkpoint');
  };

  const handleLogoClick = () => {
    navigate('/landing');
  };

  return (
    <div className="bg-bgc1 relative">
      <button onClick={handleLogoClick} className="absolute top-5 left-4 md:top-10 md:left-8 lg:top-20 lg:left-40">
        <img src="litimg/LitLogoHome.svg" alt="LitLogo3" className="w-30 h-15" />
      </button>
      <img src="litimg/signupbg.png" alt="Signup Background" className="w-full h-full object-cover"/>

      <div className="absolute top-1/4 mt-80 right-1/4 mr-40 transform translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md max-w-3xl w-full">
        <h2 className="text-7xl font-bold mb-16 text-bgc1 mt-10 flex flex-col items-center">Create Account</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray text-2xl font-bold mb-4">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-md py-4 px-3 mb-6 text-xl"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray text-2xl font-bold mb-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md py-4 px-3 mb-6 text-xl"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray text-2xl font-bold mb-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border rounded-md py-4 px-3 mb-6 text-xl"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="block text-dblue text-xl font-normal mb-10">
            By clicking the button below, you are indicating that you have read and agree to the Terms of Service and Privacy Policy.
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-dblue text-white text-2xl font-semibold py-4 px-40 rounded-md hover:bg-dblue mb-4"
              onClick={handleSignup}
            >
              Create
            </button>
            <div className="block text-dblue text-xl font-normal mb-10">
              Already have an account?&nbsp;
                <Link to="/login" className="text-xl font-bold text-dblue">
                  Click Here
                </Link>
            </div>
          </div>
        </form>
      </div>

    </div>
  );
};

export default SignupScreen;
