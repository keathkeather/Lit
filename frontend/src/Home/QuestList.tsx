import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import Header from './Header';

interface QuestListProps {}

const QuestList: React.FC<QuestListProps> = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const handleBackIcon = () => {
    navigate('/book');
  };

  useEffect(() => {
    if (user) {
      console.log('Logged-in user:', user);
    } else {
      console.log('User not logged in');
    }
  }, [user]);

    return (
      <div className="overflow-y-auto">
        <Header />
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="relative">
            <img src="litimg/QuestListHeaderbg.svg" alt="Home" className="w-screen h-full" />
            <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-left" style={{ width: '1200px', marginLeft: '400px' }}>
                <div className="mt-8">
                  <button onClick={handleBackIcon}>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white ml-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                  </svg>
                </button>
                </div>
                <div className="text-white text-3xl font-bold mt-14 ml-20 mr-24" style={{ width: '600px' }}>
                  Let's Ace the Day! Embark on quests and unleash your potential.
                </div>
                <img src="litimg/litsy.png" alt="Litsy" className="ml-4" style={{ width: '200px', height: '200px', transform: 'scaleX(-1)' }}/>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  };

export default QuestList;