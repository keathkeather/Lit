import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FetchUser from './FetchUser';

interface HeaderProps {}
interface User {
  username: string;
  firstname: string;
  // Add other properties as needed
}

const Header: React.FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const fetchUser = FetchUser();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUser(2);
      setUser(userData);
    };

    getUserData();
  }, [fetchUser]);

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
                to="/shop"
                className="text-base lg:text-lg font-bold text-white mr-3 md:mr-4 hover:text-bgc2"
              >
                Shop
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
        {user && (
        <div className="text-white text-lg font-bold mr-2">{user.username}</div>
        )}
        <button onClick={handleUserClick}>
          <img src="litimg/userlogo.svg" alt="User Logo" className="w-10 mr-32" />
        </button>
      </div>
    </header>
  );
};

export default Header;
