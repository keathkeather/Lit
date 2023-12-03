import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

interface RoleEntity{
  role_id: number;
}

interface AccountEntity {
  email: string;
  accountId: number;
  role : RoleEntity;
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

  const navigate = useNavigate();

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
      if(isUserAutheticatedAsAdmin){
        navigate('/admin',{state : {accountId: isUserAutheticatedAsAdmin.account.accountId}});
      }
      else if (isUserAuthenticated) {
        console.log('Login Successful!');

        navigate('/userhome', { state: { accountId: isUserAuthenticated.account.accountId } });
      } else {
        alert('Login Failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
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

      <div className="absolute top-0 mt-80 left-1/4 mr-40 transform translate-x-1/2 -translate-y-1/2 bg-white p-10 rounded-md max-w-2xl w-full">
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
              required
            />
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
