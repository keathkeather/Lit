import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import FetchUser from './FetchUser';
import { useUser } from './UserContext';

interface HeaderProps {
  accountId?: number;
}

const Header: React.FC<HeaderProps> = ({ accountId }) => {
  const navigate = useNavigate();
  const fetchUser = FetchUser();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (accountId !== undefined) {
          const userData = await fetchUser(accountId);
          setUser(userData);
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
  }, [fetchUser, setUser, accountId]);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleUserClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-dblue fixed top-0 left-0 right-0 z-10 p-2 md:p-4 flex flex-row lg:flex-row items-center justify-between shadow-lg">
      <div className="flex items-center lg:ml-10">
        <button onClick={handleLogoClick}>
          <img src="litimg/litlogo3.png" alt="Lit Logo 3" className="w-12 lg:w-20 md:w-40 mr-2 lg:ml-20" />
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
              to="/help"
              className="text-base lg:text-lg font-bold text-white hover:text-bgc2"
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
          user && <div className="text-white text-lg font-bold mr-2">{user.username}</div>
        )}
        <button onClick={handleUserClick}>
          <img src="litimg/userlogo.svg" alt="User Logo" className="w-10 mr-32" />
        </button>
      </div>
    </header>
  );
};

export default Header;
