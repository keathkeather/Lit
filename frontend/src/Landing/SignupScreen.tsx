import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
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
      <button onClick={handleLogoClick} className="absolute top-20 left-36">
        <img src="litimg/litlogo3.png" alt="LitLogo3" className="w-30 h-15" />
      </button>
      <img src="litimg/signupbg.png" alt="Signup Background" className="w-full h-full object-cover"/>

      <div className="absolute top-64 mt-80 left-1/4 mr-40 transform translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md max-w-2xl w-full">
        <form>
          <div className="mb-4 flex">
            <div className="mr-2 w-1/2">
              <label htmlFor="firstName" className="block text-gray text-xl font-bold mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full border rounded-md py-2 px-2 mb-2 text-lg"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="ml-2 w-1/2">
              <label htmlFor="lastName" className="block text-gray text-xl font-bold mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full border rounded-md py-2 px-2 mb-2 text-lg"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray text-xl font-bold mb-4">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-md py-2 px-2 mb-4 text-lg"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div className="mb-4 flex">
            <div className="mr-4">
              <label className="block text-gray text-xl font-bold mb-2">Gender</label>
              <div className="flex items-row mt-4 mb-4">
                <div className="ml-8 mr-4 border border-gray rounded dark:border-gray py-2 px-12">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => setGender('male')}
                    className="mr-2"
                  />
                  <label htmlFor="male" className="text-gray text-xl">
                    Male
                  </label>
                </div>
                <div className="mr-4 border border-gray rounded dark:border-gray py-2 px-10">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => setGender('female')}
                    className="mr-2"
                  />
                  <label htmlFor="female" className="text-gray text-xl">
                    Female
                  </label>
                </div>
                <div className="border border-gray rounded dark:border-gray py-2 px-6">
                  <input
                    type="radio"
                    id="nonBinary"
                    name="gender"
                    value="nonBinary"
                    checked={gender === 'nonBinary'}
                    onChange={() => setGender('nonBinary')}
                    className="mr-2"
                  />
                  <label htmlFor="nonBinary" className="text-gray text-xl">
                    Non-binary
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray text-xl font-bold mb-4">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border rounded-md py-2 px-2 mb-4 text-lg"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray text-xl font-bold mb-4">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border rounded-md py-2 px-2 mb-4 text-lg"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray text-xl font-bold mb-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border rounded-md py-2 px-2 mb-4 text-lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="block text-dblue text-lg font-normal mb-10">
            By clicking the button below, you are indicating that you have read and agree to the Terms of Service and Privacy Policy.
          </div>
          <div className="flex flex-col items-center">
            <button
              type="button"
              className="bg-dblue text-white text-xl font-semibold py-4 px-40 rounded-md hover:bg-dblue mb-4"
              onClick={handleSignup}
            >
              Create
            </button>
            <div className="block text-dblue text-lg font-normal mb-4">
              Already have an account?&nbsp;
                <Link to="/login" className="text-lg font-bold text-dblue">
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
