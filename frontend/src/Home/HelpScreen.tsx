import React, { useEffect } from 'react';
import Header from './Header'
import { useLocation  } from 'react-router-dom';
import FetchUser from './FetchUser';
import { useUser } from './UserContext';

const HelpScreen: React.FC = () => {
  const fetchUser = FetchUser();
  const { user, setUser } = useUser();
  const location = useLocation();
  const accountId: number | undefined = location.state?.accountId;

  useEffect(() => {
    const getUserData = async () => {
      if (accountId !== undefined) {
        const userData = await fetchUser(accountId);
        setUser(userData);
      } else {
        console.error('accountId is undefined');
      }
    };

    getUserData();
  }, [fetchUser, setUser, accountId]);

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        <div className="relative">
          <img src="litimg/help.png" alt="Home" className="w-screen h-full" />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div>
                <div>Welcome to Lit Help Center</div>
                <div>what can we help you for today?</div>
            </div>
          </div>
        </div>

        <div className="mt-10 mb-10">
          <div className="text-black text-xl font-bold absolute left-36">Frequently Asked Questions</div>
        </div>

        </div>
    </div>
  );
};

export default HelpScreen;