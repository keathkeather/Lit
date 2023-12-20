import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {  useAccount } from '../Home/AccountContext';
import axios from 'axios';

interface RoleEntity{
  role_id: number;
}

interface AccountEntity {
  accountId: number;
  email: string;
  firstName: string;
  lastName: string;
  role : RoleEntity;
  quizAnswered : quizAnswered;
}

interface quizAnswered {
  quizScores: quizScores[];
}

interface quizScores {
  quizScoreId: number;
  accountScore: number;
}

interface UserEntity {
  username: string;
  password: string;
  account: AccountEntity;
}

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false); 

  const navigate = useNavigate();
  const {setAccount} = useAccount();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Fetch users from your API
      const response = await axios.get<UserEntity[]>('http://localhost:8080/user/getAllUsers');
      const users = response.data;
      // Check if the inputted user has a role_id of 3 therefore its an administrator 
      const isUserAutheticatedAsAdmin =  users.find((userData: UserEntity)=>{
        return(
          (userData.username === usernameOrEmail || userData.account.email === usernameOrEmail) &&
          (userData.password === password)&&(userData.account.role.role_id === 3)
        );
      });

      // Check if the inputted username/email and password match any user's credentials
     
      const isUserAuthenticated = users.find((userData: UserEntity) => {
        return (
          (userData.username === usernameOrEmail || userData.account.email === usernameOrEmail) &&
          userData.password === password
        );
      });
      if (isUserAutheticatedAsAdmin) {
        setAccount(isUserAutheticatedAsAdmin.account);
        // we can implement this if we agree on it :) but il just comment this out until ill add server side rendering ;
        sessionStorage.setItem('account', JSON.stringify(isUserAutheticatedAsAdmin.account)); // TODO: Store account details in sessionStorage
        navigate('/admin');
      } else if (isUserAuthenticated) {
        console.log('Login Successful!');
        setAccount(isUserAuthenticated.account);
        //way to make when a page reloads it does not turn the user int null  problem is it makes things unsecure so bad practice to do so :(
          sessionStorage.setItem('account', JSON.stringify(isUserAuthenticated.account)); // Store account details in sessionStorage
          sessionStorage.setItem('userLoggedIn', 'true'); // * Store user login status in sessionStorage
        navigate('/userhome');
      } else {
        setLoginError(true); // Set login error to true
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
      setLoginError(true);
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
      <img src="litimg/loginbg.png" alt="Login Background" className="w-full h-full object-cover"/>


      {/*form column*/}
      <div className="absolute top-0 mt-80 left-1/4 mr-40 transform translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md max-w-2xl w-full">
      {loginError && ( // Conditional rendering of error message
        <div className="border border-[#ff4d4d] bg-[#ff4d4d28] rounded-md flex items-center py-4">
        <p className="text-[#ff4d4d] ml-4">Incorrect Username or Password.</p>
      </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="user" className="block text-gray text-xl font-bold mb-4 mt-4">
              Email or Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border rounded-md py-2 px-2 mb-4 text-lg"
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              value={usernameOrEmail}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="user" className="block text-gray text-xl font-bold mb-4 mt-4">
              Password
            </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="w-full border rounded-md py-2 px-2 mb-4 text-lg pr-10"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer mt-7"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1.933 10.909A4.357 4.357 0 0 1 1 9c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 19 9c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M2 17 18 1m-5 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>
                ) : (
                  <svg className="w-6 h-4 text-[#0000] dark:text-white p-" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
                  <g stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
                    <path d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"/>
                  </g>
                </svg>
                )}
              </span>
            </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="bg-dblue text-white text-xl font-semibold py-4 px-40 rounded-md hover:bg-dblue mb-4"
            >
              Log in
            </button>
            <div className="block text-dblue text-lg font-normal mb-4">
              Don't have an Account?&nbsp;
                <Link to="/signup" className="text-lg font-bold text-dblue">
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
