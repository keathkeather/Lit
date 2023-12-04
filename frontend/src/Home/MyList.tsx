import React, { useState, useEffect } from 'react'; // Make sure to import useState
import Header from './Header';
import { useNavigate, useLocation } from 'react-router-dom';
// import FetchUser from './FetchUser';
// import { useUser } from './UserContext';



const MyList: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // const fetchUser = FetchUser();
  // const { user, setUser } = useUser();
  const location = useLocation();
  const accountId: number | undefined = location.state?.accountId;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     if (accountId !== undefined) {
  //       const userData = await fetchUser(accountId);
  //       setUser(userData);
  //     } else {
  //       console.error('accountId is undefined');
  //     }
  //   };

  //   getUserData();
  // }, [fetchUser, setUser, accountId]);

  const handlePlay = () => {
    navigate('/book');
  };

  const handlePlus1 = () => {
    //logic here...
  };

  const handlePlus2 = () => {
    //logic here...
  };

  const handlePlus3 = () => {
    //logic here...
  };

  const handlePlus4 = () => {
    //logic here...
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="overflow-y-full">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        {/* <div className="relative">
          <img src="litimg/home.png" alt="Home" className="w-screen h-full" />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center"
            style={{ width: '620px', marginRight: '100px' }}>
              <img src="litimg/litsy.png" alt="Litsy" className="w-40 mr-4" />
              {user && (
              <div className="text-white text-3xl font-semibold mt-2">Welcome, {user.username}! May you have a wondrous adventure to the World of Filipino Literature</div>
              )}
              </div>
          </div>
        </div> */}

        <div className="mt-6 mb-10 flex items-center">
          <div className="text-black text-2xl font-bold mr-[60rem]">My List</div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Genre
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                <div className="py-1" role="none">
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">Folklore</a>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-1">Fable</a>
                  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-2">Mystery</a>
                </div>
              </div>
            )}
          </div>
        </div>

        </div>
    </div>
  );
};

export default MyList;