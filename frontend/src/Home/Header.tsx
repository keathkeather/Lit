import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAccount } from './AccountContext';
import axios from 'axios';
interface AccountEntity{
  accountId: number;
  email: string;
  firstName: string;
  lastname: string;
  gender: string;
}
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const { account, setAccount } = useAccount();
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const accountId: number | undefined = location.state?.accountId;

 
  useEffect(() => {
    const getUserData = async () => {
      console.log('testtestets ')
      try {
        if (accountId !== undefined) {
          const response = await axios.get<AccountEntity>(`http://localhost:8080/account/${accountId}`);
          const responseAcc = response.data;
          setAccount(responseAcc);
          console.log('data added');
        } else {
          console.error('accountId is undefined');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    getUserData();
  }, [accountId]);


  const handleLogoClick = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    navigate('/');
  };
  const handleHelpClick = () => {
    console.log('Help link clicked!');

    if (account) {
      console.log(`passing ${account.accountId} to  help`)
      navigate(`/help/${account.accountId}`);
    } else {
      console.error('Account is null or undefined');
    }
  };

  return (
    <header className="bg-dblue fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center lg:ml-10">
        <button onClick={handleLogoClick}>
          <img src="/litimg/litlogo3.png" alt="Lit Logo 3" className="w-12 lg:w-20 md:w-40 mr-2 lg:ml-20" />
        </button>
          <ul className="flex">
            <li>
              <Link
                to="/userhome"
                className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/explore"
                className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/mylist"
                className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
              >
                My List
              </Link>
            </li>
            <li>
              <Link
                to={`/help/${account?.accountId}`}
                className="text-base lg:text-lg font-bold text-white hover:text-bgc2"
                onClick={handleHelpClick}
              >
                Help
              </Link>
            </li>
          </ul>
      </div>
      <div className="flex items-center">
        {loading ? (
          <div className="text-white text-lg font-bold mr-2"></div>
        ) : (
          account && <div className="text-white text-lg font-bold mr-2">{account.firstName}</div>
        )}
        <button onClick={handleUserClick}>
          <img src="/litimg/userlogo.svg" alt="User Logo" className="w-10 mr-32" />
        </button>
      </div>
    </header>
  );
};

export default Header;
