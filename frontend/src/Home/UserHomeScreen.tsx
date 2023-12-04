import React, {  useEffect, useState } from 'react';
import Header from './Header'
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';

interface AccountEntity{
  accountId: number;
  email: string;
  firstName: string;
  lastname: string;
  gender: string;
}
const UserHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState<AccountEntity>(); // Corrected line
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

  return (
    <div className="overflow-y-auto">

        <Header/>
        
        <div className="flex flex-col items-center justify-center mt-16">
            
        <div className="relative">
          <img src="litimg/home.png" alt="Home" className="w-screen h-full" />
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center"
            style={{ width: '620px', marginRight: '100px' }}>
              <img src="litimg/litsy.png" alt="Litsy" className="w-40 mr-4" />
              {account && (
              <div className="text-white text-3xl font-semibold mt-2">Welcome, {account.firstName}! May you have a wondrous adventure to the World of Filipino Literature</div>
              )}
              </div>
          </div>
        </div>

        <div className="mt-10 mb-10">
          <div className="text-black text-xl font-bold absolute left-36">Recommendations</div>
        </div>

        <div>
          <div className="flex flex-row items-center">
            <div className="flex flex-col mr-8 ml-8">
              <div className="relative">
                <img src="litimg/Ibong Adarna.svg" alt="Ibong Adarna" className="w-72" />
                <button onClick={handlePlus1} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Ibong Adarna</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Jose de la Cruz</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/Florante at Laura.svg" alt="Florante at Laura" className="w-72" />
                <button onClick={handlePlus2} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Florante at Laura</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Francisco Balagtas</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/Alamat ng Pinya.svg" alt="Alamat ng Pinya" className="w-72" />
                <button onClick={handlePlus3} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">Alamat ng Pinya</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Boots S. Agbayani Pa...</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
            <div className="flex flex-col mr-8">
              <div className="relative">
                <img src="litimg/El Filibusterismo.svg" alt="El Filibusterismo" className="w-72" />
                <button onClick={handlePlus4} className="absolute bottom-5 right-4">
                  <img src="litimg/plusbtn.svg" alt="plusbtn" className="w-15" />
                </button>
              </div>
              <div className="ml-5 text-lg font-semibold">El Filibusterismo</div>
              <div className="ml-5 mb-3 font-medium text-sm text-lblue">Leon Ma. Geurrero</div>
              <button onClick={handlePlay} className="mx-auto">
                <img src="litimg/playbtn.svg" alt="playbtn" className="w-60" />
              </button>
            </div>
          </div>
        </div>

        </div>
    </div>
  );
};

export default UserHomeScreen;