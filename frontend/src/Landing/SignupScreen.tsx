import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import { useAccount } from '../Home/AccountContext';
import axios from 'axios'

interface SignupScreenProps {}

const SignupScreen: React.FC<SignupScreenProps> = () => {
  const {setAccount} = useAccount();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [genderError, setGenderError] = useState('');
  const [showPasswordChecklist, setShowPasswordChecklist] = useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setShowPasswordChecklist(e.target.value.length > 0);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation
    if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!gender) {
      setGenderError('Please select a gender.');
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/user/createUser", {
        "username": username,
        "password": password,
        "account": {
          "email": email,
          "firstName": firstName,
          "lastName": lastName,
          "gender": gender
        }
      });

      console.log(response.data); // Log the response if needed
      setAccount(response.data.account);
      navigate('/checkpoint');
    } catch (err) {
      alert(err);
    }
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
        <form onSubmit={handleSignup}>
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
                required
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
                required
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
              required
            />
          </div>
          <div className="mb-4">
            <div className="mr-4">
              <label className="block text-gray text-xl font-bold mb-2">Gender</label>
              <div className="flex items-center mt-4 mb-4">
                <div className="mr-4 border border-gray rounded dark:border-gray py-2 px-12 "
                 onClick={() => document.getElementById('male')?.click()}
                 style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ccebff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={gender === 'male'}
                    onChange={() => {
                      setGender('male');
                      setGenderError(''); 
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="male" className="text-gray text-xl">
                    Male
                  </label>
                </div>
                <div className="mr-4 border border-gray rounded dark:border-gray py-2 px-10"
                 onClick={() => document.getElementById('female')?.click()}
                 style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ccebff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={gender === 'female'}
                    onChange={() => {
                      setGender('female');
                      setGenderError(''); // Clear error when a gender is selected
                    }}
                    className="mr-2"
                  />
                  <label htmlFor="female" className="text-gray text-xl">
                    Female
                  </label>
                </div>
                <div className="border border-gray rounded dark:border-gray py-2 px-10"
                 onClick={() => document.getElementById('nonBinary')?.click()}
                 style={{
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ccebff'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <input
                    type="radio"
                    id="nonBinary"
                    name="gender"
                    value="nonBinary"
                    checked={gender === 'nonBinary'}
                    onChange={() => {
                      setGender('nonBinary');
                      setGenderError(''); // Clear error when a gender is selected
                    }}
                    className='mr-2'
                  />
                  <label htmlFor="nonBinary" className="text-gray text-xl">
                    Non-binary
                  </label>
                </div>
              </div>
              {genderError && <p className="text-[#ff3333]">{genderError}</p>}
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
              required
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
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray text-xl font-bold mb-4">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full border rounded-md py-2 px-2 mb-2 text-lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          {showPasswordChecklist && (
          <PasswordChecklist
            rules={['capital', 'match', 'specialChar', 'minLength', 'number']}
            minLength={8}
            value={password}
            valueAgain={confirmPassword}
          />
        )}
          </div>
          <div className="block text-dblue text-lg font-normal mb-10">
            By clicking the button below, you are indicating that you have read and agree to the Terms of Service and Privacy Policy.
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-dblue text-white text-xl font-semibold py-4 px-40 rounded-md hover:bg-dblue mb-4"
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
